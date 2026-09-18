/** True when this deployment should never be indexed (Vercel Preview / local non-prod). */
export function isNonProductionDeploy(): boolean {
  const env = process.env.VERCEL_ENV?.trim();
  if (env) return env !== "production";
  return process.env.NODE_ENV !== "production";
}
