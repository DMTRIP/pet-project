import { MongoError } from 'mongodb';
import { UserInputError } from '../errors';
import { GraphQLError } from 'graphql';

export function formatError(err: GraphQLError) {
  if (process.env.NODE_ENV === 'development') return err;

  if (err.originalError instanceof MongoError) {
    // handles duplicated key value constraint error of mongodb
    if (err.originalError.code === 11000) {
      // err.message - E11000 duplicate key error collection: pet_project.users index: email_1 dup key: { email: "maidn1@gmail.com" }
      const collection = err.message
        .split('.')[1]
        .slice(0, err.message.split('.')[1].indexOf('index') - 1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const key = Object.keys(err.originalError.keyValue)[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const value = err.originalError.keyValue[key];
      throw new UserInputError(
        `${collection} with such ${key} value ${value} already exists`,
      );
    }
  }

  return err;
}
