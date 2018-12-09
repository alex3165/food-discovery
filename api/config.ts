interface Config {
  auth0Domain: string;
  auth0ClientID: string;
  auth0ClientSecret: string;
  authzIdentifier: string;
  auth0ManagementIdentifier: string;
  auth0Extension: string;
}

if (!process.env.AUTH0_CLIENT_SECRET) {
  throw new Error("Couldnt find AUTH0_CLIENT_SECRET env variable");
}

export const config: Config = {
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
  auth0Domain: "food-discovery.eu.auth0.com",
  auth0ClientID: "6xR3IzMX4VA6Ilvgj38Twj5Ffl9EPH7P",
  authzIdentifier: "urn:auth0-authz-api",
  auth0ManagementIdentifier: "https://food-discovery.eu.auth0.com/api/v2/",
  auth0Extension:
    "https://food-discovery.eu.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api"
};
