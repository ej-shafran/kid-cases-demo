import { Controller, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("new-kid")
  getNewKid(@Query("name") name: string) {
    this.appService.createOne(name);
  }

  @Get("kid-details")
  getKidDetails(@Query("id", ParseIntPipe) id: number) {
    return this.appService.readOne(id);
  }
}
