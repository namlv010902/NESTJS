import { HttpException, HttpStatus } from '@nestjs/common';

export function handleError(error: Error) {
  if (error instanceof HttpException) {
    throw error;
  } else {
    throw new HttpException(
      'Internal server error' + error.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export function paginateResults(
  page: number,
  perPage: number,
  totalItems: number,
) {
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = page;

  return {
    perPage,
    totalPages,
    currentPage,
    totalItems,
  };
}
