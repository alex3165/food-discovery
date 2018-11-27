import { Request, Response } from "express";

const loginHandler = (req: Request, res: Response) => {
  res.status(200).send({ hello: "world" });
};

export default loginHandler;
