// 6648887576:AAHecO1vpWyqpOD8WKDkXMBRpqwRS3Il7Qg
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');

const token = '6648887576:AAHecO1vpWyqpOD8WKDkXMBRpqwRS3Il7Qg';
const url = 'https://rozklad.ztu.edu.ua/schedule/group/%D0%92%D0%A2-22-1';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', msg => {
    const { id: id, first_name: userName } = msg.chat;

    if (/Привет/gi.test(msg.text)) {
        bot.sendMessage(id, `Привет ${userName}`);

        axios.get(url)
            .then((response) => {
                // HTML содержимое страницы доступно в response.data
                const html = response.data;
                const $ = cheerio.load(html);
                const table = $('table.schedule tbody tr th');
                bot.sendMessage(id, `Привет`);
                console.log(table);
                // table[0].find('tr').each((index, row) => {
                //     const columns = $(row).find('td');
                //     const name = columns.eq(0).text();
                //     const age = parseInt(columns.eq(1).text(), 10);

                //     console.log(`Имя: ${name}, Возраст: ${age}`);
                // });
            })
            .catch((error) => {
                bot.sendMessage(id, `error`);
                console.error('Произошла ошибка при получении страницы:', error);
            });

    }
});