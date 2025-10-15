const { expect } = require('chai');
const { WebDriverSimpleConfig, By, until } = require('../config/webdriver-simple-config');
const allure = require('allure-mocha/runtime');

describe('Prueba Final de Integración - Ambos Navegadores', function() {
    this.timeout(60000);

    it('debería ejecutar un flujo completo en Chrome @chrome', async function() {
        allure.epic('Pruebas Cross-Browser');
        allure.feature('Flujo Completo');
        allure.story('Flujo Chrome Completo');
        allure.severity('critical');
        allure.label('browser', 'chrome');
        
        const driver = await WebDriverSimpleConfig.createDriver('chrome');
        
        try {
            console.log('🚀 Iniciando flujo completo en Chrome...');
            
            // Paso 1: The Internet - Home
            await driver.get('https://the-internet.herokuapp.com/');
            await driver.wait(until.titleContains('The Internet'), 5000);
            
            // Paso 2: Navegar a Checkboxes
            const checkboxesLink = await driver.findElement(By.linkText('Checkboxes'));
            await checkboxesLink.click();
            await driver.wait(until.urlContains('checkboxes'), 5000);
            
            // Paso 3: Interactuar con checkboxes
            const checkboxes = await driver.findElements(By.css('input[type="checkbox"]'));
            await checkboxes[0].click();
            expect(await checkboxes[0].isSelected()).to.be.true;
            
            // Paso 4: Navegar a Dropdown
            await driver.get('https://the-internet.herokuapp.com/dropdown');
            const dropdown = await driver.findElement(By.id('dropdown'));
            const option2 = await dropdown.findElement(By.css('option[value="2"]'));
            await option2.click();
            expect(await option2.isSelected()).to.be.true;
            
            // Paso 5: Navegar a Dynamic Controls
            await driver.get('https://the-internet.herokuapp.com/dynamic_controls');
            const removeButton = await driver.findElement(By.css('#checkbox-example button'));
            await removeButton.click();
            
            // Esperar a que desaparezca el checkbox
            await driver.wait(until.elementLocated(By.css('#message')), 10000);
            const message = await driver.findElement(By.css('#message'));
            const messageText = await message.getText();
            expect(messageText.toLowerCase()).to.include('gone');
            
            // Screenshot final del flujo
            const screenshot = await driver.takeScreenshot();
            allure.attachment('screenshot-flujo-completo-chrome', Buffer.from(screenshot, 'base64'), 'image/png');
            
            console.log('✅ Flujo completo completado exitosamente en Chrome');
            
        } finally {
            await driver.quit();
        }
    });

    it('debería ejecutar un flujo completo en Firefox @firefox', async function() {
        allure.epic('Pruebas Cross-Browser');
        allure.feature('Flujo Completo');
        allure.story('Flujo Firefox Completo');
        allure.severity('critical');
        allure.label('browser', 'firefox');
        
        const driver = await WebDriverSimpleConfig.createDriver('firefox');
        
        try {
            console.log('🚀 Iniciando flujo completo en Firefox...');
            
            // Paso 1: Sauce Demo - Login
            await driver.get('https://www.saucedemo.com/');
            
            // Screenshot antes del login
            const screenshotBefore = await driver.takeScreenshot();
            allure.attachment('screenshot-before-login-firefox', Buffer.from(screenshotBefore, 'base64'), 'image/png');
            
            await driver.findElement(By.id('user-name')).sendKeys('standard_user');
            await driver.findElement(By.id('password')).sendKeys('secret_sauce');
            await driver.findElement(By.id('login-button')).click();
            
            await driver.wait(until.urlContains('inventory'), 5000);
            expect(await driver.getTitle()).to.include('Swag Labs');
            
            // Paso 2: Agregar producto al carrito
            const addToCartButton = await driver.findElement(By.css('.btn_inventory'));
            await addToCartButton.click();
            
            // Paso 3: Ir al carrito
            const cartIcon = await driver.findElement(By.css('.shopping_cart_link'));
            await cartIcon.click();
            await driver.wait(until.urlContains('cart'), 5000);
            
            // Paso 4: Verificar producto en carrito
            const cartItems = await driver.findElements(By.css('.cart_item'));
            expect(cartItems.length).to.equal(1);
            
            // Paso 5: Continuar shopping
            const continueShopping = await driver.findElement(By.id('continue-shopping'));
            await continueShopping.click();
            await driver.wait(until.urlContains('inventory'), 5000);
            
            // Screenshot final del flujo
            const screenshotAfter = await driver.takeScreenshot();
            allure.attachment('screenshot-flujo-completo-firefox', Buffer.from(screenshotAfter, 'base64'), 'image/png');
            
            console.log('✅ Flujo completo completado exitosamente en Firefox');
            
        } finally {
            await driver.quit();
        }
    });
});