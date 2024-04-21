"use client"

import Link from "next/link"
import React, { Suspense, useSyncExternalStore } from "react"

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet"
import store from "@/store"
import { Button } from "./ui/button"

import Plus from "./icons/plus"
import Minus from "./icons/minus"
import Trash from "./icons/trash"
import ShoppingBag from "./icons/shopping-bag"

interface Props {}

const Navbar = (props: Props) => {
	const cart = useSyncExternalStore(
		store.subscribe,
		store.getCart,
		store.getServerSnapshot
	)

	const user = useSyncExternalStore(
		store.subscribe,
		store.getUser,
		store.getUser
	)

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<div className="mr-4 hidden md:flex">
					<a className="mr-6 flex items-center space-x-2" href="/">
						<span className="hidden font-bold sm:inline-block">ecommerce</span>
					</a>

					<nav className="flex items-center gap-4 text-sm lg:gap-6">
						<Link
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/products">
							Products
						</Link>
					</nav>
				</div>

				<button
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
					type="button"
					aria-haspopup="dialog"
					aria-expanded="false"
					aria-controls="radix-:R16u6la:"
					data-state="closed">
					<svg
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5">
						<path
							d="M3 5H11"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"></path>
						<path
							d="M3 12H16"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"></path>
						<path
							d="M3 19H21"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"></path>
					</svg>
					<span className="sr-only">Toggle Menu</span>
				</button>

				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="outline"
									disabled={cart.length === 0}
									size={cart.length > 0 ? "default" : "icon"}>
									<ShoppingBag />
									<span>
										{cart.length > 0 ? store.getTotalItemsCount() : null}
									</span>
								</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Cart</SheetTitle>
								</SheetHeader>

								<section className="my-4">
									<ul className="grid gap-4">
										{cart.map((product) => (
											<li key={product.id} className="flex justify-between">
												<section className="flex items-center gap-2">
													<div className="w-12 h-auto">
														<picture>
															<img
																className="object-cover"
																src={product.thumbnail}
																alt={product.title}
															/>
														</picture>
													</div>

													<div className="grid">
														<span className="line-clamp-1">
															{product.title}
														</span>
														<small>${product.price}</small>
													</div>
												</section>

												<section className="flex items-center gap-2">
													<div className="flex h-9 flex-row items-center rounded-full border border-neutral-200 overflow-hidden">
														<Button
															size="icon"
															variant="ghost"
															className="hover:bg-transparent"
															onClick={() => store.decrement(product.id)}>
															<Minus className="h-4 w-4 hover:stroke-2" />
														</Button>
														<p className="w-6 text-center">
															<span className="w-full text-sm">
																{product.quantity}
															</span>
														</p>
														<Button
															variant="ghost"
															size="icon"
															className="hover:bg-transparent"
															onClick={() => store.increment(product.id)}>
															<Plus className="h-4 w-4 hover:stroke-2" />
														</Button>
													</div>

													<Button
														size="icon"
														variant="destructive"
														className="rounded-full"
														onClick={() =>
															store.removeItemFromCart(product.id)
														}>
														<Trash className="h-4 w-4 hover:stroke-2" />
													</Button>
												</section>
											</li>
										))}
									</ul>

									<div className="py-4">
										<div className="flex items-center justify-between border-t border-neutral-200 py-1">
											<small className="text-neutral-500">Net to pay</small>
											<p className="text-right text-base">
												${store.getTotalAmount()}
												<span className="ml-1 inline">USD</span>
											</p>
										</div>
									</div>
								</section>
							</SheetContent>
						</Sheet>
					</div>

					{user ? (
						<Suspense>
							<Button onClick={() => store.signout()}>
								logout: {user.lastName}
							</Button>
						</Suspense>
					) : (
						<Link
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/auth/signin">
							Signin
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}

export default Navbar
