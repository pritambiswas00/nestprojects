import { Body, Controller, Get, Param, Post, UseFilters, HttpException, UseInterceptors, CacheInterceptor, CacheTTL } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from "@prisma/client"
import { PrismaClientFilterFilter } from './prisma-client-filter.filter';

@Controller()
@UseFilters(PrismaClientFilterFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('email/:email')
  async getUser(@Param('email') email:string):Promise<User>{
      console.log("Going to the DB")
      return this.appService.user({ email: email })
  }
  @Post("create")
  async createUser(@Body() user: { email:string, name: string }):Promise<User>{
      try{
        return this.appService.createUser({ email: user.email, name: user.name })
      }catch(error){
          throw new HttpException("HEHEHEHEEHEHE", 500)
      }
  }
}
