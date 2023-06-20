import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Kid } from "./entities/kid.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: "mysql",
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          database: process.env.DB_DATABASE,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          logging: true,
          synchronize: true,
          entities: [Kid],
        };
      },
    }),
    TypeOrmModule.forFeature([Kid]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
