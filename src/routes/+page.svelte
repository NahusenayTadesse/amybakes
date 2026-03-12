<script lang="ts">
	import { setCart } from '$lib/hooks/cart.svelte.js';

	import ProductCard from '$lib/components/product-card.svelte';

	// Set app and cart hooks
	setCart();
	let { data } = $props();

	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Hero from '$lib/components/hero.svelte';
	import About from '$lib/components/about.svelte';
	import Accordion from '$lib/components/accordion.svelte';

	const groupedProducts = $derived(
		data?.productList.reduce((acc, product) => {
			const category = product.category || 'Uncategorized';
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(product);
			return acc;
		}, {})
	);
	import Gallery from '$lib/components/gallery.svelte';
	const teamImages = Array.from({ length: 14 }, (_, i) => `team (${i + 1}).webp`);
</script>

<svelte:head>
	<title>Amy Bakes | Authentic Baking</title>
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

<Hero />
<About />

<header class="my-16 text-center">
	<div class="mb-6 inline-flex items-center rounded-full bg-secondary px-4 py-1.5">
		<span class="text-xs font-bold tracking-wider text-secondary-foreground uppercase">
			Fresh from the oven
		</span>
	</div>

	<h1 class="mb-4 text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl">
		Our Signature <span class="text-primary">Bakes</span>
	</h1>

	<p class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
		Explore our handcrafted selection of decadent
		<span
			class="font-semibold text-foreground underline decoration-primary/30 decoration-2 underline-offset-4"
			>cookies</span
		>
		and jumbo
		<span
			class="font-semibold text-foreground underline decoration-primary/30 decoration-2 underline-offset-4"
			>muffins</span
		>, baked daily with premium ingredients.
	</p>
</header>

<hr class="mb-12 border-muted/30" />
<main class="container mx-auto px-4 py-12 pb-24">
	{#each Object.entries(groupedProducts) as [categoryName, products] (categoryName)}
		<section class="mb-16 last:mb-0">
			<div class="mb-8 flex flex-col items-start gap-1 border-l-4 border-primary pl-6">
				<h2 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
					{categoryName}
				</h2>
				<p class="text-sm font-medium tracking-widest text-muted-foreground uppercase">
					Freshly baked & ready for your box
				</p>
			</div>

			<div class="relative px-2">
				<Carousel.Root
					opts={{
						align: 'start',
						loop: true
					}}
					class="w-full"
				>
					<Carousel.Content class="-ml-4">
						{#each products as product (product.productId)}
							<Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
								<div class="group h-full transition-transform duration-300 hover:-translate-y-2">
									<ProductCard {...product} />
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>

					<div class="hidden lg:block">
						<Carousel.Previous
							class="border-secondary bg-background text-secondary-foreground hover:bg-secondary"
						/>
						<Carousel.Next
							class="border-secondary bg-background text-secondary-foreground hover:bg-secondary"
						/>
					</div>
				</Carousel.Root>
			</div>
		</section>
	{/each}
	<section class="mx-auto max-w-7xl py-16 text-center">
		<div class="mb-12">
			<h2 class="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">Meet Our Team</h2>
			<div class="mx-auto h-1 w-20 rounded-full bg-primary"></div>
			<p class="text-foreground-background mx-auto mt-4 max-w-2xl text-lg">
				The passionate individuals working behind the scenes to bring our vision to life.
			</p>
		</div>

		<Gallery images={teamImages} title="Our Team" />
	</section>
</main>

<Accordion />
