// Funciones auxiliares para las pruebas
const { By, until } = require('selenium-webdriver');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config/config');

/**
 * Espera a que un elemento sea visible y disponible para interactuar
 * @param {WebDriver} driver - Instancia del WebDriver
 * @param {By} locator - Localizador del elemento
 * @param {number} timeout - Tiempo máximo de espera (ms)
 * @returns {Promise<WebElement>} - Elemento encontrado
 */
async function waitForElement(driver, locator, timeout = config.timeouts.implicit) {
  return driver.wait(until.elementLocated(locator), timeout);
}

/**
 * Espera a que un elemento sea visible y hace click en él
 * @param {WebDriver} driver - Instancia del WebDriver
 * @param {By} locator - Localizador del elemento
 * @returns {Promise<void>}
 */
async function clickElement(driver, locator) {
  const element = await waitForElement(driver, locator);
  await driver.wait(until.elementIsVisible(element), config.timeouts.implicit);
  await element.click();
}

/**
 * Escribe texto en un elemento
 * @param {WebDriver} driver - Instancia del WebDriver
 * @param {By} locator - Localizador del elemento
 * @param {string} text - Texto a escribir
 * @returns {Promise<void>}
 */
async function sendKeys(driver, locator, text) {
  const element = await waitForElement(driver, locator);
  await element.clear();
  await element.sendKeys(text);
}

/**
 * Toma una captura de pantalla
 * @param {WebDriver} driver - Instancia del WebDriver
 * @param {string} name - Nombre del archivo
 * @returns {Promise<string>} - Ruta del archivo guardado
 */
async function takeScreenshot(driver, name) {
  // Asegura que el directorio de capturas exista
  await fs.ensureDir(config.dirs.screenshots);
  
  // Toma la captura
  const screenshot = await driver.takeScreenshot();
  
  // Nombre del archivo
  const filename = `${name}_${new Date().toISOString().replace(/:/g, '-')}.png`;
  const filepath = path.join(config.dirs.screenshots, filename);
  
  // Guarda el archivo
  await fs.writeFile(filepath, screenshot, 'base64');
  
  return filepath;
}

module.exports = {
  waitForElement,
  clickElement,
  sendKeys,
  takeScreenshot
};