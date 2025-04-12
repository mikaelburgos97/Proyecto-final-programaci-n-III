const { Builder, By, until } = require('selenium-webdriver');
const { config, takeScreenshot } = require('./utils');
const fs = require('fs-extra');

// Limpiar capturas de video
fs.emptyDirSync('./video-demo');
fs.ensureDirSync('./video-demo');

// Función para pausar (útil para el video)
function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Función para tomar capturas para el video
async function takeVideoCap(driver, name) {
  const screenshot = await driver.takeScreenshot();
  const filename = `./video-demo/${name}.png`;
  await fs.writeFile(filename, screenshot, 'base64');
  console.log(`Video cap: ${filename}`);
  return filename;
}

async function recordDemo() {
  console.log('Iniciando grabación de demo para video...');
  
  let driver;
  try {
    // Inicializar WebDriver con ventana grande para mejor visualización
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
    
    await driver.manage().window().maximize();
    
    // ==== DEMO DE LOGIN ====
    console.log('\n===== DEMO DE LOGIN =====');
    
    // Abrir página de login
    await driver.get(`${config.baseUrl}/login.html`);
    await takeVideoCap(driver, '01_login_page');
    await pause(2000);
    
    // Ingresar credenciales inválidas
    console.log('Mostrando login con credenciales inválidas...');
    await driver.findElement(By.id('username')).sendKeys('usuario_invalido');
    await pause(1000);
    await driver.findElement(By.id('password')).sendKeys('password_invalido');
    await pause(1000);
    await takeVideoCap(driver, '02_login_invalid_credentials');
    
    // Hacer clic en botón
    await driver.findElement(By.id('login-button')).click();
    await pause(1500);
    
    // Mostrar mensaje de error
    await takeVideoCap(driver, '03_login_error_message');
    await pause(2000);
    
    // Limpiar campos
    await driver.findElement(By.id('username')).clear();
    await driver.findElement(By.id('password')).clear();
    
    // Ingresar credenciales válidas
    console.log('Mostrando login con credenciales válidas...');
    await driver.findElement(By.id('username')).sendKeys('mikaelburgos97');
    await pause(1000);
    await driver.findElement(By.id('password')).sendKeys('password_valido');
    await pause(1000);
    await takeVideoCap(driver, '04_login_valid_credentials');
    
    // Hacer clic en botón
    await driver.findElement(By.id('login-button')).click();
    await pause(1500);
    
    // Mostrar dashboard
    await driver.wait(until.urlContains('dashboard'), 5000);
    await takeVideoCap(driver, '05_dashboard');
    await pause(3000);
    
    // ==== DEMO DE BÚSQUEDA ====
    console.log('\n===== DEMO DE BÚSQUEDA =====');
    
    // Ir a la página principal
    await driver.get(`${config.baseUrl}/index.html`);
    await takeVideoCap(driver, '06_home_page');
    await pause(2000);
    
    // Realizar búsqueda de producto existente
    console.log('Mostrando búsqueda de producto existente...');
    await driver.findElement(By.id('search-input')).sendKeys('Laptop');
    await pause(1000);
    await takeVideoCap(driver, '07_search_input');
    
    // Hacer clic en botón de búsqueda
    await driver.findElement(By.id('search-button')).click();
    await pause(1500);
    
    // Mostrar resultados
    await takeVideoCap(driver, '08_search_results');
    await pause(2000);
    
    // Limpiar campo de búsqueda
    await driver.findElement(By.id('search-input')).clear();
    
    // Realizar búsqueda sin resultados
    console.log('Mostrando búsqueda sin resultados...');
    await driver.findElement(By.id('search-input')).sendKeys('ProductoInexistente123');
    await pause(1000);
    await takeVideoCap(driver, '09_search_no_results_input');
    
    // Hacer clic en botón de búsqueda
    await driver.findElement(By.id('search-button')).click();
    await pause(1500);
    
    // Mostrar mensaje de no resultados
    await takeVideoCap(driver, '10_search_no_results_message');
    await pause(2000);
    
    // ==== DEMO DE CARRITO ====
    console.log('\n===== DEMO DE CARRITO =====');
    
    // Ir a la página principal y limpiar localStorage
    await driver.get(`${config.baseUrl}/index.html`);
    await driver.executeScript('localStorage.clear();');
    await driver.navigate().refresh();
    await takeVideoCap(driver, '11_home_page_cart');
    await pause(2000);
    
    // Agregar producto al carrito
    console.log('Mostrando agregar producto al carrito...');
    const addButton = await driver.findElement(By.css('.product-card:first-child .add-to-cart'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", addButton);
    await pause(1000);
    await takeVideoCap(driver, '12_add_to_cart_button');
    
    // Hacer clic en botón de agregar
    await addButton.click();
    
    // Manejar alerta si aparece
    try {
      await driver.wait(until.alertIsPresent(), 2000);
      const alert = await driver.switchTo().alert();
      await takeVideoCap(driver, '13_add_to_cart_alert');
      await pause(1000);
      await alert.accept();
    } catch (e) {
      console.log('No se mostró alerta');
    }
    
    await pause(1500);
    
    // Mostrar contador del carrito actualizado
    await takeVideoCap(driver, '14_cart_count_updated');
    await pause(2000);
    
    // Ir a la página del carrito
    console.log('Mostrando página del carrito...');
    await driver.get(`${config.baseUrl}/cart.html`);
    await pause(2000);
    await takeVideoCap(driver, '15_cart_page');
    await pause(3000);
    
    console.log('\nDemo completado. Las capturas para el video se encuentran en la carpeta video-demo/');
    
  } catch (error) {
    console.error('Error durante la grabación del demo:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

// Ejecutar la grabación
recordDemo();