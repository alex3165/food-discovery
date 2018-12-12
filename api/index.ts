import * as express from "express";
import loginHandler from "./handlers/login";
import { createVenueHandler, getVenueHandler } from "./handlers/venue";
import { initModels } from "./models";
import * as bodyParser from "body-parser";
import { createReviewHandler } from "./handlers/review";
import { getClients } from "./clients/auth0";
import { config } from "./config";
import { decode } from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(bodyParser.json());

initModels()
  .then(models => {
    console.log("Models created", models);
  })
  .catch(err => {
    console.error("Couldn't create models");
    throw new Error(err);
  });

getClients(
  config.auth0Domain,
  config.auth0ClientID,
  config.auth0ClientSecret,
  undefined,
  undefined,
  config.auth0Extension
).then(({ authenticationClient }) => {
  app.post("/v1/user/login", loginHandler(authenticationClient));
});

/**

- POST /v1/login
- POST /v1/logout

- GET /v1/venues/:userId
- POST /v1/venue

- GET /v1/reviews/hot
- 

*/

const withAuth = (req: express.Request, res: express.Response, next) => {
  if (!req.headers.authorization) {
    res
      .status(401)
      .send({ message: "Unhautorized, please provide a valid auth token" });
  }

  // TODO: verify token
  const userProfile = decode(req.headers.authorization!.replace("Bearer ", ""));

  res.locals["profile"] = userProfile;

  next();
};

// Venues
app.post("/v1/venue", withAuth, createVenueHandler);
app.get("/v1/venue/:id", getVenueHandler);

// Reviews
app.post("/v1/review", withAuth, createReviewHandler);
// app.get("/v1/reviews/hot", getHotReviewsHandler);

app.listen(port, () =>
  console.log(`Food discovery app listening on port ${port}!`)
);
