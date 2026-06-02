import { describe, expect, it } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats cents as Brazilian reais", () => {
    expect(formatPrice(3990)).toBe("R$\u00a039,90");
    expect(formatPrice(0)).toBe("R$\u00a00,00");
  });
});
