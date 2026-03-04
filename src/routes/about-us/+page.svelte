<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRightIcon, ShoppingBagIcon, HeartIcon, PhoneIcon } from '@lucide/svelte';
	import { CheckCircleIcon, GraduationCapIcon, HeartHandshakeIcon } from '@lucide/svelte';
	import { SparklesIcon, BadgeCheckIcon, CookieIcon, UtensilsIcon } from '@lucide/svelte';
	import { BuildingIcon, DogIcon, LeafIcon, TruckIcon } from '@lucide/svelte';

	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
</script>

<section
	class="relative overflow-hidden bg-linear-to-br from-primary/20 via-rose-100/10 to-background px-4 py-20 sm:py-32"
>
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute -top-40 -right-40 size-80 rounded-full bg-primary/10 blur-3xl"></div>
		<div class="absolute -bottom-40 -left-40 size-80 rounded-full bg-purple-100/10 blur-3xl"></div>
	</div>

	<div class="relative mx-auto max-w-4xl">
		<div class="space-y-6 text-center">
			<div
				class="inline-block rounded-full bg-primary/30 px-4 py-2 text-sm font-medium text-foreground"
			>
				Hand-baked with Heart • Taste Happiness in Every Bite
			</div>

			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
				The Why Behind the Whisk
			</h1>

			<p class="mx-auto max-w-2xl text-lg text-foreground/70 sm:text-xl">
				What started as Amy baking for her teams has evolved into a real-world business laboratory
				where we practice exactly what we consult at Melela Partners.
			</p>

			<div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
				<Button size="lg" href="/shop" class="gap-2">
					Shop Fresh Bakes
					<ArrowRightIcon class="size-4" />
				</Button>
				<Button href="/contact-us" size="lg" variant="outline">Bulk & Corporate Orders</Button>
			</div>
		</div>
	</div>
</section>

<section class="px-4 py-20 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<div class="relative">
				<div
					class="aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-purple-100/20"
				>
					<img
						src="/placeholder-bakery-interior.svg"
						alt="Amy Bakes Kitchen"
						class="h-full w-full object-cover"
					/>
				</div>
				<div
					class="shadow-lg-lg absolute -right-6 -bottom-6 max-w-xs rounded-xl bg-primary p-6 text-primary-foreground"
				>
					<p class="text-sm font-semibold">
						You can’t consult businesses if you’ve never truly run one yourself.
					</p>
				</div>
			</div>

			<div class="space-y-6">
				<div>
					<h2 class="mb-4 text-3xl font-bold sm:text-4xl">Welcome to Your "Bake-ucation"</h2>
					<p class="mb-4 text-lg leading-relaxed text-foreground/70">
						Amy Bakes is a real, hands-on learning ground for the Melela team. It’s a way to teach
						how a business actually works—from sourcing local ingredients and testing recipes to
						pricing, selling, and listening to customers.
					</p>
					<p class="text-lg leading-relaxed text-foreground/70">
						Every bite you enjoy is a result of our intentional journey to bridge the gap between
						professional consulting and true entrepreneurship.
					</p>
				</div>

				<Card class="border-primary/20 bg-primary/5">
					<CardHeader>
						<CardTitle class="text-lg">Our Philosophy</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-foreground/70">
							We believe in "less guilt" but "extra indulgence." From oatmeal-based muffins to
							Nutella-filled cupcakes, our menu is crafted for every mood.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</section>

<section class="bg-gradient-to-b from-transparent via-primary/5 to-transparent px-4 py-20 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold sm:text-4xl">The Amy Bakes Guarantees</h2>
			<p class="mx-auto max-w-2xl text-lg text-foreground/70">
				Sweetening Addis Ababa with integrity and quality
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
						<LeafIcon class="size-6 text-primary" />
					</div>
					<CardTitle>Locally Rooted</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-foreground/70">
						We use local ingredients whenever possible to support and grow Ethiopian
						agro-businesses.
					</p>
				</CardContent>
			</Card>

			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
						<TruckIcon class="size-6 text-primary" />
					</div>
					<CardTitle>Fair Delivery</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-foreground/70">
						We care for our people. 100% of our delivery fees go directly to our amazing delivery
						team.
					</p>
				</CardContent>
			</Card>

			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
						<GraduationCapIcon class="size-6 text-primary" />
					</div>
					<CardTitle>Always Learning</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-foreground/70">
						Every week we test new recipes, incorporating health-conscious and fasting-friendly
						ingredients.
					</p>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

