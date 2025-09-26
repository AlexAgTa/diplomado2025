const { validarPassword } = require("../src/passwordValidator");

test("debe lanzar un error si la contraseña no es un string", () => {
  expect(() => validarPassword(12345678)).toThrow("La contraseña debe ser un string");
});

test("debe rechazar contraseñas con menos de 8 caracteres", () => {
  expect(validarPassword("Abc1$e")).toBe("La contraseña debe tener al menos 8 caracteres");
});

test("debe rechazar contraseñas sin mayúsculas", () => {
  expect(validarPassword("abcdefg1$")).toBe("La contraseña debe tener al menos una letra mayúscula");
});

test("debe rechazar contraseñas sin minúsculas", () => {
  expect(validarPassword("ABCDEFG1$")).toBe("La contraseña debe tener al menos una letra minúscula");
});

test("debe rechazar contraseñas sin números", () => {
  expect(validarPassword("Abcdefgh$")).toBe("La contraseña debe tener al menos un número");
});

test("debe rechazar contraseñas sin caracteres especiales", () => {
  expect(validarPassword("Abcdefg1")).toBe("La contraseña debe tener al menos un carácter especial");
});

test("debe aceptar una contraseña válida", () => {
  expect(validarPassword("Abcdef1$")).toBe("OK");
});
