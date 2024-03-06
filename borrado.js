const { GoogleSpreadsheet } = require('google-spreadsheet')
const fs = require('fs')
const RESPONSES_SHEET_ID = '1pblbPBLCxMv0LtBbQCuc-KVu-8B2eUZHLbMCflmHrr4'
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID)
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'))

let STATUS = {}

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/json')
//funcion para guardar en hoja BonosNuevo
async function saveDataToSheet(data) {
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    const sheet = doc.sheetsById['BonosNuevo']; // o 'bonosExistente' según corresponda
    const timestamp = new Date().toISOString();
    await sheet.addRow({ mensaje: `${data} - ${timestamp}` });
}

const flowFin = addKeyword(['fin']).addAnswer('¡Gracias por tu tiempo!', null, null);

const flowBonosNuevo = addKeyword(['1']).addAnswer('Enviame porfavor el numero de cedula, foto o fotocopia de la cedula, cuenta para consignar el valor del bono, en que empresa tranaja.')
    .addAnswer('El cambio del bono tiene un costo del 5% del valor del bono, el dinero se consignara a la cuenta dada el dia siguiente que se envien los bonos.',
    null,
    null,
    async (ctx, message) => {
        await saveDataToSheet(message.content);
        return flowFin;
    }
    )

const flowBonosExistente = addKeyword(['2']).addAnswer('Enviame porfavor los bonos y el valor de estos',
    null,
    null,
    flowFin
    )

const flowBonos = addKeyword(['1']).addAnswer(
    [
        '👉 *1* Si eres usuario nuevo',
        '👉 *2* Si no eres usuario nuevo',
    ],
    null,
    null,
    [flowBonosNuevo, flowBonosExistente]
)


const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *1* Para cambio de bonos',
            '👉 *2*  para ver la lista de videos',
            '👉 *3* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
