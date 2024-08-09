import { Router, Request, Response } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const userPutController = container.get('Apps.profile.controllers.UserPutController');
  router.put('/users/:id', (req: Request, res: Response) => userPutController.run(req, res));
};
