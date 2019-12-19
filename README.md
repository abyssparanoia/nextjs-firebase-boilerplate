## nextjs-firebase-boilerplate

### what is this?

`This is the type-safe frontend SSR boilerplate using nextjs, typescript and firebase.`

### feature

- support refreshing token on server when token is expired.
- serving on serverless platform because we use firestore as a session store.

### setup

1. prepare firebase project
2. save client key as `firebase.client.key.json`
3. save admin key as `firebase.admin.key.json`

4. prepare dotenv

```bash
> cp .env.tmpl .env
```

- replace a value of `FIREBASE_CLIENT_API_KEY` to active key.

### how to run on local

```bash
# install npm packages
$ yarn

# run
$ yarn start:dev
```
