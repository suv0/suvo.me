/** Show a reveal block and any nested `.journal-reveal` sections inside it. */
export function revealJournalBlock(root: HTMLElement): void {
  const blocks =
    root.classList.contains("journal-reveal")
      ? [root, ...root.querySelectorAll<HTMLElement>(".journal-reveal")]
      : [root, ...root.querySelectorAll<HTMLElement>(".journal-reveal")];

  for (const el of blocks) {
    el.classList.remove("journal-reveal--pending");
    el.classList.add("journal-reveal--visible");
  }
}
