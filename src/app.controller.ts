import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {createConnection, Connection, getConnection} from "typeorm";
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  intro() {}
}
