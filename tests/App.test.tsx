import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import App from '../src/App'

// si solo puedo hacer un test, debo hacer un END to END
//https://testing-library.com/docs/react-testing-library/intro/
// testing library user-event

describe('<App />', () => {
  //test('should work', () => {
  //  render(<App />)
  //  //screen.debug()
  //  expect(
  //    screen.getByText('Lista de Elementos')
  //  ).toBeDefined()
  //})

  test('should add items and remove them', async () => {
    const user = userEvent.setup()
    render(<App />)

    //buscar input
    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()
    //buscar form
    const form = screen.getByRole('form')
    expect(form).toBeDefined()

    const button = form.querySelector('button')
    expect(button).toBeDefined()

    //await user.type(input, 'chimera')
    //await user.click(button)

    const randomText = crypto.randomUUID()
    await user.type(input, randomText)
    await user.click(button!) // verifica que no es null

    //asegurar que el elemento sea ha agregado
    const list = screen.getByRole('list')
    expect(list).toBeDefined()

    screen.debug()
    expect(list.childNodes.length).toBe(1)

    //asegurarnos que lo podemos borrar
    const item = screen.getByText(randomText)
    const removeButton = item.querySelector('button')
    expect(removeButton).toBeDefined()

    await user.click(removeButton!)// verifica que no es null

    const noResults = screen.getByText('No hay elementos')
    expect(noResults).toBeDefined()
    screen.debug()
  })
})