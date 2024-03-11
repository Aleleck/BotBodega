// Asegúrate de que la declaración de accessToken ocurra antes de cualquier intento de acceder a ella
const accessToken = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6InJZZjlSa3RIa2NBXzR3bFVzdjNwX3pTVU4xWmVoNWJtdVlNR0UyR2dYVTAiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNDU0MTFjZi1jMWJkLTRlMjgtYjAzMi1hYmI4MWM2MDhkMmQvIiwiaWF0IjoxNzEwMTk4OTc0LCJuYmYiOjE3MTAxOTg5NzQsImV4cCI6MTcxMDIwMjg3NCwiYWlvIjoiRTJOZ1lNandLc3ZWKzVxbnM2cTJjdEdFSDlmT0F3QT0iLCJhcHBfZGlzcGxheW5hbWUiOiJCb2RlZ2FFeGNlbCIsImFwcGlkIjoiNDViMDU4MjUtODIzNy00ODdhLTkwNDYtYWVmNmRlZjA0ZDgyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDQ1NDExY2YtYzFiZC00ZTI4LWIwMzItYWJiODFjNjA4ZDJkLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiYTNmNmQxYzMtOTM4MS00MzIzLWE0Y2MtY2UwNDQzYWU4MjA4IiwicmgiOiIwLkFjb0F6eEZVQkwzQktFNndNcXU0SEdDTkxRTUFBQUFBQUFBQXdBQUFBQUFBQUFENkFBQS4iLCJzdWIiOiJhM2Y2ZDFjMy05MzgxLTQzMjMtYTRjYy1jZTA0NDNhZTgyMDgiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiU0EiLCJ0aWQiOiIwNDU0MTFjZi1jMWJkLTRlMjgtYjAzMi1hYmI4MWM2MDhkMmQiLCJ1dGkiOiJzVHFmaWpERzJrbWNVbVdSZGw4REFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX3RjZHQiOjE3MDYyODAxMTB9.WCT9RI9EfPH3WgkcAQekC4truadVcIoOhCX2VuqdYarZbGdLFWFsle4QeqmEE8aujmEvu0oSXLkSKgpP3zYtJ_4c9IvO8zXnW65fv8sw_0iznSC1yX9Z7nEbqzL8HhgRrcgJkAMOEnqurRvypGDWaNySAjFqAXamhEnPGB8Qh6EJDLqap62REVs_qg3_BuBxcY3en-uhepYlHTT5b3ZsjblqUwSiOkkCc0TRyFFCAB-ZC2UYVUi2-6a-4eZP5r7ufuToSN-gQfh7e9j7dmCP1ZUo0QNzDSnq2SC8-IQR_Mjq0Oa99Jks1b5PBrdzF6S58gLNoBnjG5b4l65BOQLBsQ';

const { Client } = require('@microsoft/microsoft-graph-client');

async function appendDataToExcelWorksheet(accessToken, driveItemId, workbookId, worksheetTitle, data) {
    const client = Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });

    const driveItem = await client.api(`/drive/items/${driveItemId}`).get();
    const workbook = await client.api(`/drive/items/${driveItem.id}/workbook`).get();
    const worksheet = workbook.worksheets.items.find(w => w.name === worksheetTitle);
    const range = worksheet.usedRange;
    const lastRow = range.rowCount + 1;

    const appendData = [
        ['', '', '', '', '', '', '', '', '', '', '', '', ...data[0], '', '']
    ];

    await client.api(`/drive/items/${driveItem.id}/workbook/worksheets/${worksheet.id}/range(address='L${lastRow}:M${lastRow}')`)
        .post({ values: appendData });
}

// Asegúrate de que los valores de las variables estén correctamente asignados antes de llamar a la función
const driveItemId = 'FE0A7D378FBC4ECA!5160'; // Reemplaza con el ID de tu OneDrive Excel workbook
const workbookId = 'FE0A7D378FBC4ECA!168'; // Reemplaza con el ID de tu OneDrive Excel workbook
const worksheetTitle = '4 VIVIANA'; // Reemplaza con el título de tu OneDrive Excel worksheet
const data = [['John', 'Doe', '42']]; // Reemplaza con los datos reales que deseas agregar a la hoja de cálculo

appendDataToExcelWorksheet(accessToken, driveItemId, workbookId, worksheetTitle, data);
