import * as express from "express";

const app = express();
const port = 3000;

app.get("/", (_, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Food discovery app listening on port ${port}!`)
);
