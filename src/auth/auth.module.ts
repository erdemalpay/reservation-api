import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

const jwtConfig = config.get('jwt');

const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

const mongooseModule = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: async (connection: Connection) => {
      const schema = UserSchema;
      const AutoIncrement = AutoIncrementFactory(connection);
      schema.plugin(AutoIncrement, {
        id: 'userId',
        inc_field: 'id',
      });
      return schema;
    },
    inject: [getConnectionToken()],
  },
]);

@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: '999 years',
      },
    }),
    mongooseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository],
  exports: [JwtStrategy, passportModule, mongooseModule],
})
export class AuthModule {}
