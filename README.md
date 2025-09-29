# Reto 1

## Ejercicio: Secuencia de Fibonacci con TDD

Se requiere desarrollar una función que genere la secuencia de Fibonacci hasta la secuencia 50 como una única cadena de texto. La función recibirá un número entero n que indica cuántos elementos de la secuencia se deben generar y concatenar.

### Proceso TDD aplicado
Para abordar este problema se siguió el ciclo Test-Driven Development (TDD):
- **Red:** Se escriben primero las pruebas unitarias que definen el comportamiento esperado.
- **Green:** Se implementa la función hasta que todas las pruebas pasan.
- **Refactor:** Se mejora el código manteniendo las pruebas en verde.

### Archivos principales

- **fibonacci.py**
	- Contiene la función `generar_secuencia_fibonacci(n)` que genera la secuencia de Fibonacci como una cadena de texto, separando los números por espacio.
	- Si n es 0 o negativo, retorna una cadena vacía.

- **test_fibonacci.py**
	- Pruebas unitarias para la función `generar_secuencia_fibonacci(n)` usando el módulo estándar `unittest`.
	- Incluye casos para 0, 1, 2, 5 y 50 elementos, verificando tanto la cantidad como el contenido de la secuencia.

### Ejecución de pruebas
Para ejecutar las pruebas unitarias, usa el siguiente comando desde la carpeta `RETO_1`:

```bash
python -m unittest test_fibonacci.py
```

---
