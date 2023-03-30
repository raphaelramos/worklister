import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { TodosService } from './todos.service';

@Injectable()
export abstract class TodosGuard implements CanActivate {
  constructor(private readonly todosService: TodosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { params, user } = req;

    if (params?.id == null) {
      return true;
    }

    const todo = await this.todosService.findOne(+params?.id);

    return todo.userId === user.id;
  }
}
