const { Builder, By } = require('selenium-webdriver');

async function testLogin() {
  console.log('Iniciando prueba de login...');
  
  let driver;
  try {
    console.log('Inicializando WebDriver...');
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
    
    console.log('WebDriver inicializado correctamente');
    
    // URL base para las pruebas
    const baseUrl = 'file:///C:/Users/mikae/OneDrive/Desktop/selenium-test-project/sample-page';
    
    console.log('Navegando a la página de login...');
    await driver.get(`${baseUrl}/login.html`);
    
    console.log('Ingresando credenciales inválidas...');
    let username = await driver.findElement(By.id('username'));
    await username.sendKeys('usuario_invalido');
    
    let password = await driver.findElement(By.id('password'));
    await password.sendKeys('password_invalido');
    
    console.log('Haciendo clic en el botón de login...');
    let loginButton = await driver.findElement(By.id('login-button'));
    await loginButton.click();
    
    console.log('Verificando mensaje de error...');
    let errorMessage = await driver.findElement(By.id('error-message'));
    let isDisplayed = await errorMessage.isDisplayed();
    let errorText = await errorMessage.getText();
    
    console.log(`Mensaje de error visible: ${isDisplayed}`);
    console.log(`Texto del mensaje: ${errorText}`);
    
    console.log('Prueba completada con éxito');
  } catch (error) {
    console.error('Error durante la prueba:', error);
  } finally {
    if (driver) {
      console.log('Cerrando el navegador...');
      await driver.quit();
    }
  }
}

// Ejecutar la prueba
testLogin().then(() => console.log('Prueba finalizada')); 