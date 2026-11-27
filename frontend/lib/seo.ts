const productionHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'openmenu-ivory.vercel.app';

export const siteUrl = new URL(
  process.env.APP_URL ?? `https://${productionHost}`,
);

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl);
}
