import * as express from "express";
import loginHandler from "./handlers/login";
import { createVenueHandler, getVenueHandler } from "./handlers/venue";
import { initModels } from "./models";
import * as bodyParser from "body-parser";
import { createReviewHandler } from "./handlers/review";
import { getClients } from "./clients/auth0";
import { config } from "./config";

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

// domain: string,
// client_id: string,
// client_secret: string,
// authzIdentifier: string,
// managementIdentifier: string,
// extension: string

getClients(
  config.auth0Domain,
  config.auth0ClientID,
  config.auth0ClientSecret,
  undefined,
  config.auth0ManagementIdentifier,
  config.auth0Extension
).then(({ managementClient }) => {
  app.post("/v1/user/login", loginHandler(managementClient));
});

/**

- POST /v1/login
- POST /v1/logout
- GET /v1/venues/hot (with filters)
- GET /v1/venues/:userId
- POST /v1/venue

*/

// Venues
app.post("/v1/venue", createVenueHandler);
app.get("/v1/venue/:id", getVenueHandler);

// Reviews
app.post("/v1/review", createReviewHandler);

app.listen(port, () =>
  console.log(`Food discovery app listening on port ${port}!`)
);
