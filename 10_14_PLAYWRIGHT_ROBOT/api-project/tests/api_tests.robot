*** Settings ***
Documentation    Suite de pruebas para la API JSONPlaceholder
Resource        ../resources/common.robot
Resource        ../resources/api_keywords.robot
Resource        ../variables/api_variables.robot
Library         Collections
Library         String
Suite Setup     Setup Suite
Suite Teardown  Teardown Suite

*** Test Cases ***
# CASO DE PRUEBA 1: Obtener todos los posts exitosamente
TC01 - Get All Posts Success
    [Documentation]    Verifica que se puedan obtener todos los posts correctamente
    [Tags]    GET    smoke    posts
    
    # Paso 1: Obtener todos los posts
    ${response}    Get All Posts
    
    # Paso 2: Validar estructura de la respuesta
    Validate Posts Array Structure    ${response}
    
    # Paso 3: Validar tiempo de respuesta
    Validate Response Time    ${response}
    
    # Paso 4: Validar headers de respuesta
    Dictionary Should Contain Key    ${response.headers}    Content-Type
    Should Contain    ${response.headers['Content-Type']}    application/json

# CASO DE PRUEBA 2: Obtener un post específico por ID  
TC02 - Get Specific Post By Id
    [Documentation]    Verifica que se pueda obtener un post específico por ID
    [Tags]    GET    post-by-id
    
    # Paso 1: Obtener post con ID válido
    ${response}    Get Post By Id    ${VALID_POST_ID}
    
    # Paso 2: Validar estructura del post
    Validate Post Structure    ${response}
    
    # Paso 3: Validar datos específicos
    ${response_json}    Get Response Json    ${response}
    Should Be Equal As Numbers    ${response_json['id']}    ${VALID_POST_ID}
    Should Not Be Empty    ${response_json['title']}
    Should Not Be Empty    ${response_json['body']}

# CASO DE PRUEBA 3: Crear un nuevo post exitosamente
TC03 - Create New Post Success
    [Documentation]    Verifica que se pueda crear un nuevo post
    [Tags]    POST    create
    
    # Paso 1: Crear el nuevo post con datos válidos
    ${response}    Create New Post
    
    # Paso 2: Validar respuesta
    ${response_json}    Get Response Json    ${response}
    Validate Response Contains Key    ${response}    id
    Should Be Equal As Strings    ${response_json['title']}    ${VALID_POST_DATA['title']}
    Should Be Equal As Strings    ${response_json['body']}    ${VALID_POST_DATA['body']}
    Should Be Equal As Numbers    ${response_json['userId']}    ${VALID_POST_DATA['userId']}

# CASO DE PRUEBA 4: Actualizar un post existente
TC04 - Update Existing Post
    [Documentation]    Verifica que se pueda actualizar un post existente
    [Tags]    PUT    update
    
    # Paso 1: Actualizar post con ID válido
    ${response}    Update Post    ${VALID_POST_ID}
    
    # Paso 2: Validar respuesta
    ${response_json}    Get Response Json    ${response}
    Should Be Equal As Strings    ${response_json['title']}    ${UPDATE_POST_DATA['title']}
    Should Be Equal As Strings    ${response_json['body']}    ${UPDATE_POST_DATA['body']}
    Should Be Equal As Numbers    ${response_json['id']}    ${VALID_POST_ID}

# CASO DE PRUEBA 5: Eliminar un post
TC05 - Delete Post
    [Documentation]    Verifica que se pueda eliminar un post
    [Tags]    DELETE
    
    # Paso 1: Eliminar post con ID válido
    ${response}    Delete Post    ${VALID_POST_ID}
    
    # Paso 2: Validar que la operación fue exitosa
    Validate Response Status    ${response}    200

# CASO DE PRUEBA 6: PRUEBA QUE FALLA INTENCIONALMENTE
TC06 - Forced Failure Case
    [Documentation]    Caso de prueba que falla intencionalmente para demostración
    [Tags]    failure    demo
    
    # Paso 1: Obtener un post que sabemos que existe
    ${response}    Get Post By Id    ${VALID_POST_ID}
    
    # Paso 2: FORZAR FALLO - Validar un valor incorrecto intencionalmente
    ${response_json}    Get Response Json    ${response}
    
    # Esta validación fallará porque el userId real es 1, no 999
    Should Be Equal As Numbers    ${response_json['userId']}    999
    ...    msg=ESTE ES UN FALLO INTENCIONAL: userId debería ser ${VALID_POST_DATA['userId']} pero forzamos 999

# CASO DE PRUEBA 7: Validar post inexistente
TC07 - Get Non Existent Post
    [Documentation]    Verifica el comportamiento al buscar un post que no existe
    [Tags]    not-found
    
    # Paso 1: Intentar obtener un post con ID inexistente MANEJANDO el error esperado
    ${response}    Get Post By Id With Expected Error    ${NON_EXISTENT_ID}    404
    
    # Paso 2: Validar respuesta de error 404
    Validate Error Response  ${response}    404

# CASO DE PRUEBA 8: Obtener comentarios de un post
TC08 - Get Post Comments
    [Documentation]    Verifica que se puedan obtener comentarios de un post
    [Tags]    GET    comments
    
    # Paso 1: Obtener comentarios del post 1
    ${response}    GET On Session    api_session    ${POSTS_ENDPOINT}/${VALID_POST_ID}/comments
    
    # Paso 2: Validar respuesta
    Validate Response Status    ${response}    200
    Validate Response Time    ${response}
    
    # Paso 3: Validar estructura de comentarios
    ${comments}    Get Response Json    ${response}
    Should Not Be Empty    ${comments}
    ${comment_count}    Get Length    ${comments}
    Should Be True    ${comment_count} > 0

# CASO DE PRUEBA 9: Obtener un usuario por Id
TC09 - Get Specific User By Id
    [Documentation]   Verifica que se pueda obtener un usuario específico por ID
    [Tags]    GET    user-by-id

    # Paso 1: Obtener usuario con ID válido
    ${response}    Get User By Id    ${VALID_USER_ID}

    # Paso 2: Validar estructura completa del usuario
    Validate User Structure    ${response}

    # Paso 3: Validar datos específicos
    ${response_json}    Get Response Json    ${response}
    Should Be Equal As Numbers    ${response_json['id']}    ${VALID_USER_ID}
    Should Not Be Empty    ${response_json['name']}
    Should Not Be Empty    ${response_json['email']}
    Should Contain    ${response_json['email']}    @    # Validar formato de email

    # Paso 4: Validar estructura anidada
    Dictionary Should Contain Key    ${response_json['address']}    street
    Should Not Be Empty    ${response_json['address']['street']}
    Should Not Be Empty    ${response_json['company']['name']}

*** Keywords ***
Custom Validation
    [Arguments]    ${expected_value}    ${actual_value}
    [Documentation]    Keyword personalizado para validaciones específicas
    Should Be Equal    ${actual_value}    ${expected_value}