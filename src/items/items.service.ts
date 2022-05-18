import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ItemsService {
  constructor(private readonly ItemRepository: ItemRepository) {}
  private items: Item[] = [];
  async findAll(): Promise<Item[]> {
    return await this.ItemRepository.find();
  }

  findById(id: string): Item {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.ItemRepository.createItem(createItemDto);
  }

  // updateStatus(id: string): Item {
  //   const item = this.findById(id);
  //   item.status = ItemStatus.SOLD_OUT;
  //   return item;
  // }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
