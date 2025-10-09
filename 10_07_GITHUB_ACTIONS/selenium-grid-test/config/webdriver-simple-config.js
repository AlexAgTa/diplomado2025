const { Builder, By, until } = require('selenium-webdriver');

class WebDriverSimpleConfig {
    static getChromeOptions() {
        const { Options } = require('selenium-webdriver/chrome');
        let options = new Options();
        
        // Solo argumentos esenciales
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=1920,1080');
        // options.addArguments('--headless');
        
        return options;
    }

    static getFirefoxOptions() {
        const { Options } = require('selenium-webdriver/firefox');
        let options = new Options();
        
        // options.addArguments('--headless');
        options.setPreference('dom.webnotifications.enabled', false);
        
        return options;
    }

    static async createDriver(browserName = 'chrome') {
        const gridUrl = 'http://localhost:4444/wd/hub';
        let driver;

        try {
            switch (browserName.toLowerCase()) {
                case 'chrome':
                    driver = await new Builder()
                        .forBrowser('chrome')
                        .setChromeOptions(this.getChromeOptions())
                        .usingServer(gridUrl)
                        .build();
                    break;
                
                case 'firefox':
                    driver = await new Builder()
                        .forBrowser('firefox')
                        .setFirefoxOptions(this.getFirefoxOptions())
                        .usingServer(gridUrl)
                        .build();
                    break;
                
                default:
                    throw new Error(`Browser ${browserName} not supported`);
            }

            await driver.manage().window().maximize();
            await driver.manage().setTimeouts({ 
                implicit: 15000, 
                pageLoad: 30000
            });

            return driver;
        } catch (error) {
            console.error(`Error creating ${browserName} driver:`, error.message);
            throw error;
        }
    }
}

module.exports = { WebDriverSimpleConfig, By, until };