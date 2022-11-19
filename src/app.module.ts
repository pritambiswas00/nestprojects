import { Module, CacheModule, CacheManagerOptions, CacheModuleOptions } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/config';
import { configValidation } from './config/validation';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CacheModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory:((config:ConfigService)=>{
           const options:CacheModuleOptions={
             isGlobal: true
           }
           return options; 
      })
  }),
  ConfigModule.forRoot({
     isGlobal: true,
     envFilePath: `${process.cwd()}.env`,
     load:[configuration],
     validationSchema: configValidation,
     cache: false
  }),
  PrismaModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
