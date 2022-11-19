import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User, Prisma } from "@prisma/client";

@Injectable()
export class AppService {
  constructor(private readonly prismaORM:PrismaService){}
   


  async createUser(data:Prisma.UserCreateInput):Promise<User>{
       return this.prismaORM.user.create({
           data
       })
  }
  async user(userUniqueEmail:Prisma.UserWhereUniqueInput ):Promise<User|null>{
      return this.prismaORM.user.findUnique({
          where: userUniqueEmail 
      })
  }
}
