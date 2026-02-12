<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Message } from '$lib/core/components/custom';
	import { Button } from '$lib/core/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/core/components/ui/card';
	import { Input } from '$lib/core/components/ui/input';
	import { Label } from '$lib/core/components/ui/label';
	import { passwordReset } from '$lib/modules/auth/auth.remote';
	import { Loader } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { PasswordResetClient } from '$lib/modules/auth/client';

	const { password, confirmPassword, token } = passwordReset.fields;

	let msg = $state<string | null>(null);
	let resetToken = $state('');
	let tokenValid = $state(false);

	onMount(() => {
		resetToken = page.url.searchParams.get('token') || '';

		if (!resetToken) {
			toast.error('Invalid or missing reset token');
			goto('/auth/password/forgot');
		} else {
			tokenValid = true;
		}
	});
</script>

<div data-theme="night" class="flex min-h-screen w-full items-center justify-center p-6 md:p-12">
	<Card class=" md:max-w-lg">
		{#if tokenValid}
			<CardHeader class="flex flex-col items-center pb-6 text-center lg:pb-2">
				<Icon icon="teenyicons:unlock-circle-solid" class="my-3 size-10 text-primary" />
				<CardTitle>Create new password</CardTitle>
				<CardDescription>Please enter a new strong password for your account.</CardDescription>
			</CardHeader>

			<CardContent>
				<!-- Error Message -->
				{#if msg !== null}
					<Message variant="error">{msg}</Message>
				{/if}

				<form
					{...passwordReset.enhance(async ({ submit, form, data }) => {
						await submit();
						if (passwordReset.result?.ok) {
							const res = await PasswordResetClient(data);
							if (res?.error) {
								msg = res.error.message!;
							} else {
								toast.success('Password reset successful. Redirecting to sign in...');
								form.reset();
								setTimeout(() => {
									goto('/auth/sign-in');
								}, 2000);
							}
						}
					})}
					class="space-y-5"
				>
					<div>
						<Label>New Password</Label>
						<Input {...password.as('password')} icon="solar:lock-password-bold" />
						{#each password.issues() as issue}
							<Message>{issue.message}</Message>
						{/each}
					</div>

					<div>
						<Label>Confirm Password</Label>
						<Input {...confirmPassword.as('password')} icon="solar:lock-password-bold" />
						{#each confirmPassword.issues() as issue}
							<Message>{issue.message}</Message>
						{/each}
					</div>

					<input {...token.as('hidden', 'text')} bind:value={resetToken} readonly class="hidden" />

					<Button type="submit" class="w-full" disabled={!!passwordReset.pending}>
						{#if passwordReset.pending}
							<Loader class="size-5 animate-spin" />
						{:else}
							Reset password
						{/if}
					</Button>
				</form>
			</CardContent>
		{/if}
	</Card>
</div>
