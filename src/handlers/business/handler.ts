import { InputFile, Message, Update } from 'grammy/types';
import {Context, InputMediaBuilder} from 'grammy';
import {presentCards} from "../../modules/cards/presentCards";
import {selectSomeCards} from "../../modules/cards/selectSomeCards";
import * as fs from "fs/promises";
import path from "path";


export const messageHandler = async (ctx: Context, message: Message & Update.NonChannel) => {
    const isStartingWithCommand = message.text?.startsWith('/');
    if (!isStartingWithCommand || !message.text) {
        return;
    }
    const command = message.text.slice(1).split(/\s+/, 1)[0];
    if (!command.length) {
        return;
    }

    switch (command.trim().toLowerCase()) {
        case 'start':
            await ctx.reply(
                '<b>Приветствую в чарующем мире таро! 🔮💫</b>\n\n' +
                'Хотите заглянуть за завесу судьбы и узнать, что звезды приготовили вам? Мечтаете приоткрыть тайны прошлого и разобраться в настоящем?\n' +
                'Я – ваш проводник в мир таро, таролог Хелен, и я всегда готова разложить карты и поведать вам их мудрый язык. ✨⭐️\n\n' +
                '<b>Задайте мне любой вопрос:</b>\n' +
                '<i>"Что меня ждет в любви на следующей неделе?"</i>\n' +
                '<i>"Какие у меня шансы на успех в этом проекте?"</i>\n' +
                '<i>"Что обо мне думают близкие?"</i>\n\n' +
                'Я с радостью помогу вам:\n' +
                'Разобраться в себе и своих чувствах. ❤️\n' +
                'Принять верное решение. ✅\n' +
                'Найти выход из сложной ситуации. 🛣️\n' +
                'Сделать шаг к исполнению мечты. 👣\n' +
                'Готовы к увлекательному путешествию в мир таро? 🎆\n\n' +
                'Используйте /taro, чтобы получить расклад',
                { parse_mode: 'HTML' },
            );
            break;

        case 'taro':
            const cards = selectSomeCards(3)
            const images = await Promise.all(cards.filter(card => card.image !== undefined).map(async (card) => {
                return InputMediaBuilder.photo(
                    new InputFile(
                        new Uint8Array(
                            await fs.readFile(
                                path.resolve('.', 'assets', card.image as string)
                            )
                        )
                    )
                )
            }))
            await ctx.replyWithMediaGroup(images);
            await ctx.reply(
                presentCards(cards),
                { parse_mode: 'HTML' },
            );
            break;

        default:
            await ctx.reply(
                'Не могу понять команду, используйте /taro с вопросом, или попробуйте /start для начала работы с ботом',
            );
            break;

    }
};
