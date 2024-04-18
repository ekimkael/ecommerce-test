"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import store from "@/store"
import { APIResponse } from "./types"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"

export default function Products() {
	const [products, setProducts] = useState<APIResponse | null>(null)

	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((response) => response.json())
			.then((data: APIResponse) => setProducts(data))
	}, [])

	// console.log(products)

	return (
		<main className="container">
			<div className="grid gap-2">
				<h1 className="font-bold text-3xl">All Products</h1>
				<p className="text-gray-500 dark:text-gray-400">
					Discover our curated collection of high-quality products
				</p>
			</div>

			<section className="my-8">
				<ul className="flex items-center gap-2.5 flex-wrap">
					<Label
						className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
						htmlFor="electronics">
						Electronics
					</Label>
					<Label
						className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
						htmlFor="fashion">
						Fashion
					</Label>
					<Label
						className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
						htmlFor="home-decor">
						Home Decor
					</Label>
					<Label
						className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
						htmlFor="kitchenware">
						Kitchenware
					</Label>
				</ul>
			</section>

			{!!products ? (
				<ul className="grid grid-cols-4 gap-4">
					{products.products.map((item) => (
						<li key={item.id}>
							<Card className="rounded shadow-none overflow-hidden">
								<Link href={`/products/${item.id}`}>
									<picture>
										<img
											loading="lazy"
											src={item.thumbnail}
											alt={`photo of ${item.title}`}
											className="aspect-video object-cover"
										/>
									</picture>
								</Link>

								<CardContent className="p-4">
									<div className="grid gap-3">
										<article className="grid gap-1.5">
											<Link href={`/products/${item.id}`}>
												<h2 className="font-semibold text-lg leading-none">
													{item.title}
												</h2>
											</Link>

											<p className="text-sm leading-none text-muted-foreground line-clamp-2">
												{item.description}
											</p>
											<p className="text-sm text-gray-500 dark:text-gray-400">
												Category: {item.category}
											</p>
										</article>
									</div>
								</CardContent>

								<CardFooter className="justify-between">
									<span className="font-semibold text-lg sm:text-base">
										${item.price}
									</span>
									<Button size="sm" onClick={() => store.addToCart(item)}>
										Add to cart
									</Button>
								</CardFooter>
							</Card>
						</li>
					))}
				</ul>
			) : null}
		</main>
	)
}
