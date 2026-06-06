export type Product = {
  id: number
  name: string
  price: number
  description: string
  needsTag: string
}

export const products: Product[] = [
    { id: 1, name: "walking device", price: 30, description: "help with walking", needsTag: "mobility" },
    { id: 2, name: "hearing aid", price: 15, description: "help with hearing", needsTag: "hearing"},
    { id: 3, name: "bottle opener", price: 10, description: "help with convenience", needsTag: "daily living"},
    { id: 4, name: "easy door handle", price: 20, description: "help with opening doors", needsTag: "daily living"},
    { id: 5, name: "staircase roller", price: 20, description: "help with walking up stairs", needsTag: "mobility"},
    { id: 6, name: "magnifying glass", price: 10, description: "help with viewing", needsTag: "vision"},
  ]