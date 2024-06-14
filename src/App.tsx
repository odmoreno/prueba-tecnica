

import { useState, useMemo } from 'react'
import './App.css'

type Item = {
  id: `${string}-${string}-${string}-${string}-${string}`
  timestamp: number
  text: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Chimera'
  }, {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Tenpai'
  }
]

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)

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

          <form onSubmit={handleSubmit}>
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
                        <li key={item.id}>
                          {item.text}
                          <button onClick={() => handleRemoveItem(item.id)}>
                            Eliminar
                          </button>
                        </li>
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
