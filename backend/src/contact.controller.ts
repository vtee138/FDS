import { Body, Controller, NotImplementedException, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

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
  @Post()
  create(@Body() _data: CreateContactDto) {
    throw new NotImplementedException(
      'Contact-message storage is not enabled in the two-table database design.',
    );
  }
}
