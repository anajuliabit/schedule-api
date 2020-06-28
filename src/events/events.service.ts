import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(EventsService.name);

  findAll(): Promise<Event[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Event> {
    return this.repository.findOne(id);
  }

  async create(event: EventModel): Promise<Event> {
    this.logger.log('saving event');
    return await this.repository.save(event);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.logger.log('deleting event');
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
    this.logger.log('updating event');
    await this.repository.update(id, newValue);
    return await this.repository.findOne(id);
  }
}
