import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {

  constructor(readonly databaseService: DatabaseService) {}

  create(createDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createDto });
  }

  findAll(
    name?: string,
    description?: string
  ) {
    const query: Prisma.ProductFindManyArgs = {
      where: {
        name: {
          startsWith: name,
        },
        description: {
          contains: description,
        }
      }
    };
    return this.databaseService.product.findMany(query);
  }

  findOne(id: number) {
    return this.databaseService.product.findUnique({ where: { id } });
  }

  update(id: number, updateDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({ where: { id }, data: updateDto });
  }

  remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
