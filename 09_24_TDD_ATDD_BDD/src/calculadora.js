function suma(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Los caracteres no son permitidos");
  }
  return a + b;
}

function resta(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Los caracteres no son permitidos");
  }
  return a - b;
}

module.exports = { suma, resta };
