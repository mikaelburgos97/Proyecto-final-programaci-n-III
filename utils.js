const fs = require('fs-extra');
const path = require('path');

// Configuración
const config = {
  baseUrl: 'file:///C:/Users/mikae/OneDrive/Desktop/selenium-test-project/sample-page',
  dirs: {
    screenshots: './screenshots',
    reports: './reports'
  }
};

// Asegurar que los directorios existan
fs.ensureDirSync(config.dirs.screenshots);
fs.ensureDirSync(config.dirs.reports);

// Función para tomar capturas de pantalla
async function takeScreenshot(driver, name) {
  // Tomar la captura
  const screenshot = await driver.takeScreenshot();
  
  // Nombre del archivo
  const filename = `${name}_${new Date().toISOString().replace(/:/g, '-')}.png`;
  const filepath = path.join(config.dirs.screenshots, filename);
  
  // Guardar el archivo
  await fs.writeFile(filepath, screenshot, 'base64');
  console.log(`Captura guardada: ${filepath}`);
  
  return filepath;
}

// Función para generar reporte HTML
async function generateReport(testResults) {
  // Nombre del archivo
  const filename = `report_${new Date().toISOString().replace(/:/g, '-')}.html`;
  const filepath = path.join(config.dirs.reports, filename);
  
  // Genera el contenido HTML
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reporte de Pruebas Automatizadas</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .summary { display: flex; justify-content: space-around; margin: 20px 0; }
        .summary-item { text-align: center; padding: 10px; }
        .test-case { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; }
        .passed { border-left: 5px solid #4CAF50; }
        .failed { border-left: 5px solid #f44336; }
        .screenshot { max-width: 100%; margin-top: 10px; }
      </style>
    </head>
    <body>
      <header>
        <h1>Reporte de Pruebas Automatizadas con Selenium</h1>
        <p>Fecha: ${new Date().toLocaleString()}</p>
      </header>
      
      <div class="summary">
        <div class="summary-item">
          <h3>Total de Pruebas</h3>
          <p>${testResults.length}</p>
        </div>
        <div class="summary-item">
          <h3>Pruebas Exitosas</h3>
          <p>${testResults.filter(test => test.status === 'passed').length}</p>
        </div>
        <div class="summary-item">
          <h3>Pruebas Fallidas</h3>
          <p>${testResults.filter(test => test.status === 'failed').length}</p>
        </div>
      </div>
      
      <h2>Detalles de las Pruebas</h2>
      ${testResults.map(test => `
        <div class="test-case ${test.status}">
          <h3>${test.name}</h3>
          <p><strong>Estado:</strong> ${test.status === 'passed' ? 'Exitoso' : 'Fallido'}</p>
          <p><strong>Duración:</strong> ${test.duration}ms</p>
          ${test.error ? `<p><strong>Error:</strong> ${test.error}</p>` : ''}
          ${test.screenshots ? test.screenshots.map(screenshot => `
            <div>
              <p><strong>Captura de pantalla:</strong></p>
              <img class="screenshot" src="${screenshot}" alt="Captura de pantalla">
            </div>
          `).join('') : ''}
        </div>
      `).join('')}
    </body>
    </html>
  `;
  
  // Guardar el archivo
  await fs.writeFile(filepath, html);
  console.log(`Reporte generado en: ${filepath}`);
  
  return filepath;
}

module.exports = {
  config,
  takeScreenshot,
  generateReport
};