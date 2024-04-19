import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {}

const SignIn = (props: Props) => {
	return (
		<main className="flex-1 flex items-center">
			<Card className="border-none shadow-none w-full md:max-w-sm md:mx-auto">
				<CardHeader>
					<CardTitle className="underline-title text-2xl">Sign in</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email: </Label>
						<Input
							required
							id="email"
							type="email"
							placeholder="Enter your email address"
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password">Password: </Label>
						<Input
							required
							id="password"
							type="password"
							placeholder="Enter your password"
						/>
					</div>

					<Button className="w-full uppercase">Sign in</Button>
				</CardContent>
			</Card>
		</main>
	)
}

export default SignIn
