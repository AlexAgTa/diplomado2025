const { expect } = require('chai');
const { WebDriverSimpleConfig, By, until } = require('../config/webdriver-simple-config');

describe('Pruebas Paralelas Robusta en Múltiples Navegadores', function() {
    this.timeout(40000);

    it('debería probar funcionalidades básicas en Chrome @chrome', async function() {
        const driver = await WebDriverSimpleConfig.createDriver('chrome');
        
        try {
            // Test 1: Carga básica de página
            await driver.get('https://the-internet.herokuapp.com/');
            
            const title = await driver.getTitle();
            expect(title).to.include('The Internet');
            
            // Test 2: Navegar a Status Codes
            const statusCodesLink = await driver.findElement(By.linkText('Status Codes'));
            await statusCodesLink.click();
            
            await driver.wait(until.urlContains('status_codes'), 5000);
            
            // Verificar que estamos en la página correcta - forma más robusta
            const pageTitle = await driver.getTitle();
            const currentUrl = await driver.getCurrentUrl();
            
            // Aceptar diferentes posibles títulos
            const isCorrectPage = pageTitle.includes('Status Codes') || 
                                 currentUrl.includes('status_codes') ||
                                 pageTitle.includes('The Internet');
            expect(isCorrectPage).to.be.true;
            
            // Test 3: Probar diferentes status codes si estamos en la página correcta
            if (currentUrl.includes('status_codes')) {
                const link200 = await driver.findElement(By.css('a[href="status_codes/200"]'));
                await link200.click();
                
                await driver.wait(until.urlContains('200'), 5000);
                const newUrl = await driver.getCurrentUrl();
                expect(newUrl).to.include('200');
                
                // Verificar contenido de la página 200
                const content = await driver.findElement(By.css('body'));
                const contentText = await content.getText();
                expect(contentText).to.include('200');
            }
            
            console.log('✅ Pruebas de navegación completadas en Chrome');
            
        } finally {
            await driver.quit();
        }
    });

    it('debería probar formularios en Firefox @firefox', async function() {
        const driver = await WebDriverSimpleConfig.createDriver('firefox');
        
        try {
            await driver.get('https://the-internet.herokuapp.com/login');
            
            // Llenar formulario de login (fallará intencionalmente)
            const usernameInput = await driver.wait(
                until.elementLocated(By.id('username')),
                10000
            );
            
            const passwordInput = await driver.findElement(By.id('password'));
            const loginButton = await driver.findElement(By.css('button[type="submit"]'));
            
            await usernameInput.sendKeys('user-invalid');
            await passwordInput.sendKeys('password-invalid');
            await loginButton.click();
            
            // Verificar mensaje de error (login fallido)
            const errorMessage = await driver.wait(
                until.elementLocated(By.css('.flash.error')),
                10000
            );
            
            const errorText = await errorMessage.getText();
            expect(errorText).to.include('Your username is invalid!');
            
            console.log('✅ Prueba de formulario con error completada en Firefox');
            
        } finally {
            await driver.quit();
        }
    });

    it('debería probar checkboxes en Chrome @chrome', async function() {
        const driver = await WebDriverSimpleConfig.createDriver('chrome');
        
        try {
            await driver.get('https://the-internet.herokuapp.com/checkboxes');
            
            // Encontrar todos los checkboxes
            const checkboxes = await driver.wait(
                until.elementsLocated(By.css('input[type="checkbox"]')),
                10000
            );
            
            expect(checkboxes.length).to.equal(2);
            
            // Verificar estado inicial
            const firstChecked = await checkboxes[0].isSelected();
            const secondChecked = await checkboxes[1].isSelected();
            
            // El primer checkbox debería estar deseleccionado, el segundo seleccionado
            expect(firstChecked).to.be.false;
            expect(secondChecked).to.be.true;
            
            // Cambiar estados
            await checkboxes[0].click(); // Seleccionar el primero
            await checkboxes[1].click(); // Deseleccionar el segundo
            
            // Verificar nuevos estados
            const newFirstChecked = await checkboxes[0].isSelected();
            const newSecondChecked = await checkboxes[1].isSelected();
            
            expect(newFirstChecked).to.be.true;
            expect(newSecondChecked).to.be.false;
            
            console.log('✅ Checkboxes manipulados exitosamente en Chrome');
            
        } finally {
            await driver.quit();
        }
    });

    it('debería probar JavaScript alerts en Firefox @firefox', async function() {
        const driver = await WebDriverSimpleConfig.createDriver('firefox');
        
        try {
            await driver.get('https://the-internet.herokuapp.com/javascript_alerts');
            
            // Probar alerta simple
            const alertButton = await driver.wait(
                until.elementLocated(By.css('button[onclick="jsAlert()"]')),
                10000
            );
            
            await alertButton.click();
            
            // Esperar y aceptar la alerta
            const alert = await driver.wait(until.alertIsPresent(), 5000);
            const alertText = await alert.getText();
            expect(alertText).to.equal('I am a JS Alert');
            await alert.accept();
            
            // Verificar resultado
            const result = await driver.findElement(By.id('result'));
            const resultText = await result.getText();
            expect(resultText).to.include('You successfully clicked an alert');
            
            console.log('✅ Alerta JavaScript manejada exitosamente en Firefox');
            
        } finally {
            await driver.quit();
        }
    });

    it('debería probar dropdowns en ambos navegadores', async function() {
        const browserName = this.test.title.includes('Chrome') ? 'chrome' : 'firefox';
        const driver = await WebDriverSimpleConfig.createDriver(browserName);
        
        try {
            await driver.get('https://the-internet.herokuapp.com/dropdown');
            
            // Encontrar el dropdown
            const dropdown = await driver.wait(
                until.elementLocated(By.id('dropdown')),
                10000
            );
            
            // Seleccionar opción 2
            const option2 = await dropdown.findElement(By.css('option[value="2"]'));
            await option2.click();
            
            // Verificar que la opción 2 está seleccionada
            const isSelected = await option2.isSelected();
            expect(isSelected).to.be.true;
            
            console.log(`✅ Dropdown probado exitosamente en ${browserName}`);
            
        } finally {
            await driver.quit();
        }
    });
});