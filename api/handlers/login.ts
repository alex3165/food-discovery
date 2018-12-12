import { Request, Response } from "express";
import { AuthenticationClient } from "auth0";

const loginHandler = (authClient: AuthenticationClient) => (
  req: Request,
  res: Response
) => {
  authClient
    .clientCredentialsGrant({ audience: "food-discovery" })
    .then(response => {
      console.log(response);
      res.status(200).send({ hello: "world" });
    })
    .catch(err => {
      console.error(err);
    });
};

export default loginHandler;
