import Keycloak from "keycloak-js";

console.log("test", import.meta.env.KEYCLOAK_REALM);
const keycloak = new Keycloak({
  url: "http://127.0.0.1:8080",
  realm: "TMSRealm",
  clientId: "tmsclient",
});

export default keycloak;
