import { HttpStatus } from '@nestjs/common';

export class ApiResponse {
  static success<T>(
    data?: T,
    message = 'Success',
    status: number = HttpStatus.OK,
  ) {
    return {
      status,
      message,
      ...(data !== undefined && { data }),
    };
  }

  static error(
    message = 'Error',
    status: number = HttpStatus.BAD_REQUEST,
    errors?: any,
  ) {
    return {
      status,
      message,
      ...(errors !== undefined && { errors }),
    };
  }
}
