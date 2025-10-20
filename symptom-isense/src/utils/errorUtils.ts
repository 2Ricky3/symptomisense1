export type ErrorLike = { code?: unknown; message?: unknown } & Record<string, unknown>;

/**
 * @param err 
 * @returns 
 */
export function extractAuthCode(err: unknown): string | null {
  if (!err || typeof err !== 'object') return null;
  const e = err as ErrorLike;

  if (typeof e.code === 'string') return e.code;

  if (typeof e.message === 'string') {
    const msg = e.message as string;
    const m = msg.match(/auth\/[a-zA-Z-]+/);
    if (m) return m[0];
    const m2 = msg.match(/\(auth\/[a-zA-Z-]+\)/);
    if (m2) return m2[0].replace(/[()]/g, '');
  }

  return null;
}