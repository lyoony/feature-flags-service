import {PrismaClient} from "../generated/prisma";
import { Pool } from "pg";
import {PrismaPg} from "@prisma/adapter-pg";

const pool: Pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;