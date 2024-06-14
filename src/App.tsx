

import { useState, useMemo } from 'react'
import { ItemComponent } from './components/item'
import './App.css'


export type Item = {
  id: `${string}-${string}-${string}-${string}-${string}`
  timestamp: number
  text: string
}

export type ItemID = `${string}-${string}-${string}-${string}-${string}`

//const INITIAL_ITEMS: Item[] = [
//  {
//    id: crypto.randomUUID(),
//    timestamp: Date.now(),
//    text: 'Chimera'
//  }, {
//    id: crypto.randomUUID(),
//    timestamp: Date.now(),
//    text: 'Tenpai'
//  }
//]

function App() {
  const [items, setItems] = useState<Item[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const input = elements.namedItem('item')

    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems([...items, newItem])
    input.value = ''
  }

  function handleRemoveItem(id: Item['id']) {
    setItems(prevItems => prevItems.filter((item) => item.id !== id))
  }

  const isEmpty = useMemo(() => items.length === 0, [items])

  return (
    <>
      <main>
        <aside>
          <h1>Prueba tecnosa</h1>
          <h2> Anadir y eliminar elementos a una lista</h2>

          <form
            onSubmit={handleSubmit}
            aria-label='add element to list'>
            <label>
              Elemento a introducir:
              <input
                type="text"
                name='item'
                required
                placeholder='ganar el mundial'
              />
            </label>
            <button>Add element to list</button>
          </form>
        </aside>

        <section>
          <h2> Lista de Elementos</h2>
          {
            isEmpty ? (
              <p>No hay elementos</p>
            ) : (
              <>
                <ul>
                  {
                    items.map(item => {
                      return (
                        <ItemComponent
                          key={item.id}
                          item={item}
                          handleRemoveItem={handleRemoveItem}
                        />
                      )

                    })
                  }
                </ul>
              </>
            )
          }
        </section>
      </main >
    </>
  )
}

export default App
