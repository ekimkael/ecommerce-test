import Link from "next/link"
import React, { useEffect, useState } from "react"

interface Props {
	selected: string | null
}

const Categories = ({ selected }: Props) => {
	const [categories, setCategories] = useState<string[]>([])

	useEffect(() => {
		fetch("https://dummyjson.com/products/categories")
			.then((response) => response.json())
			.then((data: string[]) => setCategories(data))
	}, [])

	return (
		<section className="my-8">
			<ul className="flex items-center gap-2.5 flex-wrap">
				{categories.map((item) => (
					<Link
						shallow
						key={item}
						id="electronics"
						href={`/products?category=${item}`}
						className={`capitalize rounded-md p-2 flex items-center gap-2 ${
							selected === item ? "bg-primary text-white" : "border"
						}`}>
						{item}
					</Link>
				))}
			</ul>
		</section>
	)
}

export default Categories
