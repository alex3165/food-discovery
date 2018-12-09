import * as express from "express";
import loginHandler from "./handlers/login";
import { createVenueHandler, getVenueHandler } from "./handlers/venue";
import { initModels } from "./models";
import * as bodyParser from "body-parser";
import { createReviewHandler } from "./handlers/review";

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

/**

- POST /v1/login
- POST /v1/logout
- GET /v1/venues/hot (with filters)
- GET /v1/venues/:userId
- POST /v1/venue

*/

app.post("/v1/user/login", loginHandler);

// Venues
app.post("/v1/venue", createVenueHandler);
app.get("/v1/venue/:id", getVenueHandler);

// Reviews
app.post("/v1/review", createReviewHandler);

app.listen(port, () =>
  console.log(`Food discovery app listening on port ${port}!`)
);
