const { Builder } = require('selenium-webdriver');

async function runTest() {
  console.log('Iniciando prueba simple...');
  
  let driver;
  try {
    console.log('Inicializando WebDriver...');
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
    
    console.log('WebDriver inicializado correctamente');
    console.log('Navegando a Google...');
    
    await driver.get('https://www.google.com');
    console.log('Navegación completada');
    
    const title = await driver.getTitle();
    console.log(`Título de la página: ${title}`);
    
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
runTest().then(() => console.log('Prueba finalizada'));