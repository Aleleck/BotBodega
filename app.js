const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const JsonFileAdapter = require('@bot-whatsapp/database/json');
const {updateExcel} = require('./excel')

const flowNumeroErrado = addKeyword('error').addAnswer('No se permite esta transaccion para este contacto');

const flowOtros = addKeyword([4]).addAnswer('Enviar consignacion');

const flowEfecty = addKeyword([3]).addAnswer('Enviar consignacion');

const flowNequi = addKeyword([2]).addAnswer('Enviar consignacion');

const flowBancolombia = addKeyword([1]).addAnswer('Envia los datos de la consignacion',
        { capture: true },
        async (ctx, {provider}) => {
            const message = ctx.body;

            // Actualizar el archivo de Excel
            //await updateExcel({ message });

            await provider.sendText('573053012883@s.whatsapp.net', ctx.body)
            
            //Envia el mensaje recibodo a otro numero de whatsapp
        });

const flowEscoge = addKeyword('%&%#escpge').addAnswer([
    'Escoge la opcion:',
    ' 1️⃣ Para Bancolombia',
    ' 2️⃣ Para Nequi, Grupo Aval, Gana o Facturas',
    ' 3️⃣ Efecty',
    ' 4️⃣ Otros '
],
    null,
    null,
    [flowBancolombia, flowNequi, flowEfecty, flowOtros]
)

const flowPrincipal = addKeyword(EVENTS.WELCOME).addAnswer('Hola bienvenido a mi chatbot').addAction(async(ctx,{ gotoFlow }) => {
    //Aqui con el ctx.from verificamos nos esten hablando del numero de roman o de jenny
    const allowedNumbers = ['573216421174', '573147348704'];
    const fromNumber = ctx.from;
    const fromNombre = ctx.pushName;
    
    console.log(fromNombre)
    if (allowedNumbers.includes(fromNumber)||fromNombre == 'Prueba1') {
        // Procede con la lógica que desees si el mensaje viene de uno de los números permitidos
        // Por ejemplo, enviar consignación
        console.log('Mensaje recibido de un número permitido:', fromNumber);
        gotoFlow(flowEscoge)
    }
})

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowEscoge])//quito el "flowPrincipal" para crear un menu 
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main();
