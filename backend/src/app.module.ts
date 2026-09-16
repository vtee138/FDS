import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { ContactController } from './contact.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ClubController, ContactController],
  providers: [ClubService, PrismaService],
})
export class AppModule {}
