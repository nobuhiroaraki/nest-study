import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
