# Documentación de Casos de Prueba - API JSONPlaceholder

## Descripción General

Este proyecto utiliza Robot Framework para realizar pruebas automatizadas de la API JSONPlaceholder, una API REST falsa para pruebas y prototipado.
https://jsonplaceholder.typicode.com

---

## Instalar dependencias de Python:

```python
  pip install robotframework
  pip install robotframework-requests
  pip install robotframework-jsonlibrary
  pip install robotframework-tidy
```

## TC01 - Get All Posts Success

### Endpoint Probado
- **Método:** GET
- **URL:** `/posts`
- **Descripción:** Obtiene todos los posts disponibles

### Parámetros de Entrada
Ninguno

### Valores de Salida Esperados
- **Status Code:** 200
- **Content-Type:** application/json
- **Estructura:** Array de objetos post
- **Tiempo de respuesta:** < 5000ms

### Pruebas Realizadas
- Realizar petición GET a `/posts`
- Validar estructura del array de posts
- Verificar tiempo de respuesta
- Validar headers de respuesta

### Keywords Utilizadas
- Get All Posts
- Validate Posts Array Structure
- Validate Response Time

---

## TC02 - Get Specific Post By Id

### Endpoint Probado
- **Método:** GET
- **URL:** `/posts/{id}`
- **Descripción:** Obtiene un post específico por ID

### Parámetros de Entrada
- **post_id:** 1 (VALID_POST_ID)

### Valores de Salida Esperados
- **Status Code:** 200
- **Estructura:** Objeto post con campos: userId, id, title, body
- **Datos específicos:** id = 1, title no vacío, body no vacío

### Pruebas Realizadas
- Realizar petición GET a `/posts/1`
- Validar estructura del objeto post
- Verificar que el ID coincida
- Validar que title y body no estén vacíos

### Keywords Utilizadas
- Get Post By Id
- Validate Post Structure
- Get Response Json

---

## TC03 - Create New Post Success

### Endpoint Probado
- **Método:** POST
- **URL:** `/posts`
- **Descripción:** Crea un nuevo post

### Parámetros de Entrada
**Body:**
```json
{
  "title": "Test Post Title",
  "body": "Test Post Body",
  "userId": 1
}
```
**Headers:** Content-Type: application/json

### Valores de Salida Esperados
- **Status Code:** 201
- **Estructura:** Objeto post creado con id generado
- **Datos:** title, body y userId deben coincidir con los enviados

### Pruebas Realizadas
- Realizar petición POST a `/posts` con datos válidos
- Validar código de respuesta 201
- Verificar que se retorne un id
- Validar que los datos enviados coincidan con la respuesta

### Keywords Utilizadas
- Create New Post
- Validate Response Contains Key
- Get Response Json

---

## TC04 - Update Existing Post

### Endpoint Probado
- **Método:** PUT
- **URL:** `/posts/{id}`
- **Descripción:** Actualiza un post existente

### Parámetros de Entrada
- **post_id:** 1

**Body:**
```json
{
  "title": "Updated Title",
  "body": "Updated Body",
  "userId": 1
}
```
**Headers:** Content-Type: application/json

### Valores de Salida Esperados
- **Status Code:** 200
- **Datos actualizados:** title = "Updated Title", body = "Updated Body"
- **ID:** Debe mantenerse igual (1)

### Pruebas Realizadas
- Realizar petición PUT a `/posts/1` con datos de actualización
- Validar código de respuesta 200
- Verificar que los datos se hayan actualizado correctamente
- Confirmar que el ID no cambió

### Keywords Utilizadas
- Update Post
- Get Response Json

---

## TC05 - Delete Post

### Endpoint Probado
- **Método:** DELETE
- **URL:** `/posts/{id}`
- **Descripción:** Elimina un post

### Parámetros de Entrada
- **post_id:** 1

### Valores de Salida Esperados
- **Status Code:** 200
- **Respuesta:** Operación exitosa

### Pruebas Realizadas
- Realizar petición DELETE a `/posts/1`
- Validar código de respuesta 200
- Confirmar que la operación se completó

### Keywords Utilizadas
- Delete Post
- Validate Response Status

---

## TC06 - Forced Failure Case

### Propósito
**Demostración:** Caso de prueba que falla intencionalmente para mostrar el manejo de errores

### Endpoint Probado
- **Método:** GET
- **URL:** `/posts/1`

### Parámetros de Entrada
- **post_id:** 1

### Validación Intencionalmente Incorrecta
- **Esperado:** userId = 999
- **Real:** userId = 1
- **Resultado:** Falla controlada con mensaje descriptivo

### Pruebas Realizadas
- Obtener post existente (ID: 1)
- Forzar validación incorrecta de userId
- Documentar el fallo intencional

---

## TC07 - Get Non Existent Post

### Endpoint Probado
- **Método:** GET
- **URL:** `/posts/999999`
- **Descripción:** Intenta obtener un post que no existe

### Parámetros de Entrada
- **post_id:** 999999 (NON_EXISTENT_ID)

### Valores de Salida Esperados
- **Status Code:** 404
- **Body:** {}
- **Comportamiento:** Manejo elegante del error

### Pruebas Realizadas
- Realizar petición GET a post inexistente
- Manejar el error 404 esperado
- Validar respuesta de error
- Verificar mensaje de respuesta

### Keywords Utilizadas
- Get Post By Id With Expected Error
- Validate Error Response

---

## TC08 - Get Post Comments

### Endpoint Probado
- **Método:** GET
- **URL:** `/posts/{id}/comments`
- **Descripción:** Obtiene comentarios de un post específico

### Parámetros de Entrada
- **post_id:** 1

### Valores de Salida Esperados
- **Status Code:** 200
- **Estructura:** Array de comentarios
- **Contenido:** Array no vacío
- **Tiempo de respuesta:** < 5000ms

### Pruebas Realizadas
- Realizar petición GET a `/posts/1/comments`
- Validar código de respuesta 200
- Verificar tiempo de respuesta
- Confirmar que se retornan comentarios
- Validar que el array no esté vacío

### Keywords Utilizadas
- GET On Session
- Validate Response Status
- Validate Response Time
- Get Response Json

---

## Variables de Configuración Principales

### URLs y Endpoints
```robot
${BASE_URL} = "https://jsonplaceholder.typicode.com"
${POSTS_ENDPOINT} = "/posts"
```

### IDs de Prueba
```robot
${VALID_POST_ID} = 1
${NON_EXISTENT_ID} = 999999
```

### Datos de Prueba
```robot
&{VALID_POST_DATA} = title=Test Post Title, body=Test Post Body, userId=1
&{UPDATE_POST_DATA} = title=Updated Title, body=Updated Body, userId=1
```

### Configuración de Tiempos
```robot
${MAX_RESPONSE_TIME} = 5000  # 5 segundos
```

---

## Estructura de Respuesta Esperada

### Objeto Post
```json
{
  "userId": 1,
  "id": 1,
  "title": "string",
  "body": "string"
}
```

### Array de Posts
```json
[
  {post_object},
  {post_object},
  ...
]
```

---

Este documento proporciona una referencia completa para entender y ejecutar las pruebas automatizadas del proyecto API Testing con Robot Framework.