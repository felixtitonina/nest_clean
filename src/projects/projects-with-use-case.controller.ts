import { CreatedProjectUseCase } from './use-cases/create-project.use-case';
import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';

@Controller('projects')
export class ProjectsWithUseCaseController {
  @Inject(CreatedProjectUseCase)
  private readonly createdProjectUseCase: CreatedProjectUseCase;

  @Inject(FindAllProjectsUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase;

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;

  // constructor(
  // private readonly createdProjectUseCase: CreatedProjectUseCase,
  // private readonly findAllProjectsUseCase: FindAllProjectsUseCase,
  // private readonly startProjectUseCase: StartProjectUseCase,
  // ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createdProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(id);
  // }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(id);
  // }
}
