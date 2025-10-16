# Configuración base para las pruebas de API
BASE_URL = "https://jsonplaceholder.typicode.com"
TIMEOUT = 10

# Endpoints
POSTS_ENDPOINT = "/posts"
USERS_ENDPOINT = "/users"

# Datos de prueba
TEST_POST = {
    "title": "Test Post Title",
    "body": "Test Post Body", 
    "userId": 1
}

TEST_USER = {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
}