import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import createDuplicationErrors from './createDuplicationErrors';

@Catch(MongoServerError)
export class ValidationErrorFilter implements RpcExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if ((response.code = 11000)) {
      return response
        .status(400)
        .json({
          statusCode: 400,
          error: 'Bad Request',
          errors: createDuplicationErrors(exception.keyValue),
        });
    }

    return response.status(400).json({ error: 'Bad Request' });
  }
}
