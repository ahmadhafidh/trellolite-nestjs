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
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiResponse } from '../common/helpers/api-response.helper';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('api/projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  async index(@CurrentUser() user) {
    const data = await this.service.index(user.id);
    return ApiResponse.success(data, 'List projects');
  }

  @Post()
  async store(
    @CurrentUser() user,
    @Body() dto: CreateProjectDto,
  ) {
    const data = await this.service.store(user.id, dto);
    return ApiResponse.success(data, 'Project created', 201);
  }

  @Get(':uuid')
  async show(
    @CurrentUser() user,
    @Param('uuid') uuid: string,
  ) {
    const data = await this.service.show(user.id, uuid);
    return ApiResponse.success(data, 'Detail project');
  }

  @Put(':uuid')
  async update(
    @CurrentUser() user,
    @Param('uuid') uuid: string,
    @Body() dto: UpdateProjectDto,
  ) {
    const data = await this.service.update(user.id, uuid, dto);
    return ApiResponse.success(data, 'Project updated');
  }

  @Delete(':uuid')
  async destroy(
    @CurrentUser() user,
    @Param('uuid') uuid: string,
  ) {
    await this.service.destroy(user.id, uuid);
    return ApiResponse.success(null, 'Project deleted');
  }
}