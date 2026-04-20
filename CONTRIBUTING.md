# Contributing

This document covers how to suggest changes and how to contribute directly. 

Contributions are greatly appreciated! Contributions shape how successful the project ultimately is. 

If you submit a successful edit contribution to the project (so a PR usually), you will be added to the Credits section of the site `:)`

## Reporting Issues

If you've spotted a bug or want to flag a mistake in a note:
- **Discord:** drop a message in the *#bug-report* channel on the [Discord Server](https://discord.gg/wdQxub7z9V). 

## Suggesting

If you think there's something that should be added, make a suggestion!

Generally, make suggestions if you think it's something that would make people more likely to use the website. 

- **Discord:** drop a suggestion in the *#suggestions* channel on the [Discord Server](https://discord.gg/wdQxub7z9V). This is good for discussing suggestions.
- **Formal tracking:** Open a GitHub Issue on the repo. Please include:
  - The suggestion's concept
  - Exact details of how the feature would work including things like UI layout

If you're not sure whether to open an issue or a Pull Request (PR), default to an issue; it's easier to discuss an approach before anyone writes code.

## Contributing an Edit with a Pull Request (PR)

General workflow:

1) Fork the repo and create a branch: `git checkout -b add-cs130-functions-note`
2) Make your changes (see sections below)
3) Run locally to check it works - see the README's *Local Testing* section (optional for basic changes like adding/editing note or solution files)
4) Open a pull request against `main` with a short description of what changed and why

If you don't understand how to do the above, you can also just send me (rexmortem60) the files on Discord.

### Adding a resource (note or solution)

Resources live under `Data/Resources/`:

- Notes go in `Data/Resources/Notes/` (e.g., `Sets.md`, `Memory.md`)
- Solutions go in `Data/Resources/Solutions/` with the filename `<ModuleCode>-<PaperYear>.md` (e.g., `CS130-2025.md`)

Steps:

1) **Write the file:** Markdown (`.md`), LaTeX (`.tex`), or PDF (`.pdf`) are all supported! Markdown with embedded LaTeX (via `$...$` / `$$...$$`) is the most common choice, renders well, and is easy for multiple people to collaborate on.

2) **If you have images:** Put images inside of `Data/Resources/Images`. Reference them in markdown with `/Resources/Images/YourImage.png`

3) **Link it:** Open `Data/YearData/year<N>.json`, find the module, and add an entry.
Note that these entries are separated by commas, and the last entry shouldn't have a comma at the end (see `CS130` in `year1.json` for an example):

  - **Notes:** Add to the module's `notes` array e.g.:
   ```json
   {"title": "Functions", "url": "/resources/Notes/CS130/Functions"}
   ```
   The URL format is `/resources/Notes/<ModuleCode>/<FilenameWithoutExtension>`. 

  - **Solutions:** Add to the module's `past_papers` or `exercise_solutions` array e.g.:
   ```json
   {"title": "2024 Exam Paper", "url": "#", "solution": {"url": "/resources/Solutions/CS130/CS130-2024"}}
   ```

  - **Verified?** If a tutor or module organiser has reviewed the resource, set `"verified": true` on the entry (or inside the nested `solution` object to mark just the solution as verified) e.g.
  ```json
   {"title": "2024 Exam Paper", "url": "#", "verified": true, "solution": {"url": "/resources/Solutions/CS130/CS130-2024", "verified": true}}
   ```

  - **Unfinished?** If a resource is still being worked on, set `"unfinished": true` on the entry (or inside the nested `solution` object to mark just the solution) to show a construction badge.

### Adding an external resource or editing a module

All module metadata lives in `Data/YearData/year<N>.json`.

- **Editing the description or tagline**: find the module by its code and edit the `tagline`, `name`, `description`, `Term`, or `CATS` field. Taglines are short and basically shitposts; descriptions are longer and should have actual relevant information. 

- **Adding an external resource**: add (or create) an `external_resources` array on the module. Each entry needs a `name` and `description`; `url` is optional (entries without a URL render as a non-clickable card - useful for suggestions like "ask on Discord" or book titles without an obvious online source). Example:

   ```json
   "external_resources": [
     {
       "name": "Book of Proof (Hammack)",
       "url": "https://richardhammack.github.io/BookOfProof/Main.pdf",
       "description": "Free online textbook, great for proof techniques."
     },
     {
       "name": "Yijun's Notes",
       "url": "https://yijun.hu/blog-cs/cs130/",
       "description": "Really good set of notes; may not reflect the most recent module structure."
     }
   ]
   ```