import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [],
  providers: [EventsGateway],
  controllers: [],
})
export class EventModule {}
