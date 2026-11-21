FROM oven/bun:1.3.9-alpine AS build
WORKDIR /app/frontend

# Copy all frontend source and Data dir (vite publicDir resolves to /app/Data)
COPY frontend/ ./
COPY Data/ /app/Data/

# Install dependencies
RUN bun install --frozen-lockfile

# Build the web app. SKIP_TIKZ_PRERENDER=1 short-circuits scripts/render-tikz.mjs
# so the LaTeX WASM kernel doesn't run inside the container — node-tikzjax can
# easily push small Docker hosts (WSL2 defaults to ~4 GB) past their memory
# budget. The pre-rendered SVGs in Data/Resources/Images/tikz/ are committed
# and get copied into dist by Vite's publicDir; locally, authors run
# `npm run tikz` (or just `npm run build`) to keep them in sync.
WORKDIR /app/frontend/apps/web
ENV SKIP_TIKZ_PRERENDER=1
RUN bun run build

FROM ghcr.io/astral-sh/uv:alpine3.23 AS runtime
RUN apk add --no-cache python3

ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync

COPY app.py ./
COPY Data/ ./Data/

RUN mkdir -p frontend/apps/web
COPY --from=build /app/frontend/apps/web/dist ./frontend/apps/web/dist

EXPOSE 3000
CMD ["gunicorn", "--bind", "0.0.0.0:3000", "--workers", "2", "--threads", "4", "app:app"]
