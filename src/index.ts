import { Client, LocalAuth } from "whatsapp-web.js"; 
import qrcode from 'qrcode-terminal';

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
        qrcode.generate(qr, {small : true});
});

client.on('ready', ()=> {
    console.log('Client Ready');
});

client.on('message', async (message) => {
    if(
        (message.body.startsWith('sticker') || message.body.startsWith('/sticker' || message.body.toLowerCase () === 'sticker')) && message.type === 'image'
    )
    {
        let media;
        try {
             media = await message.downloadMedia();
        } catch (error) {
            return message.reply('Gagal mengunduh gambar');
        }

        client.sendMessage(message.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor: '7kosong',
            stickerName: 'Auah'
        });
    }
});



client.initialize();