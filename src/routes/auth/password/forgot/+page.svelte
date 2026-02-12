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
	import { passwordRequest } from '$lib/modules/auth/auth.remote';
	import { PasswordRequestClient } from '$lib/modules/auth/client';
	import { Loader } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	const { email } = passwordRequest.fields;

	let emailSent = $state(false);
	let msg = $state<string | null>(null);
</script>

<div data-theme="night" class="flex min-h-screen w-full items-center justify-center p-6 md:p-12">
	<Card class=" md:max-w-lg">
		{#if emailSent}
			<!-- Success State -->
			<CardContent>
				<div class="mt-4 flex flex-col items-center">
					<Icon icon="mingcute:mail-send-fill" class="size-12 text-primary" />
					<h2 class="mb-4 text-2xl font-bold">Check your email</h2>
				</div>

				<div class="mb-6 space-y-3">
					<Message variant="success">
						We've sent password reset instructions to your email address.
					</Message>

					<Message variant="info">Can't find the email? Check your spam or junk folder.</Message>
				</div>

				<!-- Action Buttons -->
				<div class="text-medium flex flex-col items-center space-y-1.5 text-gray-50">
					<a href="/auth/sign-in" class="hover:text-primary hover:underline"> Return to sign in </a>

					<button
						type="button"
						class="w-full transition-colors hover:text-primary hover:underline"
						onclick={() => (emailSent = false)}
					>
						Didn't receive the email? Try again
					</button>
				</div>
			</CardContent>
		{:else}
			<!-- Password Reset Form -->
			<div>
				<CardHeader class="flex flex-col items-center pb-6 text-center lg:pb-2">
					<Icon icon="teenyicons:lock-circle-solid" class="my-3 size-10 text-primary" />
					<CardTitle>Forgot your password?</CardTitle>
					<CardDescription>
						Enter your email address and we'll send you instructions to reset your password.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<!-- Error Message -->
					{#if msg !== null}
						<Message variant="error">{msg}</Message>
					{/if}

					<form
						{...passwordRequest.enhance(async ({ submit, form, data }) => {
							await submit();
							if (passwordRequest.result?.ok) {
								const res = await PasswordRequestClient(data.email);
								if (res?.error) {
									msg = res.error.message!;
								} else {
									emailSent = true;
									toast.success('Reset instructions sent to your email');
									form.reset();
								}
							}
						})}
					>
						<div>
							<Label>Email address</Label>
							<Input {...email.as('email')} icon="solar:letter-bold" />
							{#each email.issues() as issue}
								<Message>{issue.message}</Message>
							{/each}
						</div>

						<Button class="my-4 w-full" type="submit" disabled={!!passwordRequest.pending}>
							{#if passwordRequest.pending}
								<Loader class="size-5 animate-spin" />
							{:else}
								Reset Password
							{/if}
						</Button>

						<div class="text-center text-primary hover:underline">
							<a href="/auth/sign-in"> Return to sign in </a>
						</div>
					</form>
				</CardContent>
			</div>
		{/if}
	</Card>
</div>
