<script lang="ts">
	import { z } from 'zod';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-svelte';
	import { MailIcon, MessageCircleIcon, SendIcon, PhoneIcon } from '@lucide/svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	let { data } = $props();
	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	// Social links
	const socialLinks = [
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/amybakes',
			icon: IconBrandInstagram,
			color: 'hover:text-pink-500'
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@amybakes?_r=1&_t=ZM-91WtG5hY5VY',
			icon: IconBrandTiktok,
			color: 'hover:text-black dark:hover:text-white'
		},
		{
			name: 'Facebook',
			url: 'https://facebook.com/amybakes',
			icon: IconBrandFacebook,
			color: 'hover:text-blue-600'
		},
		{
			name: 'Telegram',
			url: 'https://t.me/AmyBakes',
			icon: MessageCircleIcon,
			color: 'hover:text-blue-400'
		}
	];

	// Contact info
	const contactInfo = [
		{
			icon: MailIcon,
			label: 'Email',
			value: 'info@amybakes.com',
			href: 'mailto:info@amybakes.com'
		},
		{
			icon: PhoneIcon,
			label: 'WhatsApp',
			value: 'Contact us on WhatsApp',
			href: 'https://wa.me/'
		}
	];
</script>

<svelte:head>
	<title>Contact Us | Authentic Baking</title>
	<meta
		name="description"
		content="From training rooms to tasting rooms, Amy Bakes is a hands-on business laboratory. Discover our 'Less Guilt' muffins and authentic American-style cookies."
	/>
	<meta
		name="keywords"
		content="Amy Bakes, Melela Partners, business consulting, artisanal bakery, less guilt muffins, American style cookies, business laboratory"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Amy Bakes: The Why Behind the Whisk" />
	<meta
		property="og:description"
		content="Discover how baking for Melela Partners evolved into a real-world business classroom for sourcing, pricing, and quality."
	/>
	<meta property="og:image" content="/files/mascot.webp" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="/files/mascot.webp" />
	<meta property="twitter:title" content="Amy Bakes | Business Consulting Meets Baking" />
	<meta
		property="twitter:description"
		content="A hands-on business laboratory where we practice exactly what we consult. Featuring our signature American-style chewy cookies."
	/>
	<meta property="twitter:image" content="/files/mascot.webp" />
</svelte:head>

<div class="min-h-dvh w-full bg-background text-foreground transition-colors">
	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold sm:text-5xl">Get in Touch</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				Have questions about our delicious baked goods? We'd love to hear from you! Reach out
				through any of our channels.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Contact Form -->
			<div class="lg:col-span-2">
				<Card class="border-2">
					<CardHeader>
						<CardTitle>Send us a Message</CardTitle>
						<CardDescription
							>Fill out the form below and we'll get back to you as soon as possible.</CardDescription
						>
					</CardHeader>
					<CardContent>
						<form class="space-y-6" action="?/contact" method="POST" use:enhance>
							<!-- Name -->
							<InputComp
								{form}
								{errors}
								type="text"
								name="name"
								label="Name"
								placeholder="Enter Your Name"
							/>

							<InputComp
								type="email"
								{form}
								{errors}
								name="email"
								label="Email Address"
								placeholder="your@email.com"
							/>
							<InputComp
								type="tel"
								{form}
								{errors}
								name="Phone"
								label="Phone Number"
								placeholder="+251 901020304"
							/>

							<InputComp
								{form}
								{errors}
								type="text"
								name="subject"
								label="Subject"
								placeholder="What is this about?"
							/>

							<InputComp
								{form}
								{errors}
								type="textarea"
								name="message"
								label="Message"
								placeholder="Tell us more about your inquiry..."
							/>

							<!-- Message -->

							<!-- Submit Button -->
							<Button type="submit" class="w-full gap-2">
								{#if $delayed}
									<LoadingBtn name="Sending" />
								{:else}
									<SendIcon class="h-4 w-4" />
									Send Message
								{/if}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>

			<!-- Contact Info & Social -->
			<div class="space-y-6">
				<!-- Direct Contact -->
				<Card class="border-2">
					<CardHeader>
						<CardTitle class="text-lg">Contact Info</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						{#each contactInfo as info (info.href)}
							<a
								href={info.href}
								class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent/10"
							>
								<div class="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
									<info.icon class="h-4 w-4 text-primary" />
								</div>
								<div class="flex-1">
									<p class="text-sm font-medium text-muted-foreground">{info.label}</p>
									<p class="text-sm font-semibold">{info.value}</p>
								</div>
							</a>
						{/each}
					</CardContent>
				</Card>

				<!-- Social Media -->
				<Card class="border-2">
					<CardHeader>
						<CardTitle class="text-lg">Follow Us</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="grid grid-cols-2 gap-3">
							{#each socialLinks as social (social.url)}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class={[
										'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:border-primary hover:shadow-lg',
										social.color
									]}
									title={social.name}
								>
									<social.icon class="h-6 w-6" />
									<span class="text-xs font-medium">{social.name}</span>
								</a>
							{/each}
						</div>
					</CardContent>
				</Card>

				<!-- Hours -->
				<Card class="border-2 bg-linear-to-br from-primary/5 to-accent/5">
					<CardHeader>
						<CardTitle class="text-lg">Business Hours</CardTitle>
					</CardHeader>
					<CardContent class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span class="text-muted-foreground">Monday - Friday</span>
							<span class="font-semibold">8:00 AM - 8:00 PM</span>
						</div>
						<div class="flex justify-between">
							<span class="text-muted-foreground">Saturday</span>
							<span class="font-semibold">9:00 AM - 9:00 PM</span>
						</div>
						<div class="flex justify-between">
							<span class="text-muted-foreground">Sunday</span>
							<span class="font-semibold">10:00 AM - 6:00 PM</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</main>
</div>

<section class="relative my-16 h-[50vh] w-full max-w-7xl justify-self-center lg:h-[90vh] lg:w-9/10">
	<iframe
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4342.005005207254!2d38.79191906137545!3d9.02238228049564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8565d4a30387%3A0x1cf0bebcc87aa5b2!2sShola%20Market!5e0!3m2!1sen!2set!4v1772700056618!5m2!1sen!2set"
		style="border:0;"
		class="h-full w-full rounded-3xl"
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		title="Map"
	></iframe>
</section>
