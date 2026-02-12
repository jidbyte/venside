import { db } from '$lib/server/db';
import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { PasswordResetEmail, VerificationEmail } from '$lib/server/mailer/emails';
import { BETTER_AUTH_BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
	baseURL: BETTER_AUTH_BASE_URL,

	database: drizzleAdapter(db, {
		provider: 'pg'
	}),

	user: {
		changeEmail: { enabled: true },
		deleteUser: { enabled: true }
	},

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			PasswordResetEmail({ email: user.email, url });
		}
	},

	emailVerification: {
		sendOnSignIn: true,
		sendVerificationEmail: async ({ user, url }) => {
			VerificationEmail({ email: user.email, url });
		}
	},

	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	},

	plugins: [sveltekitCookies(() => getRequestEvent())]
});
