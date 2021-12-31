import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GetDataFromSwApi } from './getDataFromSwApi';
import { Cache } from "cache-manager";

@Injectable()
export class SwServices {
  constructor(
    private readonly getDataFromSwApi: GetDataFromSwApi,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getResource(req: Request) {
    const url = req.originalUrl;

    const cached: string | null = await this.cacheManager.get(url);

    if (cached) {
      return {data: JSON.parse(cached) };
    }

    const data = await this.getDataFromSwApi.getData(url);
    this.cacheManager.set(url, JSON.stringify(data), { ttl: 60 * 60 * 60 * 24});

    return { data };
  }
}
