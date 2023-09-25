import { NextFunction, Request, Response } from 'express';
import userService from '../service/user';
import checkMandatoryFields from '../utils/checkMandatoryFields';

interface UserObjectPayload {
  id: number;
  username: string;
  name?: string;
}

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['username', 'password'], req.body);
      const { id, username, name } = await userService.create(req.body);
      // Remove the password
      const payload: UserObjectPayload = {
        id,
        username,
        name: name || undefined,
      };
      res.status(201).json(payload);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['username', 'password'], req.body);
      const user = await userService.findByUsername(req.body.username);
      if (!user) {
        return res.status(401).send({
          code: 'invalid_credentials',
          message: 'Invalid credentials',
        });
      }
      if (!await userService.checkPassword(req.body.password, user.password)) {
        return res.status(401).send({
          code: 'invalid_credentials',
          message: 'Invalid credentials',
        });
      }
      const token = userService.generateToken(user);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

  me: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return next(new Error('NOT LOGGED'));
      const payload: UserObjectPayload = {
        id: req.user.id,
        username: req.user.username,
        name: req.user.name || undefined,
      };
      res.status(200).send(payload);
    } catch (error) {
      next(error);
    }
  },
};
