*** Settings ***
Documentation    Suite de pruebas para el proceso de checkout
Resource        ../resources/common.robot
Test Setup      Abrir Navegador
Test Teardown   Cerrar Navegador

*** Test Cases ***
Flujo Completo de Compra Exitoso
    [Documentation]    Prueba el flujo completo de compra desde login hasta checkout
    
    # Paso 1: Login
    Login Exitoso
    
    # Paso 2: Agregar producto al carrito
    Agregar Primer Producto al Carrito
    
    # Paso 3: Ir al carrito
    Ir al Carrito
    
    # Paso 4: Verificar producto en carrito
    Page Should Contain Element    css=.cart_item
    
    # Paso 5: Proceder a checkout
    Click Button    id=checkout
    Wait Until Page Contains    Checkout: Your Information
    
    # Paso 6: Llenar información de envío
    Input Text      id=first-name    ${FIRST_NAME}
    Input Text      id=last-name     ${LAST_NAME}
    Input Text      id=postal-code   ${POSTAL_CODE}
    
    # Paso 7: Continuar
    Click Button    id=continue
    Wait Until Page Contains    Checkout: Overview
    
    # Paso 8: Finalizar compra
    Click Button    id=finish
    Wait Until Page Contains    Thank you for your order!
    
    # Paso 9: Verificar mensaje de éxito
    Page Should Contain    Your order has been dispatched

Flujo de Compra Sin Información de Envío
    [Documentation]    Prueba el error cuando no se completa la información de envío
    
    # Paso 1: Login y agregar producto
    Login Exitoso
    Agregar Primer Producto al Carrito
    Ir al Carrito
    
    # Paso 2: Ir a checkout
    Click Button    id=checkout
    
    # Paso 3: Intentar continuar sin llenar información
    Click Button    id=continue
    
    # Paso 4: Verificar error
    Page Should Contain Element    css=.error-message-container
    Element Should Contain    css=.error-message-container    Error: First Name is required