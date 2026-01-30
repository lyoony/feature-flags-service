import 'dotenv/config';
import { env } from './config/env';
import { app } from './app';
import prisma from "./db";

const PORT = env.PORT;

const start = async () => {
    try {
        await prisma.$connect();
        console.log('база данных подключена успешно');

        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        })
    } catch(err) {
        console.log(err);
    }
};
start();

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
})