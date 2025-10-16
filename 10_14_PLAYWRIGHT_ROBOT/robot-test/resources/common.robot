*** Settings ***
Library    SeleniumLibrary
Resource    variables.robot

*** Keywords ***
Abrir Navegador
    [Documentation]    Abre el navegador y maximiza la ventana
    Open Browser    ${BASE_URL}    chrome
    Maximize Browser Window
    Set Selenium Implicit Wait    10

Cerrar Navegador
    [Documentation]    Cierra el navegador
    Close Browser

Login Exitoso
    [Documentation]    Realiza login con credenciales válidas
    [Arguments]    ${username}=${VALID_USER}    ${password}=${VALID_PASSWORD}
    Input Text    ${USERNAME_FIELD}    ${username}
    Input Password    ${PASSWORD_FIELD}    ${password}
    Click Button    ${LOGIN_BUTTON}
    Wait Until Page Contains    Products

Login Fallido
    [Documentation]    Realiza login con credenciales inválidas
    [Arguments]    ${username}=${INVALID_USER}    ${password}=${INVALID_PASSWORD}
    Input Text    ${USERNAME_FIELD}    ${username}
    Input Password    ${PASSWORD_FIELD}    ${password}
    Click Button    ${LOGIN_BUTTON}

Agregar Primer Producto al Carrito
    [Documentation]    Agrega el primer producto de la lista al carrito
    Click Button    css=.inventory_item:first-child .btn_inventory
    Page Should Contain Element    css=.shopping_cart_badge

Ir al Carrito
    [Documentation]    Navega a la página del carrito
    Click Element    css=.shopping_cart_link
    Wait Until Page Contains    Your Cart