<section class="px-4 py-20 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold sm:text-4xl">Our Signature Bakes</h2>
			<p class="mx-auto max-w-2xl text-lg text-foreground/70">
				Crafted with premium ingredients and zero dry biscuits
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
						<UtensilsIcon class="size-6 text-primary" />
					</div>
					<CardTitle>Marvelous Muffins</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<p class="text-foreground/70">Mini cakes with a healthy twist:</p>
					<ul class="flex flex-col gap-2 text-sm text-foreground/70">
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Oatmeal & Olive Oil based</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Fresh banana natural sweetness</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Guilt-free daily snacking</span>
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
						<CookieIcon class="size-6 text-primary" />
					</div>
					<CardTitle>Grandma’s Cookies</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<p class="text-foreground/70">Authentic American-style treats:</p>
					<ul class="flex flex-col gap-2 text-sm text-foreground/70">
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Soft and chewy texture</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Classic Chocolate Chip</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Salted Caramel highlights</span>
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
						<SparklesIcon class="size-6 text-primary" />
					</div>
					<CardTitle>Naked Cupcakes</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<p class="text-foreground/70">For when you deserve a real treat:</p>
					<ul class="flex flex-col gap-2 text-sm text-foreground/70">
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Extra dark chocolate base</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Nutella and Ricotta fillings</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Indulgence without the fluff</span>
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
						<DogIcon class="size-6 text-primary" />
					</div>
					<CardTitle>Chuchi Bites</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<p class="text-foreground/70">For our furry "buchila" friends:</p>
					<ul class="flex flex-col gap-2 text-sm text-foreground/70">
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Crafted for dog health & safety</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>The official snack of Addis pups</span>
						</li>
						<li class="flex gap-2">
							<span class="font-bold text-primary">•</span>
							<span>Tested by Chuche (Spokes-Puppy)</span>
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

<section class="px-4 py-20 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold sm:text-4xl">Meet the Team</h2>
			<p class="mx-auto max-w-2xl text-lg text-foreground/70">
				The humans (and hound) behind the ovens
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="flex items-center gap-4">
						<div class="rounded-lg bg-primary/10 p-3">
							<UtensilsIcon class="size-6 text-primary" />
						</div>
						<div>
							<CardTitle>Baker Amy</CardTitle>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<p class="text-foreground/70">
						The heart of the kitchen who started it all, specializing in "Less Guilt" muffins so her
						fikregna could eat as many as he wanted.
					</p>
				</CardContent>
			</Card>

			<Card class="hover:shadow-lg-lg border-primary/20 transition-all duration-300">
				<CardHeader>
					<div class="flex items-center gap-4">
						<div class="rounded-lg bg-primary/10 p-3">
							<DogIcon class="size-6 text-primary" />
						</div>
						<div>
							<CardTitle>Chuche (Spokes-Puppy)</CardTitle>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<p class="text-foreground/70">
						The inspiration behind Chuchi Bites and the fastest taste-tester in Addis. Chief Morale
						Officer and pup-influencer.
					</p>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

<section class="bg-linear-to-r from-primary/15 via-purple-50/10 to-primary/15 px-4 py-20 sm:py-32">
	<div class="mx-auto max-w-4xl">
		<div
			class="space-y-8 rounded-2xl bg-linear-to-br from-primary to-rose-400 p-8 text-center sm:p-12"
		>
			<div class="flex flex-col gap-4">
				<h2 class="text-3xl font-bold text-primary-foreground sm:text-4xl">
					Join the Amy Baksters
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-primary-foreground/90">
					Join our WhatsApp community for exclusive promos and discounts. Ready for a corporate
					order?
				</p>
			</div>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button href="/shop" size="lg" variant="secondary" class="gap-2">
					Order Online
					<ShoppingBagIcon class="size-4" />
				</Button>
				<Button href="tel:+251000000000" size="lg" variant="outline">
					<PhoneIcon class="size-4" />
					Contact Us
				</Button>
			</div>
		</div>
	</div>
</section>
