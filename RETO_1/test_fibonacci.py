import unittest
from fibonacci import generar_secuencia_fibonacci

class TestFibonacci(unittest.TestCase):
    def test_cero_elementos(self):
        self.assertEqual(generar_secuencia_fibonacci(0), "")

    def test_un_elemento(self):
        self.assertEqual(generar_secuencia_fibonacci(1), "0")

    def test_dos_elementos(self):
        self.assertEqual(generar_secuencia_fibonacci(2), "0 1")

    def test_cinco_elementos(self):
        self.assertEqual(generar_secuencia_fibonacci(5), "0 1 1 2 3")

    def test_cincuenta_elementos(self):
        secuencia = generar_secuencia_fibonacci(50)
        elementos = secuencia.split()
        self.assertEqual(len(elementos), 50)
        # Verifica los primeros 6 elementos
        self.assertEqual(elementos[:6], ["0", "1", "1", "2", "3", "5"])

if __name__ == "__main__":
    unittest.main()
