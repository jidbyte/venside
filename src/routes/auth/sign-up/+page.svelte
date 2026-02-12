<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/core/components/ui/card';
	import { Message } from '$lib/core/components/custom';
	import { Button } from '$lib/core/components/ui/button';
	import { GoogleAuthClient, SignUpClient } from '$lib/modules/auth/client';
	import { emailSignup } from '$lib/modules/auth/auth.remote';
	import { Input } from '$lib/core/components/ui/input';
	import { Label } from '$lib/core/components/ui/label';
	import { Loader } from '@lucide/svelte';

	const { firstname, lastname, email, _password } = emailSignup.fields;

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
			<h1 class="text-2xl font-bold lg:text-5xl">Let's get you started</h1>
			<p class="mt-1 text-gray-300 lg:mt-2">
				Start your 14-day free trial. No credit card required.
			</p>
		</div>

		<!-- Form Card -->
		<Card class="w-full p-6 md:mx-auto md:max-w-lg">
			<!-- Message Alerts  -->
			{#if msg === 'success'}
				<Message variant="success" class="mb-5">
					Account created successfully! Please check your email to verify your account.
				</Message>
			{:else if msg != null}
				<Message variant="error" class="mb-5">{msg}</Message>
			{/if}

			<!-- Google Sign Up -->
			<Button onclick={GoogleAuthClient} class="w-full bg-gray-200 text-black hover:bg-white">
				<Icon icon="flat-color-icons:google" class="mr-2 size-5" />
				Continue with Google
			</Button>

			<!-- Divider -->
			<div class="flex items-center gap-4 py-3">
				<div class="flex-1 border-t border-gray-400"></div>
				<span class="text-sm text-gray-400">Or sign up with email</span>
				<div class="flex-1 border-t border-gray-400"></div>
			</div>

			<!-- Sign Up Form -->
			{@render SignupForm()}

			<!-- Terms & Privacy -->
			<p class="mt-4 text-center text-xs text-gray-300">
				By signing up, you agree to our
				<a href="/" class="font-medium text-blue-300 hover:underline">Terms</a>
				and
				<a href="/" class="font-medium text-blue-300 hover:underline">Privacy Policy</a>.
			</p>

			<!-- Footer Links -->
			<p class="mt-4 text-center text-sm text-gray-300">
				Already have an account?
				<a href="/auth/sign-in" class="font-semibold text-blue-300 hover:underline"> Sign in </a>
			</p>
		</Card>
	</div>
</div>

{#snippet SignupForm()}
	<form
		{...emailSignup.enhance(async ({ submit, form, data }) => {
			await submit();
			if (emailSignup.result?.ok) {
				const res = await SignUpClient(data);

				if (res?.error) {
					msg = res.error?.message!;
				} else {
					msg = 'success';
					form.reset();
				}
			}
		})}
		class="space-y-5"
	>
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
			<div>
				<Label>First name</Label>
				<Input {...firstname.as('text')} icon="solar:user-bold" />
				{#each firstname.issues() as issue}
					<Message>{issue.message}</Message>
				{/each}
			</div>

			<div>
				<Label>Last name</Label>
				<Input {...lastname.as('text')} icon="solar:user-bold" />
				{#each lastname.issues() as issue}
					<Message>{issue.message}</Message>
				{/each}
			</div>
		</div>

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
					aria-label={passwordVisible ? 'Hide password' : 'Show password'}
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

		<Button
			type="submit"
			class="mt-2 w-full bg-sky-600 text-white hover:bg-sky-500"
			disabled={!!emailSignup.pending}
		>
			{#if emailSignup.pending}
				<Loader class="size-5 animate-spin" />
			{:else}
				Sign Up
			{/if}
		</Button>
	</form>
{/snippet}
