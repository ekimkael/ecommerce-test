import { Product } from "./app/products/types"

interface CartItem extends Product {
	quantity: number
}

let cart: CartItem[] = []
let subscribers: Set<() => void> = new Set()

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
}

// exporting the default store state
export default store
