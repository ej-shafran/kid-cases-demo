import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Kid } from "./entities/kid.entity";

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(Kid)
    private readonly kidRepo: Repository<Kid>
  ) { }

  async createOne(name: string) {
    const newKid = await this.kidRepo.manager.transaction(async (em) => {
      const similarKids = await em.find(Kid, {
        where: {
          name: Like(`%${name.split("").join("%")}%`),
        },
        relations: {
          similarKids: true,
        },
      });

      this.logger.debug(similarKids);

      const newKid = await em.save(Kid, {
        name,
        similarKids,
      });

      await em.save(
        Kid,
        similarKids.map((kid) => ({
          ...kid,
          similarKids: [...kid.similarKids, newKid],
        }))
      );

      return newKid;
    });

    this.logger.log(newKid);

    return newKid;
  }

  readOne(id: number) {
    return this.kidRepo.findOne({
      where: { id },
      relations: {
        similarKids: true,
      },
    });
  }
}
