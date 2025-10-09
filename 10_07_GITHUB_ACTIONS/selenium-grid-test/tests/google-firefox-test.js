const { expect } = require('chai');
const { WebDriverSimpleConfig, By, until } = require('../config/webdriver-simple-config');

describe('Firefox Browser Tests @firefox', function() {
    this.timeout(40000);
    
    let driver;

    before(async function() {
        console.log('Iniciando Firefox driver...');
        driver = await WebDriverSimpleConfig.createDriver('firefox');
    });

    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('debería realizar una búsqueda en Wikipedia', async function() {
        // Navegar a Wikipedia
        await driver.get('https://www.wikipedia.org');
        
        // Esperar a que cargue la página
        await driver.wait(until.titleContains('Wikipedia'), 10000);
        
        // Buscar "Node.js"
        const searchInput = await driver.wait(
            until.elementLocated(By.id('searchInput')),
            10000
        );
        
        await searchInput.clear();
        await searchInput.sendKeys('Node.js');
        
        const searchButton = await driver.findElement(By.css('.pure-button'));
        await searchButton.click();

        // Esperar y verificar resultados
        await driver.wait(until.elementLocated(By.id('firstHeading')), 15000);
        
        const pageTitle = await driver.findElement(By.id('firstHeading'));
        const titleText = await pageTitle.getText();
        
        expect(titleText).to.equal('Node.js');
        console.log('Búsqueda en Wikipedia completada:', titleText);
    });

    it('debería verificar la URL de Wikipedia', async function() {
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('wikipedia.org');
        console.log('URL actual:', currentUrl);
    });
});