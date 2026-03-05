<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRightIcon, HeartIcon, ShoppingBagIcon, CookieIcon } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	onMount(() => {
		// Load YouTube IFrame API
		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// @ts-ignore
		window.onYouTubeIframeAPIReady = () => {
			// @ts-ignore
			new YT.Player('youtube-player', {
				videoId: 'rEdl2Uetpvo', // Replace with your video ID
				playerVars: {
					autoplay: 1,
					mute: 1,
					controls: 0,
					loop: 0,
					playlist: 'rEdl2Uetpvo',
					rel: 0,
					showinfo: 0,
					modestbranding: 1
				},
				events: {
					// @ts-ignore
					onReady: (event) => {
						event.target.playVideo();
					}
				}
			});
		};
	});
</script>

<section class="relative min-h-dvh w-full overflow-hidden bg-primary">
	<!-- Decorative blobs -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div
			class="absolute top-20 right-1/3 size-72 rounded-full bg-primary-foreground/10 blur-3xl"
		></div>
		<div
			class="absolute bottom-20 left-10 size-96 rounded-full bg-primary-foreground/5 blur-3xl"
		></div>
	</div>

	<div
		class="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
	>
		<div class="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Left: Content -->
			<div class="order-2 space-y-8 lg:order-1">
				<div
					transition:fly={{ y: -20, duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm"
				>
					<CookieIcon class="size-4 text-primary-foreground" />
					<span class="text-sm font-medium text-primary-foreground">Freshly Baked Daily</span>
				</div>

				<div transition:fly={{ y: 20, duration: 600, delay: 200 }} class="space-y-4">
					<h1 class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
						<span class="text-primary-foreground">Amy Bakes</span>
						<br />
						<span class="text-primary-foreground/90">Cookies & Muffins</span>
					</h1>
				</div>

				<div transition:fly={{ y: 20, duration: 600, delay: 300 }} class="flex flex-col gap-4">
					<p class="text-xl font-semibold text-primary-foreground/80 italic sm:text-2xl">
						Taste Happiness in Every Bite
					</p>
					<p class="max-w-xl text-lg leading-relaxed text-primary-foreground/70">
						From gooey chocolate chip centers to fluffy, golden-domed muffins, we use only the
						finest ingredients to craft treats that warm your soul. Hand-made with love and
						delivered fresh to your doorstep.
					</p>
				</div>

				<div
					transition:fly={{ y: 20, duration: 600, delay: 400 }}
					class="flex flex-col gap-4 pt-4 sm:flex-row"
				>
					<Button
						size="lg"
						href="/shop"
						class="group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
					>
						Order Now
						<ShoppingBagIcon class="ml-2 size-5 transition-transform group-hover:scale-110" />
					</Button>
					<Button
						size="lg"
						href="/about-us"
						variant="outline"
						class="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
					>
						Learn More
					</Button>
				</div>

				<div
					transition:fly={{ y: 20, duration: 600, delay: 500 }}
					class="grid grid-cols-3 gap-4 border-t border-primary-foreground/20 pt-8 sm:gap-8"
				>
					{#each [{ label: 'Unique Flavors', value: '24' }, { label: 'Happy Foodies', value: '5k+' }, { label: 'Natural Ingredients', value: '100%' }] as stat (stat.label)}
						<div class="flex flex-col gap-2">
							<p class="text-2xl font-bold text-primary-foreground sm:text-3xl">{stat.value}</p>
							<p class="text-sm text-primary-foreground/60">{stat.label}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right: YouTube Video -->
			<div class="order-1 lg:order-2">
				<div
					transition:fly={{ x: 20, duration: 600, delay: 200 }}
					class="relative aspect-video w-full overflow-hidden rounded-2xl border-4 border-primary-foreground/20 shadow-2xl"
				>
					<div id="youtube-player" class="absolute inset-0 h-full w-full bg-black"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
		<div
			class="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary-foreground/60 p-2"
		>
			<div class="h-2 w-1 rounded-full bg-primary-foreground/60"></div>
		</div>
	</div>
</section>
