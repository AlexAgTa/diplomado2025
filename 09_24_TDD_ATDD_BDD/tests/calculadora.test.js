const { suma, resta } = require("../src/calculadora");

test("smoke: debería sumar dos números", () => {
  expect(suma(2, 3)).toBe(5);
});

test("regression: debería sumar dos números prueba 2", () => {
  expect(suma(5, 4)).toBe(9);
});

test("sanity: debería sumar dos números, uno negativo y otro positivo", () => {
  expect(suma(10, -3)).toBe(7);
});

test("debería sumar dos números negativos", () => {
  expect(suma(-2, -3)).toBe(-5);
});

test("negative: no debería sumar un string con número", () => {
  expect(() => suma("A", -3)).toThrow("Los caracteres no son permitidos");
});

test("negative: no debería restar un número con un string", () => {
  expect(() => resta("B", -3)).toThrow("Los caracteres no son permitidos");
});