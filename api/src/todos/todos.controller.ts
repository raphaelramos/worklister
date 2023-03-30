import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { TodosService } from './todos.service';
import { TodosGuard } from './todos.guard';

@Controller('todos')
@UseGuards(TodosGuard)
@UseGuards(JwtAuthGuard) // keep this lowest so that it gets executed first!
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@CurrentUser() user: UserModel, @Body() todo: Prisma.TodoCreateInput) {
    return this.todosService.create(user.id, todo);
  }

  @Get()
  findAll(@CurrentUser() user: UserModel) {
    return this.todosService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: Prisma.TodoUpdateInput) {
    return this.todosService.update(+id, todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
