import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserCreator } from '../../../../contexts/profile/user/application/UserCreator';
import { Controller } from './Controller';

type UserPutRequest = Request & { body: { id: string; name: string } };

export class UserPutController implements Controller {
	constructor(private userCreator: UserCreator) {}

	async run(req: UserPutRequest, res: Response): Promise<void> {
		const { id, name } = req.body;

		await this.userCreator.run({ id, name }); // Recordar que si aquí se lanza una excepción, tenemos un middleware que la captura y la devuelve

		res.status(httpStatus.CREATED).send();
	}
}
