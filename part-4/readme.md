To generate a JWT:

```shell
> node generate-client-hash.js USERNAME CLIENT_ID CLIENT_SECRET
> aws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id CLIENT_ID --auth-parameters USERNAME=regular,PASSWORD=PASSWORD,SECRET_HASH=SECRET_HASH
```
