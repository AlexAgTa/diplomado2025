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

});