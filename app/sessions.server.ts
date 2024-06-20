import type { CookieOptions } from '@remix-run/server-runtime/dist/cookies';
import { createCookie, createFileSessionStorage } from '@remix-run/node';

const COOKIE_SETTINGS: CookieOptions = {
  httpOnly: true,
  path: `${process.env.ROUTER_PREFIX ?? ''}/`,
  sameSite: 'lax',
  secrets: [process.env.COOKIE_SECRET ?? ''],
  secure: process.env.COOKIE_SECURE === 'true',
  maxAge: 36000,
};

const sessionCookie = createCookie("TB2_auth__session", {
  ...COOKIE_SETTINGS
});

const session = createFileSessionStorage({
  dir: "sessions",
  cookie: sessionCookie,
});
console.log("session: ", session);
const { getSession, commitSession, destroySession } = session;

export { getSession, commitSession, destroySession };