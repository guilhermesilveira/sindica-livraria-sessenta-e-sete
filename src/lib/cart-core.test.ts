import { describe, expect, it } from "vitest";
import {
  addLineToCart,
  buildCartDetails,
  normalizeQuantity,
  parseCartCookie
} from "./cart-core";

describe("normalizeQuantity", () => {
  it("keeps quantities inside the supported cart range", () => {
    expect(normalizeQuantity(0)).toBe(1);
    expect(normalizeQuantity(3.8)).toBe(3);
    expect(normalizeQuantity(120)).toBe(99);
    expect(normalizeQuantity("not a number")).toBe(1);
  });
});

describe("parseCartCookie", () => {
  it("returns an empty cart for missing, invalid, or non-list cookie values", () => {
    expect(parseCartCookie()).toEqual([]);
    expect(parseCartCookie("bad json")).toEqual([]);
    expect(parseCartCookie(JSON.stringify({ productId: "book-1" }))).toEqual([]);
  });

  it("keeps valid lines and normalizes quantities", () => {
    expect(
      parseCartCookie(
        JSON.stringify([
          { productId: "book-1", quantity: 2 },
          { productId: "", quantity: 4 },
          { productId: "book-2", quantity: 120 }
        ])
      )
    ).toEqual([
      { productId: "book-1", quantity: 2 },
      { productId: "book-2", quantity: 99 }
    ]);
  });
});

describe("addLineToCart", () => {
  it("adds a new product respecting available stock", () => {
    expect(addLineToCart([], { id: "book-1", stock: 3 }, 5)).toEqual([
      { productId: "book-1", quantity: 3 }
    ]);
  });

  it("increments an existing product without mutating the previous cart", () => {
    const cart = [{ productId: "book-1", quantity: 1 }];

    expect(addLineToCart(cart, { id: "book-1", stock: 5 }, 2)).toEqual([
      { productId: "book-1", quantity: 3 }
    ]);
    expect(cart).toEqual([{ productId: "book-1", quantity: 1 }]);
  });
});

describe("buildCartDetails", () => {
  it("calculates subtotals and totals for products still available", () => {
    const result = buildCartDetails(
      [
        { productId: "book-1", quantity: 2 },
        { productId: "missing-book", quantity: 5 },
        { productId: "book-2", quantity: 1 }
      ],
      [
        { id: "book-1", priceInCents: 3990, title: "JavaScript" },
        { id: "book-2", priceInCents: 4590, title: "IA" }
      ]
    );

    expect(result.totalQuantity).toBe(3);
    expect(result.totalInCents).toBe(12570);
    expect(result.items).toEqual([
      {
        product: { id: "book-1", priceInCents: 3990, title: "JavaScript" },
        quantity: 2,
        subtotalInCents: 7980
      },
      {
        product: { id: "book-2", priceInCents: 4590, title: "IA" },
        quantity: 1,
        subtotalInCents: 4590
      }
    ]);
  });
});
