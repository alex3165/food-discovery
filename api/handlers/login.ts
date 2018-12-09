import { Request, Response } from "express";
import { ManagementClient } from "auth0";

const loginHandler = (managementClient: ManagementClient) => (
  req: Request,
  res: Response
) => {
  res.status(200).send({ hello: "world" });
};

export default loginHandler;
