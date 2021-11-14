import { Injectable } from '@nestjs/common';

@Injectable()
export class TestQueries {
  async getTestData(): Promise<{ result: boolean }> {
    console.log(`Handling test query`);
    return { result: true };
  }
}
