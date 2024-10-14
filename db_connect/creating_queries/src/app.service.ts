import { Inject, Injectable, Scope } from '@nestjs/common';
import { DevConfService } from './utils/providers/service_provider';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class AppService {
  constructor(
    private devConfService: DevConfService,
    @Inject('CONFIG')
    private config: { port: string },
  ) {}

  getHello(): string {
    return `Hello World! with message from injectable class ==> ${this.devConfService.getDBHost()}:${this.config.port}`;
  }
}
