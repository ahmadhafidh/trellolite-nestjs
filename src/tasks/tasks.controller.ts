import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiResponse } from '../common/helpers/api-response.helper';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/projects/:projectUuid/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  async index(
    @CurrentUser() user,
    @Param('projectUuid') projectUuid: string,
  ) {
    const data = await this.service.index(user.id, projectUuid);
    return ApiResponse.success(data, 'List tasks');
  }

  @Post()
  async store(
    @CurrentUser() user,
    @Param('projectUuid') projectUuid: string,
    @Body() dto: CreateTaskDto,
  ) {
    const data = await this.service.store(user.id, projectUuid, dto);
    return ApiResponse.success(data, 'Task created', 201);
  }

  @Get(':taskUuid')
  async show(
    @CurrentUser() user,
    @Param('projectUuid') projectUuid: string,
    @Param('taskUuid') taskUuid: string,
  ) {
    const data = await this.service.show(user.id, projectUuid, taskUuid);
    return ApiResponse.success(data, 'Detail task');
  }

  @Put(':taskUuid')
  async update(
    @CurrentUser() user,
    @Param('projectUuid') projectUuid: string,
    @Param('taskUuid') taskUuid: string,
    @Body() dto: UpdateTaskDto,
  ) {
    const data = await this.service.update(
      user.id,
      projectUuid,
      taskUuid,
      dto,
    );
    return ApiResponse.success(data, 'Task updated');
  }

  @Delete(':taskUuid')
  async destroy(
    @CurrentUser() user,
    @Param('projectUuid') projectUuid: string,
    @Param('taskUuid') taskUuid: string,
  ) {
    await this.service.destroy(user.id, projectUuid, taskUuid);
    return ApiResponse.success(null, 'Task deleted');
  }
}