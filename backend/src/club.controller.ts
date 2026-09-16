import { Controller, Get } from '@nestjs/common';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  getOverview() {
    return this.clubService.getOverview();
  }

  @Get('messages')
  getMessages() {
    return this.clubService.getMessages();
  }
}
