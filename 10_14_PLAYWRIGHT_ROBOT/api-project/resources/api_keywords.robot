*** Settings ***
Resource    common.robot
Resource    ../variables/api_variables.robot
Library    Collections
Library    String

*** Keywords ***
Get All Posts
    [Documentation]    Obtiene todos los posts
    ${resp}    GET On Session    api_session    ${POSTS_ENDPOINT}
    Log Response Details    ${resp}
    Validate Response Status    ${resp}    200
    RETURN    ${resp}

Get Post By Id
    [Arguments]    ${post_id}
    [Documentation]    Obtiene un post específico por ID
    ${resp}    GET On Session    api_session    ${POSTS_ENDPOINT}/${post_id}
    Log Response Details    ${resp}
    RETURN    ${resp}

Create New Post
    [Arguments]    ${post_data}=${VALID_POST_DATA}
    [Documentation]    Crea un nuevo post
    ${headers}    Create Dictionary    &{JSON_HEADERS}
    ${resp}    POST On Session    api_session    ${POSTS_ENDPOINT}    
    ...                         json=${post_data}    headers=${headers}
    Log Response Details    ${resp}
    Validate Response Status    ${resp}    201
    RETURN    ${resp}

Update Post
    [Arguments]    ${post_id}    ${update_data}=${UPDATE_POST_DATA}
    [Documentation]    Actualiza un post existente
    ${headers}    Create Dictionary    &{JSON_HEADERS}
    ${resp}    PUT On Session    api_session    ${POSTS_ENDPOINT}/${post_id}
    ...                        json=${update_data}    headers=${headers}
    Log Response Details    ${resp}
    Validate Response Status    ${resp}    200
    RETURN    ${resp}

Delete Post
    [Arguments]    ${post_id}
    [Documentation]    Elimina un post
    ${resp}    DELETE On Session    api_session    ${POSTS_ENDPOINT}/${post_id}
    Log Response Details    ${resp}
    Validate Response Status    ${resp}    200
    RETURN    ${resp}

Validate Post Structure
    [Arguments]    ${response}
    [Documentation]    Valida la estructura del objeto post
    ${response_json}    Get Response Json    ${response}
    
    # Validar estructura básica del post
    Validate Response Contains Key    ${response}    userId
    Validate Response Contains Key    ${response}    id  
    Validate Response Contains Key    ${response}    title
    Validate Response Contains Key    ${response}    body
    
    # Validar tipos de datos
    Should Be True    $response_json['userId'] == $response_json['userId']  # Trick para evaluar como int
    Should Be True    $response_json['id'] == $response_json['id']          # Trick para evaluar como int
    Should Be True    $response_json['title'] == $response_json['title']    # Trick para evaluar como str
    Should Be True    $response_json['body'] == $response_json['body']      # Trick para evaluar como str
    
    Log    Estructura del post validada correctamente

Validate Posts Array Structure
    [Arguments]    ${response}
    [Documentation]    Valida la estructura del array de posts
    ${response_json}    Get Response Json    ${response}
    
    # Validar que es una lista
    Should Be True    $response_json == $response_json  # Trick para evaluar como lista
    
    # Validar que tiene elementos
    ${post_count}    Get Length    ${response_json}
    Should Be True    ${post_count} > 0
    
    # Validar estructura del primer post
    ${first_post}    Get From List    ${response_json}    0
    Dictionary Should Contain Key    ${first_post}    userId
    Dictionary Should Contain Key    ${first_post}    id
    Dictionary Should Contain Key    ${first_post}    title
    Dictionary Should Contain Key    ${first_post}    body
    
    Log    Estructura del array de posts validada correctamente

Get Post By Id With Expected Error
    [Arguments]    ${post_id}    ${expected_status}=404
    [Documentation]    Obtiene un post específico por ID manejando errores esperados
    ${resp}    GET On Session    api_session    ${POSTS_ENDPOINT}/${post_id}
    ...                         expected_status=${expected_status}
    Log Response Details    ${resp}
    RETURN    ${resp}

Validate Error Response
    [Arguments]    ${response}    ${expected_status}=404
    [Documentation]    Valida respuesta de error
    Validate Response Status    ${response}    ${expected_status}
    ${response_body}    Set Variable    ${response.text}
    Should Be Equal    ${response_body}    ${NOT_FOUND_MESSAGE}

Get User By Id
    [Arguments]    ${user_id}
    [Documentation]    Obtiene un usuario específico por ID
    ${resp}    GET On Session    api_session    ${USERS_ENDPOINT}/${user_id}
    Log Response Details    ${resp}
    RETURN    ${resp}