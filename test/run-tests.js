// Script para ejecutar todas las pruebas y generar un reporte
const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config/config');

// Asegurar que los directorios existan
fs.ensureDirSync(config.dirs.screenshots);
fs.ensureDirSync(config.dirs.reports);

// Coleccionará los resultados de todas las pruebas
const allTestResults = [];

// Función para ejecutar una prueba
function runTest(testFile) {
  console.log(`Ejecutando prueba: ${testFile}`);
  try {
    execSync(`npx mocha --timeout 60000 ${testFile}`, { stdio: 'inherit' });
    
    // Recopilar resultados exitosos
    // Nota: En un proyecto real, se debería parsear la salida de mocha
    // para capturar los resultados exactos
    return {
      name: path.basename(testFile, '.js'),
      status: 'passed',
      duration: 0,
      screenshots: getScreenshotsForTest(path.basename(testFile, '.js'))
    };
  } catch (error) {
    console.error(`Error en la prueba ${testFile}:`, error.message);
    
    // Recopilar resultados fallidos
    return {
      name: path.basename(testFile, '.js'),
      status: 'failed',
      duration: 0,
      error: error.message,
      screenshots: getScreenshotsForTest(path.basename(testFile, '.js'))
    };
  }
}

// Función para obtener las capturas de pantalla relacionadas con una prueba
function getScreenshotsForTest(testName) {
  const screenshots = [];
  const files = fs.readdirSync(config.dirs.screenshots);
  
  // Filtrar los archivos relacionados con la prueba
  files.forEach(file => {
    if (file.includes(testName.replace('test', ''))) {
      screenshots.push(path.join(config.dirs.screenshots, file));
    }
  });
  
  return screenshots;
}

// Ejecutar todas las pruebas
function runAllTests() {
  console.log('Iniciando ejecución de todas las pruebas...');
  
  // Obtener todos los archivos de prueba
  const testFiles = fs.readdirSync('./test')
    .filter(file => file.endsWith('.test.js'))
    .map(file => path.join('./test', file));
  
  // Ejecutar cada prueba
  testFiles.forEach(testFile => {
    const result = runTest(testFile);
    allTestResults.push(result);
  });
  
  // Generar reporte HTML con los resultados
  generateReport(allTestResults);
}

// Función para generar el reporte HTML
function generateReport(testResults) {
  console.log('Generando reporte HTML...');
  
  // Importar el generador de reportes
  const reporter = require('./utils/reporter');
  
  // Generar el reporte
  reporter.generateReport(testResults)
    .then(filepath => {
      console.log(`Reporte generado exitosamente en: ${filepath}`);
    })
    .catch(error => {
      console.error('Error al generar el reporte:', error);
    });
}

// Ejecutar todas las pruebas
runAllTests();