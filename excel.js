const XlsxPopulate = require('xlsx-populate');
const filePath = 'C:\\Users\\lenovo\\OneDrive\\SUMA2024.xlsx';

async function updateExcel(data) {
    const workbook = await XlsxPopulate.fromFileAsync(filePath);

    // Actualizar la hoja "3 ROMAN"
    const romanSheet = workbook.sheet('3 ROMAN');
    const nextRowB = findNextEmptyCell(romanSheet, 'B');
    romanSheet.cell(nextRowB.row, nextRowB.col).value(data.message);

    // Actualizar la hoja "6 CECILIA"
    const ceciliaSheet = workbook.sheet('6 CECILIA');
    const nextRowD = findNextEmptyCell(ceciliaSheet, 'D');
    ceciliaSheet.cell(nextRowD.row, nextRowD.col).value(data.message);

    // Guardar los cambios en el archivo de Excel
    await workbook.toFileAsync(filePath);
}
//lkhkkljhgkl
function findNextEmptyCell(sheet, col) {
    const colLetter = String.fromCharCode(col + 64);
    const range = `${colLetter}1:${colLetter}${sheet.lastRowAddress.r}`;
    const cell = sheet.range(range).find(cell => !cell.value());
    return cell ? { row: cell.row().number, col } : { row: sheet.lastRowAddress.r + 1, col };
}

module.exports = { updateExcel };