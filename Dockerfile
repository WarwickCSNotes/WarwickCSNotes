FROM oven/bun:1.3.9-alpine AS build
WORKDIR /app
# Copy root package.json and workspace config
COPY frontend/package.json ./frontend/
COPY frontend/turbo.json ./frontend/
COPY frontend/packages/ui ./frontend/packages/ui/
COPY frontend/apps/web/package.json ./frontend/apps/web/

# Install dependencies using bun
RUN cd frontend && bun install

# Copy source and build
COPY frontend/ ./frontend/
RUN cd frontend/apps/web && bun run build

FROM ghcr.io/astral-sh/uv:alpine3.23 AS runtime
# Install python as it's required for the app and might not be in the uv base
RUN apk add --no-cache python3

ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync

COPY app.py ./
COPY Data ./Data/

# The python app expects frontend in frontend/apps/web/dist
RUN mkdir -p frontend/apps/web
COPY --from=build /app/frontend/apps/web/dist ./frontend/apps/web/dist

EXPOSE 3000
CMD ["uv", "run", "app.py"]
