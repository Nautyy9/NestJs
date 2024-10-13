import { Injectable, Scope } from '@nestjs/common';

// @Injectable({
//   scope: Scope.TRANSIENT,
// })
@Injectable()
export class DevConfService {
  DBHOST = 'localhost';
  getDBHost() {
    return `${this.DBHOST}`;
  }
}
