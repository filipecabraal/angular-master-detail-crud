import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataBase implements InMemoryDbService {
  createDb(){
    const categories = [
      {
        id: 1,
        name: 'Home',
        description: 'Payments of house accounts'
      },
      {
        id: 2,
        name: 'Health',
        description: 'Health plan and medicines'
      },
      {
        id: 3,
        name: 'Recreation',
        description: 'Movie theater, parks, beach etc'
      },
      {
        id: 4,
        name: 'Salary',
        description: 'Salary payment'
      },
      {
        id: 5,
        name: 'Freelancer',
        description: 'Freelance jobs'
      }
    ];

    return { categories };
  }
}
