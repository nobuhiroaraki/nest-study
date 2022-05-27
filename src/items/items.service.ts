import { User } from './../entities/user.entity';
import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '../entities/item.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemStatus } from './item-status.enum';

@Injectable()
export class ItemsService {
  constructor(private readonly ItemRepository: ItemRepository) {}
  private items: Item[] = [];
  async findAll(): Promise<Item[]> {
    return await this.ItemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.ItemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.ItemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.ItemRepository.save(item);
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    await this.ItemRepository.delete({ id });
  }
}
