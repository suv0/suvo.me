/**
 * Vercel "Ignored Build Step" — exit 0 skips the build, exit 1 runs it.
 * @see https://vercel.com/docs/project-configuration#ignorecommand
 */
const allowedBranches = new Set(["master", "qa"]);
const branch = process.env.VERCEL_GIT_COMMIT_REF ?? "";

if (allowedBranches.has(branch)) {
  console.log(`[vercel] Building branch: ${branch}`);
  process.exit(1);
}

console.log(`[vercel] Skipping build for branch: ${branch || "(unknown)"}`);
process.exit(0);
