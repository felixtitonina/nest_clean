import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class FindAllProjectsUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository, // port
  ) {}
  execute() {
    return this.projectRepo.findAll();
  }

  // metodos auxiliares para o executes
}
