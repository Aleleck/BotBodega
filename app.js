const { createBot, createProvider, createFlow, addKeyword} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')



const flowNumeroErrado = addKeyword('error').addAnswer('No se permite esta transaccion para este contacto')

const flowOtros = addKeyword([4])
    .addAnswer('Enviar consignacion')

const flowEfecty = addKeyword([3])
    .addAnswer('Enviar consignacion')

const flowNequi = addKeyword([2])
    .addAnswer('Enviar consignacion')

const flowBancolombia = addKeyword([1])
    .addAnswer('Envia los datos de la consignacion',
    {capture: true},
    async (ctx, { provider }) => {
        // Obtener el número de teléfono al que quieres enviar el mensaje
        const phoneNumber = '573216996970'; // Coloca aquí el número de teléfono deseado

        // Mensaje que quieres enviar
        const message = "hola"

        try {
            // Enviar el mensaje utilizando el proveedor BaileysProvider
            await provider.sendMessage(phoneNumber, message);
            
            // Confirmar que el mensaje se envió correctamente
            console.log('Mensaje enviado con éxito');
        } catch (error) {
            // Manejar cualquier error que ocurra durante el envío del mensaje
            console.error('Error al enviar el mensaje:', error);
        }
    });
const flowEscoge = addKeyword('escpge').addAnswer([
        'Escoge la opcion:',
        '👉 1️⃣ Para Bancolombia',
        '👉 2️⃣ Para Nequi, Grupo Aval, Gana o Facturas',
        '👉 3️⃣ Efecty',
        '👉 4️⃣ Otros '
    ],
        null,
        null,
        [flowBancolombia, flowNequi, flowEfecty, flowOtros]
    )

const flowRoman = addKeyword(['9']).addAnswer('Bienvenido')
    .addAction(async (ctx,{gotoFlow}) => {
        
        //Aqui con el ctx.from verificamos nos esten hablando del numero de roman o de jenny
        const allowedNumbers = ['573216421174', '573147348704','573053012883'];
        const fromNumber = ctx.from;

        if (allowedNumbers.includes(fromNumber)) {
            // Procede con la lógica que desees si el mensaje viene de uno de los números permitidos
            // Por ejemplo, enviar consignación
            console.log('Mensaje recibido de un número permitido:', fromNumber);
            gotoFlow(flowEscoge)
        }
    })

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowRoman,flowEscoge])//quito el "flowPrincipal" para crear un menu 
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()