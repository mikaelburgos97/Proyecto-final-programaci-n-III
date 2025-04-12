const { Builder, By, until } = require('selenium-webdriver');
const { config, takeScreenshot, generateReport } = require('../utils');

async function testSearch() {
  console.log('\n=========== PRUEBA DE BÚSQUEDA DE PRODUCTOS ===========\n');
  
  let driver;
  const testResults = [];
  const startTime = Date.now();
  
  try {
    console.log('Inicializando WebDriver...');
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
    
    console.log('WebDriver inicializado correctamente');
    
    // Test 1: Búsqueda de producto existente
    try {
      console.log('\nCaso 1: Búsqueda de producto existente');
      
      // Abrir la página principal
      console.log('  Navegando a la página principal...');
      await driver.get(`${config.baseUrl}/index.html`);
      
      // Tomar captura inicial
      const screenshotInit = await takeScreenshot(driver, 'search_existing_init');
      
      // Ingresar término de búsqueda
      console.log('  Ingresando término de búsqueda "Laptop"...');
      const searchInput = await driver.findElement(By.id('search-input'));
      await searchInput.clear();
      await searchInput.sendKeys('Laptop');
      
      // Hacer clic en el botón de búsqueda
      console.log('  Haciendo clic en el botón de búsqueda...');
      const searchButton = await driver.findElement(By.id('search-button'));
      await searchButton.click();
      
      // Dar tiempo para que se muestren los resultados
      await driver.sleep(1000);
      
      // Tomar captura de los resultados
      const screenshotResults = await takeScreenshot(driver, 'search_existing_results');
      
      // Verificar resultados
      console.log('  Verificando resultados...');
      const products = await driver.findElements(By.css('.product-card'));
      console.log(`  Productos encontrados: ${products.length}`);
      
      let productTitles = [];
      for (let product of products) {
        const title = await product.findElement(By.css('h3')).getText();
        productTitles.push(title);
      }
      
      console.log(`  Títulos de productos: ${productTitles.join(', ')}`);
      
      // Evaluar prueba
      const isPassed = products.length > 0 && productTitles.some(title => title.toLowerCase().includes('laptop'));
      
      // Registrar resultado
      testResults.push({
        name: 'Búsqueda de producto existente',
        status: isPassed ? 'passed' : 'failed',
        duration: Date.now() - startTime,
        screenshots: [screenshotInit, screenshotResults],
        error: isPassed ? null : 'No se encontraron productos relacionados con "Laptop"'
      });
      
      console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
    } catch (error) {
      console.error('  Error en el caso 1:', error.message);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'search_existing_exception');
      
      // Registrar resultado fallido
      testResults.push({
        name: 'Búsqueda de producto existente',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        screenshots: [screenshotError]
      });
    }
    
    // Test 2: Búsqueda sin resultados
    try {
      console.log('\nCaso 2: Búsqueda de producto inexistente');
      
      // Abrir la página principal
      console.log('  Navegando a la página principal...');
      await driver.get(`${config.baseUrl}/index.html`);
      
      // Tomar captura inicial
      const screenshotInit = await takeScreenshot(driver, 'search_nonexistent_init');
      
      // Ingresar término de búsqueda
      console.log('  Ingresando término de búsqueda "ProductoInexistente123"...');
      const searchInput = await driver.findElement(By.id('search-input'));
      await searchInput.clear();
      await searchInput.sendKeys('ProductoInexistente123');
      
      // Hacer clic en el botón de búsqueda
      console.log('  Haciendo clic en el botón de búsqueda...');
      const searchButton = await driver.findElement(By.id('search-button'));
      await searchButton.click();
      
      // Dar tiempo para que se muestren los resultados
      await driver.sleep(1000);
      
      // Tomar captura de los resultados
      const screenshotResults = await takeScreenshot(driver, 'search_nonexistent_results');
      
      // Verificar mensaje de no resultados
      console.log('  Verificando mensaje de no resultados...');
      const noResultsMessage = await driver.findElement(By.css('#product-grid p'));
      const messageText = await noResultsMessage.getText();
      console.log(`  Mensaje mostrado: "${messageText}"`);
      
      // Evaluar prueba
      const isPassed = messageText.includes('No se encontraron productos');
      
      // Registrar resultado
      testResults.push({
        name: 'Búsqueda sin resultados',
        status: isPassed ? 'passed' : 'failed',
        duration: Date.now() - startTime,
        screenshots: [screenshotInit, screenshotResults],
        error: isPassed ? null : 'No se mostró el mensaje de "No se encontraron productos"'
      });
      
      console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
    } catch (error) {
      console.error('  Error en el caso 2:', error.message);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'search_nonexistent_exception');
      
      // Registrar resultado fallido
      testResults.push({
        name: 'Búsqueda sin resultados',
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
    
    console.log(`\nPrueba de búsqueda completada.`);
    console.log(`Resultados: ${testResults.filter(t => t.status === 'passed').length} exitosos, ${testResults.filter(t => t.status === 'failed').length} fallidos`);
  }
}

// Ejecutar la prueba
testSearch();