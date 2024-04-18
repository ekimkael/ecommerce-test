"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import store from "@/store"
import Loading from "./loading"
import { Product } from "../types"
import { Button } from "@/components/ui/button"

interface Props {
	params: { productID: number }
}
export default function ProductID({ params }: Props) {
	const searchParams = useSearchParams()
	const image = searchParams.get("image")
	const [product, setProduct] = useState<Product | null>(null)
	const [selectedImage, setSelectedImage] = useState("")

	useEffect(() => {
		fetch(`https://dummyjson.com/products/${params.productID}`)
			.then((response) => response.json())
			.then((data: Product) => {
				setProduct(data)

				if (image) {
					setSelectedImage(data.images[Number(image)])
					return
				}
				setSelectedImage(data.images[0])
			})
	}, [image, params.productID])

	if (!product) return <Loading />

	return (
		<main className="container min-h-screen px-4 py-8">
			<div className="grid md:grid-cols-6">
				<section className="col-span-4">
					<picture>
						<img
							src={selectedImage}
							alt={`photo of ${product.title}`}
							className="transition-opacity aspect-video object-cover mx-auto rounded"
						/>
					</picture>

					<ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
						{product.images.map((image, index) => (
							<li key={image} className="h-20 w-20">
								<Link
									shallow
									className="h-full w-full"
									aria-label="Enlarge product image"
									href={`/products/${params.productID}?image=${index}`}>
									<div
										className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white ${
											selectedImage === image ? "border-primary" : ""
										} hover:border-primary`}>
										<img
											alt="Acme Baby Onesie - baby-onesie-beige-1"
											loading="lazy"
											src={image}
										/>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</section>

				<section className="col-span-2">
					<div className="flex flex-col gap-4">
						<h1 className="text-3xl font-semibold">{product.title}</h1>
						<p className="text-muted-foreground text-lg">
							{product.description}
						</p>
						<p className="text-2xl font-bold">${product.price}</p>

						<section>
							<Button onClick={() => store.addToCart(product)}>
								Add to cart
							</Button>
						</section>
					</div>
				</section>
			</div>
		</main>
	)
}
