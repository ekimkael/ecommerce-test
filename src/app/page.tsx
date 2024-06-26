"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

import store from "@/store"
import Spinner from "@/components/spinner"
import { APIResponse } from "./products/types"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
const CategoryTops = dynamic(() => import("./category-tops"), { ssr: false })
const Categories = dynamic(() => import("./products/categories"), {
	ssr: false,
})

export default function Home() {
	const [isLoading, setIsLoading] = useState(false)
	const [products, setProducts] = useState<APIResponse | null>(null)

	useEffect(() => {
		setIsLoading((old) => !old)

		fetch("https://dummyjson.com/products")
			.then((response) => response.json())
			.then((data: APIResponse) => {
				setProducts(data)
				setIsLoading((old) => !old)
			})
	}, [])

	return (
		<main className="container min-h-screen px-4 py-8">
			<CategoryTops />

			<Categories selected={null} />

			{!!products && !isLoading ? (
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
			) : (
				<div className="w-full flex items-center justify-center">
					<Spinner />
				</div>
			)}
		</main>
	)
}
