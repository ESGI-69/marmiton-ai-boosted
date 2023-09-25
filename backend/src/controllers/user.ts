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
};
