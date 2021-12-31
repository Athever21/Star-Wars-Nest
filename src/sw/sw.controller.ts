import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { SwServices } from './sw.services';
import { Request } from 'express';
import { DataInterceptor } from './dataInterceptor';

@Controller()
@UseInterceptors(DataInterceptor)
export class SwController {
  constructor(private readonly swServices: SwServices) {}

  @Get('/planets*')
  getPlanets(@Req() req: Request) {
    return this.swServices.getResource(req);
  }

  @Get('/spaceships*')
  getSpaceships(@Req() req: Request) {
    return this.swServices.getResource(req);
  }

  @Get('/vehicles*')
  getVehicles(@Req() req: Request) {
    return this.swServices.getResource(req);
  }

  @Get('/people*')
  getPeople(@Req() req: Request) {
    return this.swServices.getResource(req);
  }

  @Get('/films*')
  getFilms(@Req() req: Request) {
    return this.swServices.getResource(req);
  }

  @Get('/planets*')
  getSpecies(@Req() req: Request) {
    return this.swServices.getResource(req);
  }
}
