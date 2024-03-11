const axios = require('axios');

const clientId = '45b05825-8237-487a-9046-aef6def04d82';
const clientSecret = 'N~X8Q~OjiX9YpnFFVdTzXIchYFPfwI3ynWJl0bp_';
const tenantId = '045411cf-c1bd-4e28-b032-abb81c608d2d'; // Reemplaza esto con tu ID de directorio de Azure AD

const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

const params = new URLSearchParams();
params.append('client_id', clientId);
params.append('scope', 'https://graph.microsoft.com/.default');
params.append('client_secret', clientSecret);
params.append('grant_type', 'client_credentials');

axios.post(url, params, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
    .then(response => {
        console.log('Token de acceso obtenido:', response.data.access_token);
    })
    .catch(error => {
        console.error('Error al obtener el token de acceso:', error);
    });
