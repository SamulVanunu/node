const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'VadTurk.aternos.me:58711', // Sunucu IP adresin
        username: 'VadiBekcisi',      // Botun oyundaki adı
        version: '1.21.1'             // Sunucu sürümün
    });

    bot.on('login', () => {
        console.log('Bot sunucuya giriş yaptı!');
    });

    // Botun AFK atılmaması için 30 saniyede bir zıplamasını sağlar
    setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);

    bot.on('kicked', (reason) => {
        console.log('Bot atıldı, tekrar bağlanıyor...', reason);
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('Hata oluştu:', err);
        setTimeout(createBot, 5000);
    });
}

createBot();
