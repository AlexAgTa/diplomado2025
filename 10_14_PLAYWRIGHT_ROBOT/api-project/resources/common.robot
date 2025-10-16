*** Settings ***
Resource    ../variables/api_variables.robot
Library    Collections
Library    RequestsLibrary
Library    String
Library    OperatingSystem

*** Variables ***
${GLOBAL_TIMEOUT}    10 seconds

*** Keywords ***
Setup Suite
    [Documentation]    Configuración inicial para el suite de pruebas
    Log    Iniciando suite de pruebas API
    Create Session    api_session    ${BASE_URL}    timeout=${TIMEOUT}    verify=true

Teardown Suite  
    [Documentation]    Limpieza después del suite de pruebas
    Delete All Sessions
    Log    Suite de pruebas API finalizada

Validate Response Status
    [Arguments]    ${response}    ${expected_status}
    [Documentation]    Valida que el status code sea el esperado
    Should Be Equal As Strings    ${response.status_code}    ${expected_status}
    Log    Status code validado: ${expected_status}

Validate Response Contains Key
    [Arguments]    ${response}    ${key}
    [Documentation]    Valida que la respuesta contenga una clave específica
    ${response_json}    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    ${key}
    Log    Key validada: ${key}

Validate Response Time
    [Arguments]    ${response}    ${max_time}=${MAX_RESPONSE_TIME}
    [Documentation]    Valida que el tiempo de respuesta sea aceptable
    ${response_time}    Evaluate    ${response.elapsed.total_seconds()} * 1000
    Should Be True    ${response_time} < ${max_time}
    Log    Tiempo de respuesta: ${response_time}ms

Log Response Details
    [Arguments]    ${response}
    [Documentation]    Log de detalles de la respuesta para debugging
    Log    Status Code: ${response.status_code}
    Log    Response Headers: ${response.headers}
    Log    Response Body: ${response.text}
    ${response_time}    Evaluate    ${response.elapsed.total_seconds()} * 1000
    Log    Response Time: ${response_time}ms

Get Response Json
    [Arguments]    ${response}
    [Documentation]    Retorna el JSON de la respuesta
    ${json_data}    Set Variable    ${response.json()}
    RETURN    ${json_data}