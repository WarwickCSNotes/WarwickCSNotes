FROM oven/bun:1.3.9-alpine AS build
WORKDIR /app/frontend

# Copy all frontend source and Data dir (vite publicDir resolves to /app/Data)
COPY frontend/ ./
COPY Data/ /app/Data/

# Install dependencies
RUN bun install --frozen-lockfile

# Build the web app
WORKDIR /app/frontend/apps/web
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
CMD ["uv", "run", "app.py"]
