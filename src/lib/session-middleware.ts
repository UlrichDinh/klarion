import 'server-only';

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from 'node-appwrite';

import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

import { AUTH_COOKIE } from '@/features/auth/constants';

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

/**
 * Middleware to handle user session management and authentication using Appwrite.
 * This middleware centralizes and enforces authentication and session management logic.
 *
 * @param c - The context object, which includes request and response objects.
 * @param next - The next middleware function in the stack.
 *
 * The middleware performs the following steps:
 * 1. Initializes the Appwrite client with the endpoint and project ID from environment variables.
 * 2. Retrieves the session token from cookies.
 * 3. If no session token is found, responds with a 401 Unauthorized error.
 * 4. If a session token is found, it sets the session token for the current user's permissions.
 */
export const sessionMiddleware = createMiddleware<AdditionalContext>(
  // c as Context
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Set the session token instead of admin key, restricted to the current user's permissions
    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    c.set('account', account);
    c.set('databases', databases);
    c.set('storage', storage);
    c.set('user', user);

    await next();
  }
);
