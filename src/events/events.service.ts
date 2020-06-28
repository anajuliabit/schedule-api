import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository, DeleteResult } from 'typeorm';
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
      throw new HttpException(
        `Event ${id} doesn't exists`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.repository.update(id, newValue);
    return await this.repository.findOne(id);
  }
}
