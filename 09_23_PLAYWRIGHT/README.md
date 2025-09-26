# Automatización de pruebas - Proyecto LITE

Este repositorio contiene pruebas automatizadas utilizando Playwright para la aplicación https://www.saucedemo.com/v1/index.html.

## Estructura de archivos

### tests/TC_LOGIN_SUITE.spec.ts
Contiene una suite de pruebas de login y funcionalidades relacionadas:
- **TC-001:** Verifica login exitoso con credenciales válidas.
- **TC-002:** Verifica mensaje de error con credenciales inválidas.
- **TC-007:** Valida que el botón "Add to Cart" añade un producto y el contador del carrito muestra "1".
- **TC-025:** Verifica que el producto añadido al carrito es el mismo que aparece en el carrito, comparando por nombre.

### tests/TC-001.spec.ts
Archivo de prueba individual para el caso TC-001 (login exitoso). Puede contener una versión aislada de la prueba de login.

### tests/TC-002.spec.ts
Archivo de prueba individual para el caso TC-002 (login fallido). Puede contener una versión aislada de la prueba de login con credenciales incorrectas.

### tests/TC-007.spec.ts
Archivo de prueba individual para el caso TC-007 (funcionalidad "Add to Cart"). Puede contener una versión aislada de la prueba de añadir al carrito y verificar el contador.

### tests/TC-025.spec.ts
Archivo de prueba individual para el caso TC-025 (verificación de producto en el carrito). Puede contener una versión aislada de la prueba de comparación de nombres de producto.

### tests-examples/demo-todo-app.spec.js
Ejemplo de prueba automatizada (no relacionada con la aplicación principal), útil como referencia para sintaxis y estructura de Playwright.

### playwright.config.js
Archivo de configuración de Playwright para definir opciones globales de ejecución de pruebas.

### package.json
Define las dependencias del proyecto y scripts de ejecución.

### playwright-report/
Directorio donde se generan los reportes de ejecución de pruebas.

### test-results/
Directorio donde se almacenan los resultados de las pruebas ejecutadas.

---

**Nota:** Cada archivo de prueba puede ejecutarse de forma independiente o como parte de la suite completa. Modifica y amplía los casos según las necesidades del proyecto.
