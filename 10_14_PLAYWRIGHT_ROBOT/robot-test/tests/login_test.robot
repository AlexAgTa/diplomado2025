*** Settings ***
Documentation    Suite de pruebas para el login de SauceDemo
Resource        ../resources/common.robot
Test Setup      Abrir Navegador
Test Teardown   Cerrar Navegador

*** Test Cases ***
Login Exitoso Con Credenciales Validas
    [Documentation]    Verifica que el login funcione con credenciales válidas
    ...                Este es un caso de prueba positivo
    
    # Paso 1: Realizar login exitoso
    Login Exitoso
    
    # Paso 2: Verificar que se redirige a la página de productos
    Location Should Be    ${INVENTORY_URL}
    
    # Paso 3: Verificar que se muestran los productos
    Page Should Contain    Products
    Page Should Contain Element    css=.inventory_item
    
    # Paso 4: Verificar que el carrito está visible
    Page Should Contain Element    css=.shopping_cart_link

Login Fallido Con Credenciales Invalidas
    [Documentation]    Verifica que el login falle con credenciales inválidas
    ...                Este es un caso de prueba negativo
    
    # Paso 1: Intentar login con credenciales inválidas
    Login Fallido
    
    # Paso 2: Verificar que se muestra mensaje de error
    Page Should Contain Element    ${ERROR_MESSAGE}
    
    # Paso 3: Verificar el texto del mensaje de error
    Element Should Contain    ${ERROR_MESSAGE}    Epic sadface: Username and password do not match
    
    # Paso 4: Verificar que sigue en la página de login
    Location Should Be    ${BASE_URL}

Login Con Usuario Bloqueado
    [Documentation]    Verifica que no se puede login con usuario bloqueado
    
    # Paso 1: Intentar login con usuario bloqueado
    Login Exitoso    locked_out_user    secret_sauce
    
    # Paso 2: Verificar mensaje de error específico
    Element Should Contain    ${ERROR_MESSAGE}    Epic sadface: Sorry, this user has been locked out.

# CASO DE PRUEBA QUE FORZADAMENTE FALLARÁ
Login Forzado a Fallar
    [Documentation]    Este caso está diseñado para fallar intencionalmente
    ...                para demostrar el manejo de pruebas fallidas
    
    # Paso 1: Login exitoso (esto funciona)
    Login Exitoso
    
    # Paso 2: Verificación que debería pasar
    Page Should Contain    Products
    
    # Paso 3: VERIFICACIÓN FORZADA A FALLAR
    # Estamos verificando un texto que NO existe en la página
    Page Should Contain    Este Texto No Existe En La Página
    
    # Paso 4: Esta verificación nunca se ejecutará porque la anterior falló
    Page Should Contain Element    css=.shopping_cart_link