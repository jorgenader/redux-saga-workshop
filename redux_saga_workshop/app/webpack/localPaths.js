/* eslint-disable */
const LOCAL_IP = "0.0.0.0";
const HOST = process.env.HOST_ADDR || LOCAL_IP || 'localhost';
const PUBLIC_HOST = process.env.HOST_ADDR || 'localhost';
const PORT = parseInt(process.env.PORT, 10) || 3000;
const PUBLIC_PATH = `http://${PUBLIC_HOST}:${PORT}`;


module.exports = {
    HOST,
    PORT,
    PUBLIC_PATH,
};
