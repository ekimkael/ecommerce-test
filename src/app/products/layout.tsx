import { Suspense } from "react"

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Suspense>{children}</Suspense>
}
