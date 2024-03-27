const flowSecundario = addKeyword(['']).addAnswer(['📄 Mandame los bonos'])

const flowBonosExistente = addKeyword(['1']).addAnswer(
    [
        '📄 Valor de los bonos',
        'Enviame los bonos',
    ]
)
const flowBonosNuevo = addKeyword(['2']).addAnswer(
    [
        'Enviame porfavor:',
        '👉 Foto o copia de la cedula.',
        '👉 Numero de cuenta para enviarte el dinero.',
        '👉 Nombre de empresa.'
    ]
).addAnswer('Ten en cuenta que se consignara al dia siguiente despues de enviar los bonos y el valor del cambio es del 5% del valor del bono.')

const flowBonos = addKeyword(['1']).addAnswer(
    [
        '👉 1️⃣ si ya has cambiado bonos por este medio ',
        '👉 2️⃣ si es primera vez en cambiar bonos'
    ],
    null,
    null,
    [flowBonosExistente, flowBonosNuevo]
)

const flowPedido = addKeyword(['3'])
    .addAnswer(['Abre el siguiente link para hacer el pedido y ver los precios',
        '🌐 https://acortar.link/S91H7Z'
    ])
    .addAnswer('O tambien puedes pedir lo que necesites por este medio',
        null,
        null,
        [flowSecundario]
    )

const flowPrecios = addKeyword(['2'])
    .addAnswer('Abre el siguiente link para ver la lista de precios')
    .addAnswer('🌐 https://acortar.link/S91H7Z',
        null,
        null,
        [flowSecundario]
    )

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'Te comparto las siguientes opciones ',
            '👉 1️⃣ Para cambio de bonos',
            '👉 2️⃣ Para ver lista de precios',
            '👉 3️⃣ Para hacer tu pedido',
        ],
        null,
        null,
        [flowBonos, flowPrecios, flowPedido, flowDiscord]
    )

    const flowRoman = addKeyword(['9']).addAnswer('Bienvenido').addAction(async (ctx, { gotoFlow }) => {

        //Aqui con el ctx.from verificamos nos esten hablando del numero de roman o de jenny
        const allowedNumbers = ['573216421174', '573147348704', '573053012883'];
        const fromNumber = ctx.from;

        if (allowedNumbers.includes(fromNumber)) {
            // Procede con la lógica que desees si el mensaje viene de uno de los números permitidos
            // Por ejemplo, enviar consignación
            console.log('Mensaje recibido de un número permitido:', fromNumber);
            gotoFlow(flowEscoge)
        }
    })