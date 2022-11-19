import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express'

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaClientFilterFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientUnknownRequestError, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const message = exception.message

      switch(exception.stack){
           case "P2002": 
              response.status(HttpStatus.CONFLICT).json({
                 statusCode: HttpStatus.CONFLICT,
                 message: message
              })
              break;
           default:
              super.catch(exception, host)    
      }
  }
}