<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRightIcon, HeartIcon, ShoppingBagIcon, CookieIcon } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
</script>

<section
	class="relative min-h-dvh w-full overflow-hidden bg-linear-to-br from-rose-100/30 via-background to-purple-100/20"
>
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div class="absolute top-20 right-10 size-72 rounded-full bg-rose-200/20 blur-3xl"></div>
		<div class="absolute bottom-20 left-10 size-96 rounded-full bg-purple-200/10 blur-3xl"></div>
	</div>

	<div
		class="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
	>
		<div class="mx-auto max-w-4xl space-y-8 text-center">
			<div
				transition:fly={{ y: -20, duration: 600, delay: 100 }}
				class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-foreground px-4 py-2 backdrop-blur-sm"
			>
				<CookieIcon class="size-4 text-primary" />
				<span class="text-sm font-medium text-primary">Freshly Baked Daily</span>
			</div>

			<div
				transition:fly={{ y: 20, duration: 600, delay: 200 }}
				class="flex flex-col items-center justify-center gap-4"
			>
				<h1 class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
					<span
						class="bg-linear-to-r from-primary via-rose-400 to-primary bg-clip-text text-transparent"
						>Amy Bakes</span
					>
					<br />
					<span class="text-foreground">Cookies & Muffins</span>
				</h1>
			</div>

			<div transition:fly={{ y: 20, duration: 600, delay: 300 }} class="flex flex-col gap-4">
				<p class="text-xl font-semibold text-primary italic sm:text-2xl">
					Taste Happiness in Every Bite
				</p>
				<p class="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/70">
					From gooey chocolate chip centers to fluffy, golden-domed muffins, we use only the finest
					ingredients to craft treats that warm your soul. Hand-made with love and delivered fresh
					to your doorstep.
				</p>
			</div>

			<div
				transition:fly={{ y: 20, duration: 600, delay: 400 }}
				class="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
			>
				<Button size="lg" href="/shop" class="group">
					Order Now
					<ShoppingBagIcon class="ml-2 size-5 transition-transform group-hover:scale-110" />
				</Button>
				<Button size="lg" href="/about-us" variant="outline">Learn More</Button>
			</div>

			<div
				transition:fly={{ y: 20, duration: 600, delay: 500 }}
				class="grid grid-cols-3 gap-4 border-t border-primary/10 pt-12 sm:gap-8"
			>
				{#each [{ label: 'Unique Flavors', value: '24' }, { label: 'Happy Foodies', value: '5k+' }, { label: 'Natural Ingredients', value: '100%' }] as stat (stat.label)}
					<div class="flex flex-col gap-2">
						<p class="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
						<p class="text-sm text-foreground/60">{stat.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
		<div
			class="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/40 p-2"
		>
			<div class="h-2 w-1 rounded-full bg-primary/40"></div>
		</div>
	</div>
</section>
