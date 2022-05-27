import { User } from './../entities/user.entity';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.itemsService.delete(id, user);
  }
}
