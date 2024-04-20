import { Product } from "@/app/products/types"

export interface User {
	id: number
	email: string
	username: string
	firstName: string
	lastName: string
	gender: string
	image: string
	token: string
}

export interface Credentials {
	username: string
	password: string
}

export interface CartItem extends Product {
	quantity: number
}
