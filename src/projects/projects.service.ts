import { Project, ProjectStatus } from './entities/project.entity';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private ProjectRepo: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    // DTO = data transfer object
    const project = new Project(createProjectDto);
    if (createProjectDto.started_at) {
      project.status = ProjectStatus.Active;
    }
    return this.ProjectRepo.save(project);
  }

  findAll() {
    return this.ProjectRepo.find();
  }

  findOne(id: string) {
    return this.ProjectRepo.findOneOrFail({ where: { id } });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
