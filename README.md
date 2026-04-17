# Warwick CS Notes

Repository for notes. Check it out here: [https://csnotes.containers.uwcs.co.uk/](https://csnotes.containers.uwcs.co.uk/)!

## Contributing

Contribution is at the heart of this project! To learn how to contribute to the project, check out `CONTRIBUTING.md`.

## UV

This project uses UV for dependency management. Get UV here: https://docs.astral.sh/uv/getting-started/installation

## Local Testing

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

## Local Testing w/ Docker

To run:
```
docker compose up -d --build
```
*Note: you should have Docker running while doing this*

The `--build` is for forcing a fresh image to be built.

## Deploying

The Docker image is built and pushed to GHCR on every push to `main`. It is available at:

```
ghcr.io/warwickcsnotes/warwickcsnotes:latest
```

To deploy via Portainer UWCS:

- Go to [Portainer UWCS](https://portainer.uwcs.co.uk/)
- Click **Add Container**
- Set the **Image** to `ghcr.io/warwickcsnotes/warwickcsnotes:latest`
- Under port mapping, set **Host** to a random unique port number and **Container** to `3000`
- Under **Advanced Settings**, add an environment variable: `VIRTUAL_HOST=csnotes`
- Deploy the container
- The site will be available at [csnotes.containers.uwcs.co.uk](https://csnotes.containers.uwcs.co.uk/)

## More Info

Go to **Docs.md** for more detailed information about the project and its design decisions.
