const {addKeyword} = require('@bot-whatsapp/bot')

const flowOtros = addKeyword([4])
    .addAnswer('Enviar consignacion')

const flowEfecty = addKeyword([3])
    .addAnswer('Enviar consignacion')

const flowNequi = addKeyword([2])
    .addAnswer('Enviar consignacion')

const flowBancolombia = addKeyword([1])
    .addAnswer('Enviar consignacion')