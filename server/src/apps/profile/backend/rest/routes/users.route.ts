import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';
import { body } from 'express-validator';
import { validateReqSchema } from './index';

export const register = (router: Router) => {
	// Those validations are communication protocol validations, not value object validations
	const reqSchema = [body('id').exists().isString(), body('name').exists().isString()];

	const userPutController = container.get('Apps.profile.controllers.UserPutController');
	router.put('/users/:id', reqSchema, validateReqSchema, (req: Request, res: Response) =>
		userPutController.run(req, res)
	);
};
