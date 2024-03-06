const {addKeyword} = require('@bot-whatsapp/bot')

const flowOtros = addKeyword([4])
    .addAnswer('Enviar consignacion')

const flowEfecty = addKeyword([3])
    .addAnswer('Enviar consignacion')

const flowNequi = addKeyword([2])
    .addAnswer('Enviar consignacion')

const flowBancolombia = addKeyword([1])
    .addAnswer('Enviar consignacion')

const flowEscoge = addKeyword('escpge')
    .addAnswer([
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