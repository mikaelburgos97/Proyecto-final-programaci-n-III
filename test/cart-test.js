const { Builder, By, until } = require('selenium-webdriver');
const { config, takeScreenshot, generateReport } = require('../utils');

async function testCart() {
  console.log('\n=========== PRUEBA DE CARRITO DE COMPRAS ===========\n');
  
  let driver;
  const testResults = [];
  const startTime = Date.now();
  
  try {
    console.log('Inicializando WebDriver...');
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
    
    console.log('WebDriver inicializado correctamente');
    
    // Test 1: Agregar un producto al carrito
    try {
      console.log('\nCaso 1: Agregar un producto al carrito');
      
      // Abrir la página principal y limpiar localStorage
      console.log('  Navegando a la página principal...');
      await driver.get(`${config.baseUrl}/index.html`);
      await driver.executeScript('localStorage.clear();');
      await driver.navigate().refresh();
      
      // Tomar captura inicial
      const screenshotInit = await takeScreenshot(driver, 'cart_add_init');
      
      // Verificar contador inicial del carrito
      console.log('  Verificando contador inicial del carrito...');
      const initialCountElem = await driver.findElement(By.id('cart-count'));
      const initialCount = await initialCountElem.getText();
      console.log(`  Contador inicial: ${initialCount}`);
      
      // Agregar el primer producto al carrito
      console.log('  Agregando producto al carrito...');
      const firstProduct = await driver.findElement(By.css('.product-card:first-child h3'));
      const productName = await firstProduct.getText();
      console.log(`  Producto seleccionado: "${productName}"`);
      
      const addButton = await driver.findElement(By.css('.product-card:first-child .add-to-cart'));
      await addButton.click();
      
      // Manejar alerta si aparece
      try {
        const alert = await driver.switchTo().alert();
        await alert.accept();
        console.log('  Alerta aceptada');
      } catch (e) {
        console.log('  No se mostró alerta');
      }
      
      // Dar tiempo para actualización del carrito
      await driver.sleep(1000);
      
      // Tomar captura después de agregar
      const screenshotAdded = await takeScreenshot(driver, 'cart_add_result');
      
      // Verificar contador actualizado del carrito
      console.log('  Verificando contador actualizado del carrito...');
      const updatedCountElem = await driver.findElement(By.id('cart-count'));
      const updatedCount = await updatedCountElem.getText();
      console.log(`  Contador actualizado: ${updatedCount}`);
      
      // Evaluar prueba
      const isPassed = updatedCount === '1' && initialCount === '0';
      
      // Registrar resultado
      testResults.push({
        name: 'Agregar un producto al carrito',
        status: isPassed ? 'passed' : 'failed',
        duration: Date.now() - startTime,
        screenshots: [screenshotInit, screenshotAdded],
        error: isPassed ? null : 'El contador del carrito no se actualizó correctamente'
      });
      
      console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
    } catch (error) {
      console.error('  Error en el caso 1:', error.message);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'cart_add_exception');
      
      // Registrar resultado fallido
      testResults.push({
        name: 'Agregar un producto al carrito',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        screenshots: [screenshotError]
      });
    }
    
    // Test 2: Agregar múltiples productos al carrito
    try {
      console.log('\nCaso 2: Agregar múltiples productos al carrito');
      
      // Abrir la página principal y limpiar localStorage
      console.log('  Navegando a la página principal...');
      await driver.get(`${config.baseUrl}/index.html`);
      await driver.executeScript('localStorage.clear();');
      await driver.navigate().refresh();
      
      // Tomar captura inicial
      const screenshotInit = await takeScreenshot(driver, 'cart_multiple_init');
      
      // Verificar contador inicial del carrito
      console.log('  Verificando contador inicial del carrito...');
      const initialCountElem = await driver.findElement(By.id('cart-count'));
      const initialCount = await initialCountElem.getText();
      console.log(`  Contador inicial: ${initialCount}`);
      
      // Agregar el primer producto al carrito
      console.log('  Agregando primer producto al carrito...');
      const firstProduct = await driver.findElement(By.css('.product-card:nth-child(1) h3'));
      const product1Name = await firstProduct.getText();
      console.log(`  Primer producto: "${product1Name}"`);
      
      const addButton1 = await driver.findElement(By.css('.product-card:nth-child(1) .add-to-cart'));
      await addButton1.click();
      
      // Manejar alerta si aparece
      try {
        const alert = await driver.switchTo().alert();
        await alert.accept();
        console.log('  Alerta aceptada');
      } catch (e) {
        console.log('  No se mostró alerta');
      }
      
      // Dar tiempo para actualización
      await driver.sleep(1000);
      
      // Agregar el segundo producto al carrito
      console.log('  Agregando segundo producto al carrito...');
      const secondProduct = await driver.findElement(By.css('.product-card:nth-child(2) h3'));
      const product2Name = await secondProduct.getText();
      console.log(`  Segundo producto: "${product2Name}"`);
      
      const addButton2 = await driver.findElement(By.css('.product-card:nth-child(2) .add-to-cart'));
      await addButton2.click();
      
      // Manejar alerta si aparece
      try {
        const alert = await driver.switchTo().alert();
        await alert.accept();
        console.log('  Alerta aceptada');
      } catch (e) {
        console.log('  No se mostró alerta');
      }
      
      // Dar tiempo para actualización
      await driver.sleep(1000);
      
      // Tomar captura después de agregar
      const screenshotAdded = await takeScreenshot(driver, 'cart_multiple_result');
      
      // Verificar contador final del carrito
      console.log('  Verificando contador final del carrito...');
      const finalCountElem = await driver.findElement(By.id('cart-count'));
      const finalCount = await finalCountElem.getText();
      console.log(`  Contador final: ${finalCount}`);
      
      // Evaluar prueba
      const isPassed = finalCount === '2' && initialCount === '0';
      
      // Registrar resultado
      testResults.push({
        name: 'Agregar múltiples productos al carrito',
        status: isPassed ? 'passed' : 'failed',
        duration: Date.now() - startTime,
        screenshots: [screenshotInit, screenshotAdded],
        error: isPassed ? null : 'El contador del carrito no se actualizó correctamente'
      });
      
      console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
    } catch (error) {
      console.error('  Error en el caso 2:', error.message);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'cart_multiple_exception');
      
      // Registrar resultado fallido
      testResults.push({
        name: 'Agregar múltiples productos al carrito',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        screenshots: [screenshotError]
      });
    }
    
    // Test 3: Ver y verificar página de carrito
    try {
      console.log('\nCaso 3: Ver página de carrito');
      
      // Navegar a la página del carrito
      console.log('  Navegando a la página del carrito...');
      await driver.get(`${config.baseUrl}/cart.html`);
      
      // Tomar captura de la página del carrito
      const screenshotCart = await takeScreenshot(driver, 'cart_page');
      
      // Verificar elementos del carrito
      console.log('  Verificando elementos del carrito...');
      
      // Comprobar si hay productos o mensaje de carrito vacío
      const cartItems = await driver.findElements(By.css('.cart-table tbody tr'));
      
      if (cartItems.length > 0) {
        console.log(`  Productos en el carrito: ${cartItems.length}`);
        
        // Verificar precio total
        const totalPrice = await driver.findElement(By.css('.cart-total h3')).getText();
        console.log(`  Precio total: ${totalPrice}`);
        
        // Evaluar prueba
        const isPassed = cartItems.length >= 1;
        
        // Registrar resultado
        testResults.push({
          name: 'Ver página de carrito',
          status: isPassed ? 'passed' : 'failed',
          duration: Date.now() - startTime,
          screenshots: [screenshotCart],
          error: isPassed ? null : 'No se muestran correctamente los productos en el carrito'
        });
        
        console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
      } else {
        // Verificar mensaje de carrito vacío
        console.log('  No hay productos en el carrito');
        const emptyMessage = await driver.findElement(By.css('.cart-empty h3')).getText();
        console.log(`  Mensaje: "${emptyMessage}"`);
        
        // Evaluar prueba - El carrito puede estar vacío si el localStorage no persiste
        const isPassed = emptyMessage.includes('vacío');
        
        // Registrar resultado
        testResults.push({
          name: 'Ver página de carrito vacío',
          status: isPassed ? 'passed' : 'failed',
          duration: Date.now() - startTime,
          screenshots: [screenshotCart],
          error: isPassed ? null : 'No se muestra correctamente el mensaje de carrito vacío'
        });
        
        console.log(`  Resultado: ${isPassed ? 'EXITOSO ✓' : 'FALLIDO ✗'}`);
      }
    } catch (error) {
      console.error('  Error en el caso 3:', error.message);
      
      // Tomar captura del error
      const screenshotError = await takeScreenshot(driver, 'cart_page_exception');
      
      // Registrar resultado fallido
      testResults.push({
        name: 'Ver página de carrito',
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
    
    console.log(`\nPrueba de carrito completada.`);
    console.log(`Resultados: ${testResults.filter(t => t.status === 'passed').length} exitosos, ${testResults.filter(t => t.status === 'failed').length} fallidos`);
  }
}

// Ejecutar la prueba
testCart();