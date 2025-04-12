// Configuración del proyecto
module.exports = {
  // URL base para las pruebas (ruta local a la carpeta sample-page)
  baseUrl: 'file:///C:/Users/mikae/OneDrive/Desktop/selenium-test-project/sample-page', 

  // Configuración del navegador
  browser: {
    name: 'chrome', // chrome, firefox
    options: {
      args: ['--start-maximized', '--disable-notifications']
    }
  },

  // Tiempo de espera
  timeouts: {
    implicit: 10000, // Tiempo de espera implícito (ms)
    pageLoad: 30000, // Tiempo de espera para carga de página (ms)
    script: 30000    // Tiempo de espera para scripts (ms)
  },

  // Directorios
  dirs: {
    screenshots: './screenshots',
    reports: './reports'
  }
};