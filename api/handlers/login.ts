import { Request, Response } from "express";
import { AuthenticationClient } from "auth0";

interface Auth0PasswordGrantResponse {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

const loginHandler = (authClient: AuthenticationClient) => (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(500)
      .send({ message: "Provide valid username and password in request body" });
  }

  authClient
    .passwordGrant({
      username,
      password,
      realm: "Username-Password-Authentication"
    })
    .then((response: Auth0PasswordGrantResponse) => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: JSON.stringify(err) });
    });
};

export default loginHandler;
