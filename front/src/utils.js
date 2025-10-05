const fs = require('fs').promises;

(async () => {
  try {
    // Чтение JSON-файла package.json
    const jsonData = await fs.readFile('./package.json', 'utf8');
    const config = JSON.parse(jsonData);

    // Извлекаем значение свойства proxy
    const proxyValue = config.proxy || '';

    // Формируем экспортируемую строку
    let output = `export const host = "${proxyValue}";\n`;

    // Записываем переменную в файл consts.js
    await fs.writeFile('./src/consts.js', output, 'utf8');

    console.log('Переменная host успешно записана в файл consts.js.');
  } catch (err) {
    console.error('Ошибка:', err.message);
  }
})();