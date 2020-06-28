import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { EventModel } from './event.model';
import { DeleteResult } from 'typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @UseGuards(JwtStrategy)
  @Post()
  async create(@Body() event: EventModel): Promise<Event> {
    return this.service.create(event);
  }

  @UseGuards(JwtStrategy)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }

  @UseGuards(JwtStrategy)
  @Put(':id')
  async update(
    @Param('id') id: number,
    event: EventModel,
  ): Promise<Event | null> {
    return this.service.update(id, event);
  }

  @UseGuards(JwtStrategy)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Event> {
    return this.service.findOne(id);
  }
}
