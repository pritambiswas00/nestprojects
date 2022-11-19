import { Module, CacheModule, CacheManagerOptions, CacheModuleOptions } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/config';
import { configValidation } from './config/validation';

@Module({
  imports: [CacheModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory:((config:ConfigService)=>{
           const options:CacheModuleOptions={}
           return options; 
      })
  }),
  ConfigModule.forRoot({
     isGlobal: true,
     envFilePath: "../.env",
     load:[configuration],
     validationSchema: configValidation,
     cache: false

  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
