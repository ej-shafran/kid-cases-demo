import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";
import * as fs from "fs/promises";
import * as path from "path";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  try {
    await fs.access(path.join(__dirname, "../.env"));
  } catch (error) {
    const logger = new Logger();
    logger.error("No \x1b[33m.env\x1b[0m file found.");
    throw new Error(
      `Please create a \x1b[33m.env\x1b[0m file in the project root, and add the following variables:
\tDB_HOST
\tDB_PORT
\tDB_DATABASE
\tDB_USERNAME
\tDB_PASSWORD`
    );
  }

  config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
