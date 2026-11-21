# Warwick CS Notes

An open-source guide to the Warwick CS degree - notes, solutions, advice, and more! Check it out here: [https://csnotes.uwcs.co.uk/](https://csnotes.uwcs.co.uk/)!

## Contributing

Contribution is at the heart of this project! To learn how to contribute to the project, check out `CONTRIBUTING.md`.

There is a note on what we're allowed to host at the top of `Docs.md`!

## UV

This project uses UV for dependency management. Get UV here: https://docs.astral.sh/uv/getting-started/installation

## Local Testing w/ Docker
*Note that if you want the LLM stuff to work, add a .env file with CLAUDE_API="yourkey" or GEMINI_KEY="yourkey"*

To build:
```
docker build -t warwickcsnotes:local .
```
*Note: you should have Docker running while doing this*

To run, without an env file:
```
docker run --rm -p 3000:3000 warwickcsnotes:local
```

To run, with an env file:
```
docker run --rm -p 3000:3000 --env-file .env warwickcsnotes:local
```

### Local Testing w/ Docker Compose (file-watch hot reload)

If you'd rather have edits to `app.py` or `Data/` synced into a running container automatically (and the image rebuilt when `frontend/`, `pyproject.toml`, `uv.lock`, or `Dockerfile` changes), use the dev compose file. It binds host port `3000:3000` and reads from `.env`, exactly like the plain `docker run` above, plus adds a `develop.watch` config so changes propagate without a manual rebuild.

To start (this builds on first run, then watches):
```
docker compose -f docker-compose.dev.yml watch
```
Visit http://localhost:3000.

To stop, hit `Ctrl+C` in the watch terminal. To clean up the container/network:
```
docker compose -f docker-compose.dev.yml down
```

`docker-compose.yml` (the production compose) stays untouched, so deploys are unaffected.

## Local Testing w/o Docker

You'll need two terminals: one for the Flask backend and one for the Vite dev server. The Vite dev server proxies `/api` and `/notes` requests to Flask, so both must be running.

### Backend (port 3000)

From the repo root:
```bash
uv run app.py
```
This starts Flask on `http://localhost:3000`. `uv` will install Python dependencies from `pyproject.toml` / `uv.lock` automatically on the first run.

### Frontend (port 5173)

In a separate terminal, from the repo root:
```bash
cd frontend
bun install    # first time only
bun dev
```
This starts the Vite dev server on `http://localhost:5173`. Open that URL in your browser — that's the site you interact with. Vite forwards API calls to Flask in the background.

Notes:
- If you haven't installed `bun`, grab it from https://bun.sh
- If you haven't installed `uv`, see the **UV** section above
- Hot reload works on both sides: saving a `.tsx` file updates the browser; saving `app.py` restarts Flask automatically (debug mode)

## Deploying

The Docker image is built and pushed to GHCR on every push to `main`. It is available at:

```
ghcr.io/warwickcsnotes/warwickcsnotes:latest
```

To deploy via Portainer UWCS:

- Go to [Portainer UWCS](https://portainer.uwcs.co.uk/)
- Go to **Sources**, click **Add new**
  - **Source Name:** `csnotes`
  - **Repo URL:** `https://github.com/WarwickCSNotes/WarwickCSNotes`
  - *Toggle authentication off*
  - *Toggle enable polling on, and set Fetch interval to e.g. 5m*
  - Click **Test Connection**, and if it succeeds, **Save Changes**
- Next, go to **Stacks**, click **Add stack**
  - **Name:** `csnotes`
  - **Build Method:** Repository
  - **Source:** `csnotes`
  - **Repository reference:** `refs/head/main`
  - **Compose path:** `docker-compose.yml`
  - *Add environment variables with non-static values (`GEMINI_KEY` & `CLAUDE_KEY`, not `VIRTUAL_HOST` - sufficient to leave as-is in `docker-compose.yml`)*
  - **Select registries:** `ghcr.io`
  - *Deploy the stack*
- The website should be visible at both `csnotes.containers.uwcs.co.uk` and `csnotes.uwcs.co.uk`
  - If not, UWCS Tech Team should check:
    - For the former, that either:
      - The `warwickcsnotes` container has joined the `public-nginx` network visible to `nginx-proxy` (should happen automatically).
      - Or that the `nginx-proxy` container has joined the `csnotes_default` network (manual).
    - For the latter, in HAProxy on Milner (manual) has all of:
      - A *Real Server* `csnotes` - server address `public-docker.internal.uwcs.co.uk`, port `5422`
      - A *Virtual Service* `csnotes_backend` with `csnotes` set under *Server*.
      - A `csnotes.uwcs.co.uk csnotes_backend` entry in the `PUBLIC_SUBDOMAINS` map files under *Advanced --> Map Files*.
      - connected to the entry under *Real Servers*, and a `csnotes.uwcs.co.uk csnotes_backend` entry in the `PUBLIC_SUBDOMAINS` map file (under *Advanced --> Map Files*).
- After a GitHub Actions workflow run has completed, Portainer GitOps will pull & deploy the changes at the next poll (default 5 minutes) - alternatively, someone with access control can redeploy.
- Pulls source from the repository reference (the `main` branch), and deployment is informed by the `docker-compose.yml` in the repository (unlike manual stacks where compose is configured locally).

## More Info

- **CONVENTIONS.md** - terse lookup reference for the recurring patterns: callout
  types, badges, the `year<N>.json` schema, resource URLs, adding a page. Start
  here if you (or an LLM) just need to know how something is done.
- **Docs.md** - detailed information about the project and its design decisions.
