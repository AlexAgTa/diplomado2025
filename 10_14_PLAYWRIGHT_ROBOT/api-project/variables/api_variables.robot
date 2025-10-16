*** Variables ***
# URLs Base
${BASE_URL}                  https://jsonplaceholder.typicode.com
${TIMEOUT}                   10

# Endpoints de la API
${POSTS_ENDPOINT}            /posts
${USERS_ENDPOINT}            /users
${COMMENTS_ENDPOINT}         /comments
${ALBUMS_ENDPOINT}           /albums
${PHOTOS_ENDPOINT}           /photos
${TODOS_ENDPOINT}            /todos

# IDs de prueba
${VALID_POST_ID}             1
${VALID_USER_ID}             1
${INVALID_POST_ID}           99999
${NON_EXISTENT_ID}           999999

# Datos de prueba para POST
&{VALID_POST_DATA}           title=Test Post Title    body=Test Post Body    userId=1
&{VALID_USER_DATA}           name=John Doe    username=johndoe    email=john@example.com
&{UPDATE_POST_DATA}          title=Updated Title    body=Updated Body    userId=1

# Headers comunes
&{JSON_HEADERS}              Content-Type=application/json    Accept=application/json

# Mensajes de error esperados
${NOT_FOUND_MESSAGE}         {}
${EMPTY_RESPONSE}            []

# Tiempos de respuesta
${MAX_RESPONSE_TIME}         50000