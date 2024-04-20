"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import store from "@/store"

interface Props {}

const SignIn = (props: Props) => {
	const router = useRouter()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await store.signin({ username, password })
			router.push("/")
		} catch (error: unknown) {
			setError((error as Error).message)
		}
	}

	return (
		<main className="flex-1 flex items-center">
			<Card className="border-none shadow-none w-full md:max-w-sm md:mx-auto">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<CardTitle className="underline-title text-2xl">Sign in</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="username">username: </Label>
							<Input
								required
								type="text"
								id="username"
								value={username}
								placeholder="Enter your username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password: </Label>
							<Input
								required
								id="password"
								type="password"
								value={password}
								placeholder="Enter your password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<Button className="w-full uppercase">Sign in</Button>
					</CardContent>
				</form>
			</Card>
		</main>
	)
}

export default SignIn
