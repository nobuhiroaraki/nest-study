import { AuthModule } from './../auth/auth.module';
import { ItemRepository } from './item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository]), AuthModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
