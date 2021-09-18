import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { UserModule } from '../user/user.module';
import getRootDirectoryPath from '../../helpers/getRootDirectoryPath';
import configuration from '../../configuration';
import { DatabaseModule } from '../database/database.module';
import { formatError } from '../../helpers/formatApolloGraphqlError';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: path.join(getRootDirectoryPath(), '.env'),
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(getRootDirectoryPath(), 'src/schema.gql'),
      playground: true,
      formatError,
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
