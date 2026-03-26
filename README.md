# Warwick CS Notes

Repository for notes. 

## UV

This project uses UV for dependency management. Get UV here: https://docs.astral.sh/uv/getting-started/installation

## Local Testing

You need to run the backend and also the frontend.

### Backend
Run:
```bash
uv run app.py
```
Or install dependencies with `uv sync` and run `flask run`.

Server-side output will be in the terminal.

### Frontend

Run (in a separate terminal, and CDed into frontend):
```
bun dev
```

## Deploying

Not figured this out yet.

## More Info

Go to **Docs.md** for more detailed information about the project and its design decisions.
