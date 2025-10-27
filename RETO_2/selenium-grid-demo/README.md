# Selenium Grid Demo

Este proyecto demuestra la implementación de pruebas automatizadas utilizando Selenium Grid con Docker, Node.js y Mocha.

## Prerrequisitos

Antes de ejecutar las pruebas, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

## Estructura del Proyecto

```
selenium-grid-demo/
├── config/
│   └── webdriver-simple-config.js
├── tests/
│   └── reliable-chrome-test.js
├── docker-compose.yml
├── package.json
└── run-tests.js
```

## Configuración Inicial

1. Clona el repositorio (o descarga los archivos):
```bash
git clone <url-del-repositorio>
cd selenium-grid-demo
```

2. Instala las dependencias:
```bash
npm install
```

## Ejecución de Pruebas

Para ejecutar las pruebas, simplemente usa:
```bash
node run-tests.js
```

Este comando realizará las siguientes acciones:
1. Iniciará Selenium Grid usando Docker Compose
2. Esperará a que los servicios estén listos (15 segundos)
3. Ejecutará las pruebas con Mocha
4. Detendrá los contenedores de Selenium Grid al finalizar

## Servicios Disponibles

Durante la ejecución de las pruebas, puedes acceder a:

- **Selenium Grid Dashboard**: [http://localhost:4444/ui](http://localhost:4444/ui)
- **VNC Viewer**: [http://localhost:7900](http://localhost:7900) (si está configurado)

## Pruebas Incluidas

El proyecto incluye las siguientes pruebas:

- Login en Sauce Demo (https://www.saucedemo.com/)
  - Verifica el proceso de inicio de sesión
  - Valida la navegación exitosa al inventario
  - Confirma la presencia de productos listados

## Solución de Problemas

Si encuentras algún error, verifica:

1. Que Docker Desktop esté en ejecución
2. Que los puertos 4444 y 7900 estén disponibles
3. Que todas las dependencias estén instaladas correctamente

## Comandos Útiles

- **Iniciar solo Selenium Grid**:
```bash
docker-compose up -d
```

- **Detener Selenium Grid**:
```bash
docker-compose down
```

- **Ver logs de los contenedores**:
```bash
docker-compose logs -f
```

## Tecnologías Utilizadas

- Node.js
- Selenium WebDriver
- Docker
- Selenium Grid
- Mocha (Framework de pruebas)
- Chai (Librería de aserciones)