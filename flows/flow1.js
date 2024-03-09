const flowEscoge = addKeyword('%&%#escpge').addAnswer([
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


const flowNumeroErrado = addKeyword('error').addAnswer('No se permite esta transaccion para este contacto');

const flowOtros = addKeyword([4]).addAnswer('Enviar consignacion');

const flowEfecty = addKeyword([3]).addAnswer('Enviar consignacion');

const flowNequi = addKeyword([2]).addAnswer('Enviar consignacion');

const flowBancolombia = addKeyword([1]).addAnswer('Envia los datos de la consignacion',
        { capture: true },
        async (ctx, {provider}) => {
            await provider.sendText('573053012883@s.whatsapp.net', ctx.body)
            //Envia el mensaje recibodo a otro numero de whatsapp
        });

