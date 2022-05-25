import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    //デフォルトの認証方法をjwtに設定
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'seceretKey123',
      signOptions: {
        expiresIn: 3600, //JWTの有効期限(秒)
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
