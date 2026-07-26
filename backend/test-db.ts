import { PrismaClient } from "@prisma/client";

console.log(process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log("Connected");
}

main().catch(console.error);