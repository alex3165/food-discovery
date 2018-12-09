import { ManagementClient } from "auth0";
import * as rp from "request-promise";

const identify = (domain, id, secret, audience) =>
  rp({
    method: "POST",
    url: `https://${domain}/oauth/token`,
    headers: { "content-type": "application/json" },
    body: {
      grant_type: "client_credentials",
      client_id: id,
      client_secret: secret,
      audience
    },
    json: true
  });

const getAuthzBuilder = (extension, token) => (
  endpoint,
  method = "GET",
  body = {}
) =>
  rp({
    method,
    body,
    uri: `${extension}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
  });

export interface Auth0Clients {
  authz: (endpoint: string, method?: string, body?: any) => rp.RequestPromise;
  managementClient: ManagementClient;
}

const getClients = (
  domain,
  client_id,
  client_secret,
  authzIdentifier,
  managementIdentifier,
  extension
) => {
  const promises = [];
  if (authzIdentifier) {
    promises.push(identify(domain, client_id, client_secret, authzIdentifier));
  }

  if (managementIdentifier) {
    promises.push(
      identify(domain, client_id, client_secret, managementIdentifier)
    );
  }

  return Promise.all(promises).then(([authz, management]) => {
    const res: Auth0Clients = {} as any;

    if (authz) {
      res.authz = getAuthzBuilder(extension, authz.access_token);
    }

    if (management) {
      res.managementClient = new ManagementClient({
        token: management.access_token,
        domain
      });
    }

    return res;
  });
};

module.exports = {
  getClients
};
