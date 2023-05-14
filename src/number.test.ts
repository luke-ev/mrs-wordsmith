import { numberConversion } from "./number";

test('whole number returns as correct Roman numeral', () => {
    expect(numberConversion(15)).toBe('XV')
})