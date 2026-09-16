import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PrismaService } from './prisma.service';

class CreateContactDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(10)
  message!: string;
}

@Controller('contact')
export class ContactController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  create(@Body() data: CreateContactDto) {
    return this.prisma.contactMessage.create({ data });
  }
}
