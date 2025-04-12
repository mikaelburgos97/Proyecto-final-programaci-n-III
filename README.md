# Historias de Usuario para Pruebas Automatizadas con Selenium

## Epic: Pruebas Automatizadas con Selenium

### Historia de Usuario 1: Inicio de Sesión

**Como** usuario registrado **Quiero** poder iniciar sesión en la aplicación **Para** acceder a mi cuenta personal y sus funcionalidades

#### Criterios de Aceptación:
1. El sistema debe permitir el inicio de sesión con credenciales válidas
2. El sistema debe redirigir al dashboard después de un inicio de sesión exitoso
3. El sistema debe mostrar el nombre de usuario después del inicio de sesión
4. El sistema debe permitir cerrar sesión desde cualquier página después de iniciar sesión
5. El sistema debe recordar la sesión del usuario si selecciona la opción "Recordarme"

#### Criterios de Rechazo:
1. El sistema no debe permitir el inicio de sesión con credenciales inválidas
2. El sistema no debe permitir el acceso a páginas restringidas sin iniciar sesión
3. El sistema no debe almacenar la contraseña en texto plano

---

### Historia de Usuario 2: Registro de Usuario

**Como** visitante **Quiero** poder registrarme en la aplicación **Para** crear una cuenta y acceder a funcionalidades personalizadas

#### Criterios de Aceptación:
1. El sistema debe permitir el registro con datos válidos (nombre, correo electrónico, contraseña)
2. El sistema debe validar que el formato del correo electrónico sea correcto
3. El sistema debe validar que la contraseña cumpla con los requisitos mínimos de seguridad
4. El sistema debe enviar un correo de confirmación al completar el registro
5. El sistema debe permitir iniciar sesión inmediatamente después del registro

#### Criterios de Rechazo:
1. El sistema no debe permitir el registro con un correo electrónico ya existente
2. El sistema no debe permitir el registro con contraseñas débiles
3. El sistema no debe permitir el registro sin aceptar los términos y condiciones
4. El sistema no debe registrar usuarios con nombres de usuario ofensivos o prohibidos

---

### Historia de Usuario 3: Búsqueda de Productos

**Como** usuario **Quiero** poder buscar productos **Para** encontrar rápidamente lo que necesito comprar

#### Criterios de Aceptación:
1. El sistema debe mostrar resultados que coincidan con los términos de búsqueda
2. El sistema debe mostrar un mensaje cuando no hay resultados
3. El sistema debe permitir filtrar resultados por categoría, precio y valoración
4. El sistema debe ordenar resultados por relevancia, precio o popularidad
5. El sistema debe permitir búsquedas con palabras parciales o incompletas

#### Criterios de Rechazo:
1. El sistema no debe mostrar resultados irrelevantes para la búsqueda
2. El sistema no debe fallar cuando se buscan caracteres especiales o SQL injection
3. El sistema no debe mostrar productos agotados o descontinuados primero
4. El sistema no debe permitir búsquedas vacías

---

### Historia de Usuario 4: Carrito de Compras

**Como** usuario **Quiero** poder agregar productos al carrito **Para** comprarlos posteriormente

#### Criterios de Aceptación:
1. El sistema debe añadir el producto seleccionado al carrito
2. El sistema debe actualizar el contador del carrito
3. El sistema debe permitir modificar la cantidad de cada producto
4. El sistema debe calcular correctamente el precio total del carrito
5. El sistema debe mantener los productos en el carrito durante la sesión actual

#### Criterios de Rechazo:
1. El sistema no debe permitir agregar más productos que el stock disponible
2. El sistema no debe perder los productos del carrito al navegar entre páginas
3. El sistema no debe permitir cantidades negativas o cero
4. El sistema no debe permitir agregar productos descontinuados al carrito

---

### Historia de Usuario 5: Proceso de Checkout

**Como** usuario **Quiero** poder completar mi compra **Para** recibir los productos seleccionados

#### Criterios de Aceptación:
1. El sistema debe permitir completar la compra con información válida de envío y pago
2. El sistema debe mostrar un resumen de la orden antes de confirmar
3. El sistema debe aplicar correctamente cupones y descuentos
4. El sistema debe generar un número de confirmación al finalizar la compra
5. El sistema debe enviar un correo de confirmación con los detalles de la compra

#### Criterios de Rechazo:
1. El sistema no debe permitir completar la compra con dirección de envío inválida
2. El sistema no debe permitir completar la compra con información de pago inválida
3. El sistema no debe permitir completar la compra si algún producto se agotó
4. El sistema no debe permitir completar la compra con un carrito vacío
5. El sistema no debe procesar pagos duplicados para una misma orden
