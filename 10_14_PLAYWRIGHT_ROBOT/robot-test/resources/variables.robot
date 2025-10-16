*** Variables ***
### URLs de la aplicación ###
${BASE_URL}          https://www.saucedemo.com/
${INVENTORY_URL}     https://www.saucedemo.com/inventory.html
${CART_URL}          https://www.saucedemo.com/cart.html

### Credenciales de prueba ###
${VALID_USER}        standard_user
${VALID_PASSWORD}    secret_sauce
${LOCKED_USER}       locked_out_user
${INVALID_USER}      invalid_user
${INVALID_PASSWORD}  wrong_password

### Datos para checkout ###
${FIRST_NAME}        Juan
${LAST_NAME}         Pérez
${POSTAL_CODE}       12345

### Selectores CSS y IDs ###
# Login Page Elements
${USERNAME_FIELD}    id=user-name
${PASSWORD_FIELD}    id=password
${LOGIN_BUTTON}      id=login-button
${ERROR_MESSAGE}     css=.error-message-container

# Inventory Page Elements  
${PRODUCTS_TITLE}    css=.title
${SHOPPING_CART}     css=.shopping_cart_link
${ADD_TO_CART_BTN}   css=.btn_inventory

# Checkout Elements
${CHECKOUT_BTN}      id=checkout
${FIRST_NAME_FIELD}  id=first-name
${LAST_NAME_FIELD}   id=last-name
${POSTAL_CODE_FIELD}    id=postal-code
${CONTINUE_BTN}      id=continue
${FINISH_BTN}        id=finish