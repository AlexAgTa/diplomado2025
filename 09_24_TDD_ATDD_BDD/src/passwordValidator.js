function validarPassword(password) {
  if (typeof password !== "string") {
    throw new Error("La contraseña debe ser un string");
  }
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe tener al menos una letra mayúscula";
  }
  if (!/[a-z]/.test(password)) {
    return "La contraseña debe tener al menos una letra minúscula";
  }
  if (!/[0-9]/.test(password)) {
    return "La contraseña debe tener al menos un número";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "La contraseña debe tener al menos un carácter especial";
  }
  return "OK";
}

module.exports = { validarPassword };
