import { describe, expect, test } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useItems } from "../src/hooks/useItems"

describe("useItems hook", () => {
	test("should add and remove items", () => {
		const { result } = renderHook(() => useItems())
		console.log(result)

		expect(result.current.items.length).toBe(0)

		act(() => {
			result.current.addItem("Chimera")
		})

		act(() => {
			result.current.addItem("Fire king")
		})

		console.log(result.current.items)
		expect(result.current.items.length).toBe(2)

		act(() => {
			result.current.removeItem(result.current.items[0].id)
		})

		expect(result.current.items.length).toBe(1)
	})
})
