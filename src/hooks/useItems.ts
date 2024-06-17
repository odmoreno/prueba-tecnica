import { useState, useMemo } from 'react'
import { Item } from "../App"

export const useItems = () =>{

  const [items, setItems] = useState<Item[]>([])
  const addItem = (text: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      text: text,
      timestamp: Date.now()
    }

    setItems([...items, newItem])
  }

  const removeItem = (id: Item['id']) => {
    setItems(prevItems => prevItems.filter((item) => item.id !== id))
  }

  const isEmpty = useMemo(() => items.length === 0, [items])

  return{
    items,
    addItem,
    removeItem,
    isEmpty
  }
}