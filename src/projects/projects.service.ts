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
    private projectRepo: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    // DTO = data transfer object
    const project = new Project(createProjectDto);
    if (createProjectDto.started_at) {
      project.status = ProjectStatus.Active;
    }
    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: string) {
    return this.projectRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneOrFail({
      where: { id },
    });
    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description && (project.description = updateProjectDto.description);

    // started_at
    if (updateProjectDto.started_at) {
      if (project.status === ProjectStatus.Active) {
        throw new Error('Projeto já iniciado.');
      }
      if (project.status == ProjectStatus.Completed) {
        throw new Error('Projeto já completo.');
      }

      if (project.status == ProjectStatus.Cancelled) {
        throw new Error('Projeto já cancelado.');
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Active;
    }

    // cancelled_at
    if (updateProjectDto.cancelled_at) {
      if (project.status == ProjectStatus.Completed) {
        throw new Error('Projeto não pode ser cancelado.');
      }

      if (project.status == ProjectStatus.Cancelled) {
        throw new Error('Projeto já está cancelado.');
      }

      if (updateProjectDto.cancelled_at < project.started_at) {
        throw new Error('Projeto não pode ser cancelado antes de ser inicializada.');
      }

      project.cancelled_at = updateProjectDto.cancelled_at;
      project.status = ProjectStatus.Cancelled;
    }
    // finalizar projeto
    if (updateProjectDto.finished_at) {
      if (project.status == ProjectStatus.Completed) {
        throw new Error('Projeto não pode ser finalizado.');
      }

      if (project.status == ProjectStatus.Cancelled) {
        throw new Error('Projeto cancelado não pode ser finalizado.');
      }

      if (updateProjectDto.finished_at < project.started_at) {
        throw new Error('Projeto não pode ser finalizado antes de ser inicializada.');
      }

      project.finished_at = updateProjectDto.finished_at;
      project.status = ProjectStatus.Completed;
    }
    this.projectRepo.save(project);
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}

// 1 04 17
