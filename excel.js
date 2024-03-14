const { Workbook } = require('exceljs');

async function guardarEnExcel(mensaje) {
    const workbook = new Workbook();
    await workbook.xlsx.readFile('C:/Users/lenovo/OneDrive/SUMA2024.xlsx');
    const worksheet = workbook.getWorksheet('12 NANY');
    console.log('lee el excel')
    // Encontrar la próxima celda vacía en la columna 'D'
    let nextRow = 1;
    while (worksheet.getCell(`D${nextRow}`).value) {
        console.log('busca la celda')
        nextRow++;
    }
    
    // Escribir el mensaje en la próxima celda vacía en la columna 'D'
    worksheet.getCell(`D${nextRow}`).value = mensaje;

    // Guardar el archivo Excel
    await workbook.xlsx.writeFile('C:/Users/lenovo/OneDrive/SUMA2024.xlsx');
    console.log('escribe el mensaje')
}

module.exports = {
    guardarEnExcel
};
