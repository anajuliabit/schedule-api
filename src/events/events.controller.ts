import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { EventModel } from './event.model';
import { DeleteResult } from 'typeorm';

@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Post()
  async create(@Body() event: EventModel): Promise<Event> {
    return this.service.create(event);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    event: EventModel,
  ): Promise<Event | null> {
    console.log(event);
    return this.service.update(id, event);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Event> {
    return this.service.findOne(id);
  }
}
