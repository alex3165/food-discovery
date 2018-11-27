import * as express from "express";
import loginHandler from "./handlers/login";

const app = express();
const port = 3000;

/**

- POST /v1/login
- POST /v1/logout
- GET /v1/venues/hot (with filters)
- GET /v1/venues/:userId
- POST /v1/venue

*/

app.post("/v1/login", loginHandler);

app.listen(port, () =>
  console.log(`Food discovery app listening on port ${port}!`)
);
