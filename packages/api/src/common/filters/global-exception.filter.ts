import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Check if the exception is an instance of HttpException
    if (exception instanceof HttpException) {
      // Extract the status code and message from the HttpException
      status = exception.getStatus();
      message = exception.message;

      // Check if the exception is an instance of a normal javascript error
    } else if (exception instanceof Error) {
      // Extract the message from the error object
      message = exception.message;
    }

    // Send the response to the client, including the status code and message while using the status as the status code
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
