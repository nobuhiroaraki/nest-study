import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '../entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.ItemRepository.createItem(createItemDto);
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.ItemRepository.save(item);
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.ItemRepository.delete({ id });
  }
}
