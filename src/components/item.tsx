import { Item } from "../App"

type ItemProps = {
  item: Item
  handleRemoveItem: (id: Item['id']) => void
}

export function ItemComponent({ item, handleRemoveItem }: ItemProps) {
  return (
    <li>
      {item.text}
      <button onClick={() => handleRemoveItem(item.id)}>
        Eliminar
      </button>
    </li>
  )
}