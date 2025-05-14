import { BadRequestException } from '@nestjs/common';

export function sanitizeQuery(query: Record<string, any>): Record<string, any> {
  const forbiddenOperators = ['$ne', '$eq', '$gt', '$lt', '$regex'];

  for (const key in query) {
    const value = query[key];

    if (typeof value === 'object' && value !== null) {
      for (const op of forbiddenOperators) {
        if (op in value) {
          throw new BadRequestException(`Invalid request - potential NoSQL injection detected`);
        }
      }
    }
  }

  return query;
}