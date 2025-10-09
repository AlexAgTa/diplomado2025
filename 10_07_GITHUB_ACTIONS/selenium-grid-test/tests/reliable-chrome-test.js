const { expect } = require('chai');
const { WebDriverSimpleConfig, By, until } = require('../config/webdriver-simple-config');

describe('Chrome Tests - Sitios Confiables @chrome', function() {
    this.timeout(40000);
    
    let driver;

    before(async function() {
        console.log('Iniciando Chrome driver para pruebas confiables...');
        driver = await WebDriverSimpleConfig.createDriver('chrome');
    });

    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('debería realizar login exitoso en Sauce Demo', async function() {
        await driver.get('https://www.saucedemo.com/');
        
        // Llenar formulario de login
        const usernameInput = await driver.wait(
            until.elementLocated(By.id('user-name')),
            10000
        );
        
        const passwordInput = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.id('login-button'));
        
        await usernameInput.sendKeys('standard_user');
        await passwordInput.sendKeys('secret_sauce');
        await loginButton.click();
        
        // Verificar login exitoso
        await driver.wait(until.urlContains('inventory'), 10000);
        
        const productsTitle = await driver.wait(
            until.elementLocated(By.css('.title')),
            10000
        );
        
        const titleText = await productsTitle.getText();
        expect(titleText).to.equal('Products');
        
        // Verificar que hay productos listados
        const inventoryItems = await driver.findElements(By.css('.inventory_item'));
        expect(inventoryItems.length).to.be.greaterThan(0);
        
        console.log('✅ Login exitoso en Sauce Demo con Chrome');
    });

    it('debería agregar productos al carrito', async function() {
        await driver.get('https://www.saucedemo.com/inventory.html');
        
        // Agregar primer producto al carrito
        const addToCartButtons = await driver.wait(
            until.elementsLocated(By.css('.btn_inventory')),
            10000
        );
        
        await addToCartButtons[0].click();
        
        // Verificar que el botón cambió (puede ser "Remove" o "REMOVE")
        const updatedButton = await driver.findElement(By.css('.btn_inventory'));
        const buttonText = await updatedButton.getText();
        
        // Aceptar diferentes versiones del texto
        expect(buttonText.toLowerCase()).to.include('remove');
        
        // Verificar que el carrito muestra 1 item
        const cartBadge = await driver.findElement(By.css('.shopping_cart_badge'));
        const badgeText = await cartBadge.getText();
        expect(badgeText).to.equal('1');
        
        console.log('✅ Producto agregado al carrito exitosamente. Texto del botón:', buttonText);
    });

    it('debería completar el proceso de checkout', async function() {
        await driver.get('https://www.saucedemo.com/inventory.html');
        
        // Agregar producto al carrito
        const addToCartButton = await driver.wait(
            until.elementLocated(By.css('.btn_inventory')),
            10000
        );
        await addToCartButton.click();
        
        // Ir al carrito
        const cartIcon = await driver.findElement(By.css('.shopping_cart_link'));
        await cartIcon.click();
        
        // Verificar que estamos en la página del carrito
        await driver.wait(until.urlContains('cart'), 5000);
        
        const cartTitle = await driver.findElement(By.css('.title'));
        const cartTitleText = await cartTitle.getText();
        expect(cartTitleText).to.equal('Your Cart');
        
        // Hacer checkout
        const checkoutButton = await driver.findElement(By.id('checkout'));
        await checkoutButton.click();
        
        // Llenar información de envío
        await driver.wait(until.urlContains('checkout-step-one'), 5000);
        
        const firstNameInput = await driver.wait(
            until.elementLocated(By.id('first-name')),
            5000
        );
        const lastNameInput = await driver.findElement(By.id('last-name'));
        const postalCodeInput = await driver.findElement(By.id('postal-code'));
        const continueButton = await driver.findElement(By.id('continue'));
        
        await firstNameInput.sendKeys('Juan');
        await lastNameInput.sendKeys('Pérez');
        await postalCodeInput.sendKeys('12345');
        await continueButton.click();
        
        // Finalizar compra
        await driver.wait(until.urlContains('checkout-step-two'), 5000);
        
        const finishButton = await driver.findElement(By.id('finish'));
        await finishButton.click();
        
        // Verificar compra completada
        await driver.wait(until.urlContains('checkout-complete'), 5000);
        
        const completeMessage = await driver.wait(
            until.elementLocated(By.css('.complete-header')),
            5000
        );
        
        const messageText = await completeMessage.getText();
        expect(messageText).to.include('Thank you for your order!');
        
        console.log('✅ Proceso de checkout completado exitosamente');
    });

    it('debería interactuar con elementos dinámicos en The Internet', async function() {
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        
        // Agregar elementos dinámicamente
        const addButton = await driver.wait(
            until.elementLocated(By.css('button[onclick="addElement()"]')),
            10000
        );
        
        // Agregar 3 elementos
        for (let i = 0; i < 3; i++) {
            await addButton.click();
            await driver.sleep(300);
        }
        
        // Verificar que se crearon los elementos
        const deleteButtons = await driver.findElements(By.css('.added-manually'));
        expect(deleteButtons.length).to.equal(3);
        
        // Eliminar un elemento
        if (deleteButtons.length > 0) {
            await deleteButtons[0].click();
            
            // Verificar que quedan 2 elementos
            const remainingButtons = await driver.findElements(By.css('.added-manually'));
            expect(remainingButtons.length).to.equal(2);
        }
        
        console.log('✅ Elementos dinámicos manipulados exitosamente');
    });
});