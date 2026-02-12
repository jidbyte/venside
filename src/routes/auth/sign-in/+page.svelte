<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/core/components/ui/card';
	import { Message } from '$lib/core/components/custom';
	import { Button } from '$lib/core/components/ui/button';
	import { GoogleAuthClient, LoginClient } from '$lib/modules/auth/client';
	import { emailLogin } from '$lib/modules/auth/auth.remote';
	import { Input } from '$lib/core/components/ui/input';
	import { Label } from '$lib/core/components/ui/label';
	import { Checkbox } from '$lib/core/components/ui/checkbox';
	import { Loader } from '@lucide/svelte';

	const { email, _password, rememberMe } = emailLogin.fields;

	let msg = $state<string | null>(null);
	let passwordVisible = $state(false);
</script>

<div data-theme="night" class="min-h-screen p-6 md:p-12">
	<div class="w-full items-center justify-center lg:mt-12 lg:flex lg:gap-6">
		<!-- Header -->
		<div class="mb-8 flex flex-col items-center justify-center lg:items-start">
			<Icon
				icon="icon-park-twotone:paper-ship"
				class="mb-2.5 size-10 rounded-full bg-primary p-2 text-surface lg:size-16"
			/>
			<h1 class="text-2xl font-bold lg:text-5xl">Welcome back</h1>
			<p class="mt-1 text-gray-300 lg:mt-2">Sign in to continue to your account.</p>
		</div>

		<!-- Form Card -->
		<Card class="w-full p-6 md:mx-auto md:max-w-lg">
			<!-- Message Alerts -->
			{#if msg}
				<Message variant="error" class="mb-5">{msg}</Message>
			{/if}

			<!-- Google Sign In -->
			<Button onclick={GoogleAuthClient} class="w-full bg-gray-200 text-black hover:bg-white">
				<Icon icon="flat-color-icons:google" class="mr-2 size-5" />
				Continue with Google
			</Button>

			<!-- Divider -->
			<div class="flex items-center gap-4 py-3">
				<div class="flex-1 border-t border-gray-400"></div>
				<span class="text-sm text-gray-400">Or sign in with email</span>
				<div class="flex-1 border-t border-gray-400"></div>
			</div>

			{@render SigninForm()}

			<!-- Footer -->
			<p class="mt-4 text-center text-sm text-gray-300">
				Don't have an account?
				<a href="/auth/sign-up" class="font-semibold text-blue-300 hover:underline"> Sign up </a>
			</p>
		</Card>
	</div>
</div>

{#snippet SigninForm()}
	<form
		{...emailLogin.enhance(async ({ submit, data }) => {
			await submit();

			if (emailLogin.result?.ok) {
				const res = await LoginClient({
					email: data.email,
					_password: data._password,
					rememberMe: true
				});

				if (res?.error) {
					msg = res.error.message!;
				}
			}
		})}
		class="space-y-5"
	>
		<div>
			<Label>Email</Label>
			<Input {...email.as('text')} icon="solar:letter-bold" />
			{#each email.issues() as issue}
				<Message>{issue.message}</Message>
			{/each}
		</div>

		<div>
			<Label>Password</Label>
			<div class="relative">
				<Input
					{..._password.as(passwordVisible ? 'text' : 'password')}
					icon="solar:lock-password-bold"
				/>
				<button
					type="button"
					onclick={() => (passwordVisible = !passwordVisible)}
					class="absolute top-1/2 right-3 -translate-y-1/2 text-ink/50 transition-all hover:text-ink/70"
				>
					{#if passwordVisible}
						<Icon icon="solar:eye-closed-bold" class="size-4.5" />
					{:else}
						<Icon icon="fa6-regular:eye" class="size-5" />
					{/if}
				</button>
			</div>

			{#each _password.issues() as issue}
				<Message>{issue.message}</Message>
			{/each}
		</div>

		<div>
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-center gap-1">
					<Checkbox {...rememberMe.as('checkbox')} />
					<Label class="m-0">Remember me</Label>
				</div>

				<p class="text-center text-sm text-gray-300">
					<a href="/auth/password/forgot" class="font-semibold text-blue-300 hover:underline">
						Forgot your password?
					</a>
				</p>
			</div>

			<Button
				type="submit"
				class="mt-2 w-full bg-sky-600 text-white hover:bg-sky-500"
				disabled={!!emailLogin.pending}
			>
				{#if emailLogin.pending}
					<Loader class="size-5 animate-spin" />
				{:else}
					Sign In
				{/if}
			</Button>
		</div>
	</form>
{/snippet}
