const { Builder, By, until } = require('selenium-webdriver');
const { config, takeScreenshot, generateReport } = require('../utils');

async function testLogin() {
  console.log('\n=========== PRUEBA DE INICIO DE SESIÓN ===========\n');
  
  let driver;
  const testResults = [];
  const startTime = Date.now();
  
  try {
    console.log('Inicializando WebDriver...');
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
    
    console.log('WebDriver inicializado correctamente');
    
    // Test 1: Credenciales inválidas
    try {
      console.log('\nCaso 1: Inicio de sesión con credenciales inválidas');
      
      // Abrir la página de login
      console.log('  Navegando a la página de login...');
      await driver.get(`${config.baseUrl}/login.html`);
      
      // Tomar captura inicial
      const screenshotInit = await takeScreenshot(driver, 'login_invalid_initclear');
      
      // Ingresar credenciales inválidas
      console.log('  Ingresando credenciales inválidas...');
      const usernameField = await driver.findElement(By.id('username'));
      await usernameField.clear();
      await usernameField.sendKeys('usuario_invalido');
      
      const passwordField = await driver.findElement(By.id('password'));
      await passwordField.clear();
      await passwordField.sendKeys('password_invalido');
      
      // Hacer clic en el botón de login
      console.log('  Haciendo clic en el botón de login...');
      const loginButton = await driver.findElement(By.id('login-button'));
      await loginButton.click();
      
      // Esperar y verificar mensaje de error
      console.log('  Verificando mensaje de error...');
      const errorMessage = await driver.findElement(By.id('error-message'));
      await driver.wait(until.elementIsVisible(errorMessage), 5000);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'login_invalid_error');
      
      const isDisplayed = await errorMessage.isDisplayed();
      console.log(`  ¿Mensaje de error visible? ${isDisplayed}`);
      
      const errorText = await errorMessage.getText();
      console.log(`  Texto del mensaje: "${errorText}"`);
      
      // Evaluar prueba
      const isPassed = isDisplayed && errorText.includes('inválidas');
      
      // Registrar resultado
      testResults.push({
        name: 'Inicio de sesión con credenciales inválidas',
        status: isPassed ? 'passed' : 'failed',
        duration: Date.now() - startTime,
        screenshots: [screenshotInit, screenshotError],
        error: isPassed ? null : 'El mensaje de error no se mostró correctamente'
      });
      
      console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
    } catch (error) {
      console.error('  Error en el caso 1:', error.message);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'login_invalid_exception');
      
      // Registrar resultado fallido
      testResults.push({
        name: 'Inicio de sesión con credenciales inválidas',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        screenshots: [screenshotError]
      });
    }
    
    // Test 2: Credenciales válidas
    try {
      console.log('\nCaso 2: Inicio de sesión con credenciales válidas');
      
      // Abrir la página de login
      console.log('  Navegando a la página de login...');
      await driver.get(`${config.baseUrl}/login.html`);
      
      // Tomar captura inicial
      const screenshotInit = await takeScreenshot(driver, 'login_valid_init');
      
      // Ingresar credenciales válidas
      console.log('  Ingresando credenciales válidas...');
      const usernameField = await driver.findElement(By.id('username'));
      await usernameField.clear();
      // await usernameField.sendKeys('usuario_valido');
      await usernameField.sendKeys('mikaelburgos97');


      
      const passwordField = await driver.findElement(By.id('password'));
      await passwordField.clear();
      await passwordField.sendKeys('password_valido');
      // await passwordField.sendKeys('Admin1');
      
      // Hacer clic en el botón de login
      console.log('  Haciendo clic en el botón de login...');
      const loginButton = await driver.findElement(By.id('login-button'));
      await loginButton.click();
      
      // Esperar redirección y verificar dashboard
      console.log('  Esperando redirección al dashboard...');
      await driver.wait(until.urlContains('dashboard'), 5000);
      
      // Tomar captura del dashboard
      const screenshotDashboard = await takeScreenshot(driver, 'login_valid_dashboard');
      
      // Verificar el nombre de usuario
      console.log('  Verificando nombre de usuario...');
      const username = await driver.findElement(By.id('user-name'));
      const usernameText = await username.getText();
      console.log(`  Nombre de usuario mostrado: "${usernameText}"`);
      
      // Evaluar prueba
      // const isPassed = usernameText === 'usuario_valido';
      const isPassed = usernameText === 'mikaelburgos97';

      
      // Registrar resultado
      testResults.push({
        name: 'Inicio de sesión con credenciales válidas',
        status: isPassed ? 'passed' : 'failed',
        duration: Date.now() - startTime,
        screenshots: [screenshotInit, screenshotDashboard],
        error: isPassed ? null : 'El nombre de usuario no coincide'
      });
      
      console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
    } catch (error) {
      console.error('  Error en el caso 2:', error.message);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'login_valid_exception');
      
      // Registrar resultado fallido
      testResults.push({
        name: 'Inicio de sesión con credenciales válidas',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        screenshots: [screenshotError]
      });
    }
    
  } catch (error) {
    console.error('Error general:', error.message);
  } finally {
    if (driver) {
      console.log('\nCerrando el navegador...');
      await driver.quit();
    }
    
    // Generar reporte
    console.log('\nGenerando reporte HTML...');
    const reportPath = await generateReport(testResults);
    
    console.log(`\nPrueba de inicio de sesión completada.`);
    console.log(`Resultados: ${testResults.filter(t => t.status === 'passed').length} exitosos, ${testResults.filter(t => t.status === 'failed').length} fallidos`);
  }
}

// Ejecutar la prueba
testLogin();