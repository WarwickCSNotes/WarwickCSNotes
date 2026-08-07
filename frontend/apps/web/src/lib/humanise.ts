/** Turn a URL slug or resource filename into something readable.
 *
 *  Resources are named either kebab-case or PascalCase depending on where they
 *  came from, so both need handling:
 *
 *    "writing-your-cv"     -> "Writing Your Cv"
 *    "PropositionalLogic"  -> "Propositional Logic"
 */
export function humanise(slug: string): string {
  const spaced = slug.includes("-")
    ? slug.replace(/-/g, " ")
    : slug.replace(/([a-z\d])([A-Z])/g, "$1 $2")
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase())
}
