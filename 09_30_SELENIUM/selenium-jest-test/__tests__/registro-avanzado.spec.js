
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

let driver;

// Hook para inicializar el navegador antes de todas las pruebas (usando path explícito)
beforeAll(async () => {
  const service = new chrome.ServiceBuilder('C:/WebDriver/bin/chromedriver.exe');
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .build();
  console.log("Iniciando pruebas con Jest...");
}, 40000);

// Hook para cerrar el navegador después de todas las pruebas
afterAll(async () => {
  if (driver) {
    await driver.quit();
    console.log("Pruebas finalizadas.");
  }
});

// Función para tomar capturas de pantalla en caso de fallo
const takeScreenshot = async (testName) => {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`failed-test-${testName}.png`, screenshot, 'base64');
  console.log(`Captura de pantalla guardada en failed-test-${testName}.png`);
};

describe('Pruebas de regresión del formulario de registro avanzado', () => {
  test('debería completar el formulario y validar el éxito', async () => {
    try {
      console.log("Paso 1: Navegando a la página de prueba.");
      await driver.get('https://demoqa.com/automation-practice-form');

      // Completar campos del formulario
      await driver.findElement(By.id('firstName')).sendKeys('Juan');
      await driver.findElement(By.id('lastName')).sendKeys('Perez');

      // Interactuar con radio buttons
      console.log("Paso 2: Seleccionando el género.");
      const gender = await driver.findElement(By.xpath("//label[text()='Male']"));
      await driver.executeScript("arguments[0].click();", gender);

      // Simular entrada de teclado
      console.log("Paso 3: Usando teclado para navegar y seleccionar.");
      const subjectsInput = await driver.findElement(By.id('subjectsInput'));
      await subjectsInput.sendKeys('Maths');
      await subjectsInput.sendKeys(Key.TAB);

      // Esperar por el botón de envío
      console.log("Paso 4: Esperando el botón de envío.");
      const submitBtn = await driver.wait(until.elementLocated(By.id('submit')), 10000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
      await driver.executeScript("arguments[0].click();", submitBtn);

      // Validar la aparición de la modal de éxito
      console.log("Paso 5: Validando la modal de éxito.");
      const modal = await driver.wait(until.elementLocated(By.css('.modal-content')), 10000);
      await driver.wait(until.elementIsVisible(modal), 5000);
      expect(await modal.isDisplayed()).toBe(true);
    } catch (error) {
      await takeScreenshot('registro-exitoso-fallido');
      throw error;
    }
  }, 60000);

  test('debería mostrar un mensaje de error si el apellido está vacío', async () => {
    try {
      console.log("Paso 6: Probando validación de apellido vacío.");
      await driver.get('https://demoqa.com/automation-practice-form');

      // Rellenar solo el primer nombre
      await driver.findElement(By.id('firstName')).sendKeys('Maria');

      // Enviar el formulario
      const submitBtn = await driver.findElement(By.id('submit'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
      await driver.executeScript("arguments[0].click();", submitBtn);

      // Validar que el modal de éxito no aparece
      console.log("Paso 7: Validando que no aparece la modal.");
      await driver.sleep(1000); // Pequeña espera para estabilizar la página
      const modals = await driver.findElements(By.css('.modal-content'));
      expect(modals.length).toBe(0);
    } catch (error) {
      await takeScreenshot('validar-apellido-fallido');
      throw error;
    }
  }, 60000);
});