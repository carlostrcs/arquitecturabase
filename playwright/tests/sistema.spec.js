import { test, expect } from '@playwright/test';

//TENER CUENTA REGISTRADA ANTES DE CORRER LOS TEST
//EMAIL DE CUENTA: 'carlostorrillascasas1@gmail.com'
//CONTRASEÑA DE CUENTA: '1.A123123'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByPlaceholder('Introduce email').click();
  await page.getByPlaceholder('Introduce email').fill('carlostorrillascasas1@gmail.com');
  await page.getByPlaceholder('Introduce password').click();
  await page.getByPlaceholder('Introduce password').press('CapsLock');
  await page.getByPlaceholder('Introduce password').fill('1.A123123');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  const msgDiv = await page.waitForSelector('#msg', { state: 'visible' });
  const textContent = await msgDiv.textContent();
  expect(textContent).toContain('Bienvenido al sistema');
});

test('test2', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    await page.getByPlaceholder('Introduce email').click();
    await page.getByPlaceholder('Introduce email').fill('carlostorrillascasas1@gmail.com');
    await page.getByPlaceholder('Introduce password').click();
    await page.getByPlaceholder('Introduce password').press('CapsLock');
    await page.getByPlaceholder('Introduce password').fill('1.A123123');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  
    // Comprueba que el campo msg contiene el texto "Bienvenido al sistema"
    const msgDiv = await page.waitForSelector('#msg', { state: 'visible' });
    let textContent = await msgDiv.textContent();
    expect(textContent).toContain('Bienvenido al sistema');
  
    await page.getByRole('link', { name: 'Salir' }).click();

    // Volver a iniciar sesión
    await page.getByPlaceholder('Introduce email').click();
    await page.getByPlaceholder('Introduce email').press('CapsLock');
    await page.getByPlaceholder('Introduce email').fill('carlostorrillascasas1@gmail.com');
    await page.getByPlaceholder('Introduce password').click();
    await page.getByPlaceholder('Introduce password').press('CapsLock');
    await page.getByPlaceholder('Introduce password').fill('1.A123123');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Eliminar cuenta
    await page.getByRole('link', { name: 'Eliminar Cuenta' }).click();
  
  });