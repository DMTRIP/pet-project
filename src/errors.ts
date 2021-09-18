import { ApolloError } from 'apollo-server-core';

enum ErrorCodes {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  USER_INPUT_ERROR = 'USER_INPUT_ERROR',
  ILLEGAL_OPERATION = 'ILLEGAL_OPERATION',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
}

export class InternalServerError extends ApolloError {
  constructor(message: string) {
    super(message, ErrorCodes.INTERNAL_SERVER_ERROR);
  }
}

export class UserInputError extends ApolloError {
  constructor(message: string) {
    super(message, ErrorCodes.USER_INPUT_ERROR);
  }
}

export class IllegalOperationError extends ApolloError {
  constructor(message: string) {
    super(message, ErrorCodes.ILLEGAL_OPERATION);
  }
}

export class UnauthorizedError extends ApolloError {
  constructor() {
    super(
      'The credentials did not match. Please check and try again',
      ErrorCodes.UNAUTHORIZED,
    );
  }
}

export class ForbiddenError extends ApolloError {
  constructor() {
    super(
      'You are not currently authorized to perform this action',
      ErrorCodes.FORBIDDEN,
    );
  }
}

export class DocumentNotFoundError extends ApolloError {
  constructor(documentName: string, id: ID) {
    super(
      `Document ${documentName} with id ${id} can not be found`,
      ErrorCodes.DOCUMENT_NOT_FOUND,
    );
  }
}
