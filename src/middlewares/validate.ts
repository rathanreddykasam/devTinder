// validate.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

// Utility type for getting class constructor
type ClassConstructor<T> = { new (): T };

// The validation middleware function
export function validateRequest<T extends object>(
	dto: ClassConstructor<T>,
	method: 'body' | 'query' = 'body'
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const data = method === 'body' ? req.body : req.query;
		// Cast query parameters to 'any' to work around the type issue with ParsedQs
		const queryData = method === 'query' ? (data as any) : data;

		// Convert plain object to class instance
		const instance = plainToInstance(dto, queryData);
		const errors = await validate(instance);

		if (errors.length > 0) {
			return res.status(400).json({
				errors: errors.flatMap((e) => Object.values(e.constraints || {})),
			});
		}

		next();
	};
}
