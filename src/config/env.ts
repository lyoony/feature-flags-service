import 'dotenv/config';

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} not found`);
    }
    return value;
}

export const env = {
    PORT: Number(getEnv("PORT")),
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    DATABASE_URL: process.env.DATABASE_URL,
};