import 'dotenv/config';
import { messageHandler } from './src/handlers/business/handler';
import { bot } from './src/bot';

bot.on('message', async (ctx) => {
    await messageHandler(ctx, ctx.message);
});


bot.start();
