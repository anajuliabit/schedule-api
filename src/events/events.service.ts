import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository, Transaction, DeleteResult } from 'typeorm';
import { EventModel } from './event.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Event> {
    // @TODO handle exception
    return this.repository.findOne(id);
  }

  async create(event: EventModel): Promise<Event> {
    return await this.repository.save(event);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async update(id: number, newValue: EventModel): Promise<Event | null> {
    const event = await this.repository.findOneOrFail(id);
    if (!event.id) {
      // @TODO handle exeception
      console.log("Event doesn't exist");
    }
    await this.repository.update(id, newValue);
    return await this.repository.findOne(id);
  }
}
