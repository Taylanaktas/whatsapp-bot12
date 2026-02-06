const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot çalışıyor 🚀');
});

client.on('message', async msg => {
    if (msg.body === '!gif') {
        try {
            const res = await axios.get('https://api.giphy.com/v1/gifs/random', {
                params: {
                    api_key: process.env.GIPHY_API_KEY,
                    tag: 'funny'
                }
            });
            const gifUrl = res.data.data.images.original.url;
            msg.reply(gifUrl);
        } catch (err) {
            msg.reply('GIF alınamadı 😢');
        }
    }

    if (msg.body === '!şarkı') {
        msg.reply('🎵 Rastgele şarkı: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC');
    }

    if (msg.body === '!sticker') {
        msg.reply('Burada sticker göndermek için ek kod yazılacak.');
    }
});

client.initialize();
