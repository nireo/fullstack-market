import { HttpException } from './HttpException';

export class NotAuthorized extends HttpException {
  constructor() {
    super(403, "You're not authorized");
  }
}
