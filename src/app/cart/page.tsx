"use client"

import React, { useEffect, useState, useSyncExternalStore } from "react"

import store from "@/store"
import Plus from "@/components/icons/plus"
import Minus from "@/components/icons/minus"
import Trash from "@/components/icons/trash"
import { Button } from "@/components/ui/button"

import Loading from "../products/[productID]/loading"

interface Props {}

const CartPage = (props: Props) => {
	const user = useSyncExternalStore(
		store.subscribe,
		store.getUser,
		store.getUser
	)

	const [isLoading, setIsLoading] = useState(false)
	const [carts, setCarts] = useState<any>(null)

	useEffect(() => {
		setIsLoading((old) => !old)

		if (user) {
			fetch(`https://dummyjson.com/carts/user/${user.id}`)
				.then((response) => response.json())
				.then((data) => {
					setCarts(data.carts)
					setIsLoading((old) => !old)
				})
		}
	}, [user])

	if (!isLoading && carts) {
		return (
			<div className="container">
				<ul>
					{carts.map((item: any, index: number) => (
						<li key={item.id}>
							<h3>Cart {index}</h3>
							<section>
								<ul className="grid gap-4 divide-y">
									{item.products.map((item: any) => (
										<li key={item.id} className="flex justify-between">
											<section className="flex items-center gap-2">
												<div className="w-12 h-auto">
													<picture>
														<img
															className="object-cover"
															src={item.thumbnail}
															alt={item.title}
														/>
													</picture>
												</div>

												<div className="grid">
													<span className="line-clamp-1">{item.title}</span>
													<small>${item.price}</small>
												</div>
											</section>

											<section className="flex items-center gap-2">
												<div className="flex h-9 flex-row items-center rounded-full border border-neutral-200 overflow-hidden">
													<Button
														size="icon"
														variant="ghost"
														className="hover:bg-transparent"
														onClick={() => store.decrement(item.id)}>
														<Minus className="h-4 w-4 hover:stroke-2" />
													</Button>
													<p className="w-6 text-center">
														<span className="w-full text-sm">
															{item.quantity}
														</span>
													</p>
													<Button
														variant="ghost"
														size="icon"
														className="hover:bg-transparent"
														onClick={() => store.increment(item.id)}>
														<Plus className="h-4 w-4 hover:stroke-2" />
													</Button>
												</div>

												<Button
													size="icon"
													variant="destructive"
													className="rounded-full"
													onClick={() => store.removeItemFromCart(item.id)}>
													<Trash className="h-4 w-4 hover:stroke-2" />
												</Button>
											</section>
										</li>
									))}
								</ul>

								<div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
									<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
										<p>Total</p>
										<p className="text-right text-base text-black dark:text-white">
											${item.total}
											<span className="ml-1 inline">USD</span>
										</p>
									</div>
									<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
										<p>Total after discount</p>
										<p className="text-right">
											${item.discountedTotal}
											<span className="ml-1 inline">USD</span>
										</p>
									</div>
									<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
										<p>Net to pay</p>
										<p className="text-right text-base text-black dark:text-white">
											${item.discountedTotal}
											<span className="ml-1 inline">USD</span>
										</p>
									</div>
								</div>
							</section>
						</li>
					))}
				</ul>
			</div>
		)
	}

	return <Loading />
}

export default CartPage
