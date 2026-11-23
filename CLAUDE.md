# CLAUDE.md

See `CONVENTIONS.md` for the project's patterns (where files live, callout syntax,
maths, TikZ, `year<N>.json` schema) and `CONTRIBUTING.md` for the walkthrough.

## Callouts are closed by default

Whenever you write a callout in a note or solution, make it **collapsible and
closed** by putting `-` straight after the type: `>[!type]-`. Only leave it open
(`+` or no marker) if the user asks for that.

Hints always go in a callout, so a hint is always a closed `hint` callout. Give
each hint its own callout, numbered if there is more than one:

```markdown
**(a)** Apply the greedy algorithm to build a track of exactly $34$m.

>[!hint]- Hint 1
> Pick the longest segment that fits, then repeat on what is left.

>[!hint]- Hint 2
> Keep track of the remaining length after each pick.

>[!check]- Solution
> $18 + 6 + 6 + 3 + 1 = 34$, so 5 segments.
```

No space between `>` and `[!type]`. A blank `>` line inside the callout starts a
new paragraph.
