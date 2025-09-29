def generar_secuencia_fibonacci(n):
    if n <= 0:
        return ""
    secuencia = []
    a, b = 0, 1
    for _ in range(n):
        secuencia.append(str(a))
        a, b = b, a + b
    return " ".join(secuencia)
