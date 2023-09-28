/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

export default {
  post: (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.log('test controller');
    // try {
    //   res.status(200).send('Hello World');
    // } catch (error) {
    //   next(error);
    // }
  },
};
