import { Product } from "./app/products/types"
import { CartItem, Credentials, User } from "./utils/types"

let cart: CartItem[] = []
let user: User | null = null
let token: string | null = null
let subscribers: Set<() => void> = new Set()

if (typeof window !== "undefined") {
	token = localStorage.getItem("token") || null
}

const store = {
	getCart: () => cart,

	// subscribe and unsubscribe from the store using callback
	subscribe: (callback: () => void): (() => void) => {
		subscribers.add(callback)
		return () => subscribers.delete(callback)
	},

	getServerSnapshot: () => cart,
	// Fonction pour ajouter un article au panier
	addToCart: (item: Product) => {
		const existingItem = cart.find((i) => i.id === item.id)
		if (existingItem) {
			// Si l'article existe déjà dans le panier, mettez à jour la quantité
			cart = cart.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
			)
		} else {
			// Sinon, ajoutez-le au panier
			cart = [...cart, { ...item, quantity: 1 }]
		}

		subscribers.forEach((callback) => {
			callback()
		})
	},

	removeItemFromCart: (itemId: number) => {
		cart = cart.filter((item) => item.id !== itemId)

		subscribers.forEach((callback) => {
			callback()
		})
	},

	increment: (itemId: number) => {
		cart = cart.map((item) => {
			if (item.id === itemId) {
				return { ...item, quantity: item.quantity + 1 }
			}

			if (item.id === itemId && item.stock === item.quantity) {
				throw new Error("there is no more stock for this product")
			}

			return item
		})

		subscribers.forEach((callback) => {
			callback()
		})
	},

	decrement: (itemId: number) => {
		cart = cart.map((item) => {
			if (item.id === itemId && item.quantity > 1) {
				return { ...item, quantity: Math.max(0, item.quantity - 1) }
			}

			return item
		})

		subscribers.forEach((callback) => {
			callback()
		})
	},

	getTotalItemsCount: (): number => {
		return cart.reduce((total, item) => total + item.quantity, 0)
	},

	getTotalAmount: (): number => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0)
	},

	// Authentication section
	getToken: () => token,

	getUser: () => {
		if (typeof window !== "undefined") {
			// token = localStorage.getItem("token") || null
			const payload = localStorage.getItem("user")
			if (payload && !user) {
				const decoded = window.atob(payload)
				const data = JSON.parse(decoded)
				user = data
				return user
			}
		}

		if (user) return user

		return null
	},

	signin: ({ username, password }: Credentials) => {
		fetch("https://dummyjson.com/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				const payload = window.btoa(JSON.stringify(data))
				localStorage.setItem("token", data.token)
				localStorage.setItem("user", payload)
				token = data.token
				user = data

				subscribers.forEach((callback) => callback())
			})
			.catch((error) => {
				throw new Error("Nom d'utilisateur ou mot de passe incorrect")
			})
	},

	signout: () => {
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		token = null
		user = null
		subscribers.forEach((callback) => callback())
	},
}

// exporting the default store state
export default store
