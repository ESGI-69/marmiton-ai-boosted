import { NextFunction, Request, Response } from 'express';
import userService from '../service/user';
import checkMandatoryFields from '../utils/checkMandatoryFields';
import checkParams from '../utils/checkParams';

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['username', 'password'], req.body);
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['username', 'password'], req.body);
      const user = await userService.findForLogin(req.body.username);
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
      res.status(200).send(req.user);
    } catch (error) {
      next(error);
    }
  },

  addAllergy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('You must be logged in to add an allergy');
      checkMandatoryFields(['name'], req.body);
      await userService.addAllergy(req.user.id, req.body.name);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteAllergy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('You must be logged in to delete an allergy');
      checkParams(['name'], req.params);
      await userService.removeAllergy(req.user.id, req.params.name);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  addNonLikedIngredient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('You must be logged in to add a non liked ingredient');
      checkMandatoryFields(['name'], req.body);
      await userService.addNonLikedIngredient(req.user.id, req.body.name);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteNonLikedIngredient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('You must be logged in to delete a non liked ingredient');
      checkParams(['name'], req.params);
      await userService.removeNonLikedIngredient(req.user.id, req.params.name);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
