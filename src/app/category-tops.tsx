import Link from "next/link"
import React, { useEffect, useState } from "react"

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { Product } from "./products/types"

interface Data {
	products: Product[]
}

const CategoryTops = () => {
	const [data, setData] = useState<Data["products"]>([])

	useEffect(() => {
		fetch("https://dummyjson.com/products/category/tops")
			.then((response) => response.json())
			.then((data) => setData(data.products))
	}, [])

	if (data.length === 0) return null

	return (
		<section>
			<div className="grid gap-2">
				<h1 className="font-bold text-3xl">Products of category TOPS</h1>
			</div>

			<Carousel className="w-full my-4">
				<CarouselContent className="-ml-1">
					{data.map((product, index) => (
						<CarouselItem
							key={index}
							className="pl-1 md:basis-1/2 lg:basis-1/3">
							<Card className="overflow-hidden">
								<Link href={`/products/${product.id}`}>
									<picture>
										<img
											loading="lazy"
											src={product.thumbnail}
											alt={`photo of ${product.title}`}
											className="aspect-video object-cover"
										/>
									</picture>
								</Link>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className="left-0" />
				<CarouselNext className="right-0" />
			</Carousel>
		</section>
	)
}

export default CategoryTops
