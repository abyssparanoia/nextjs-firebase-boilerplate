## nextjs-firebase-boilerplate

### what is this?

`This is the type-safe frontend SSR boilerplate using nextjs, preact, typescript and firebase.`

### feature

- support refreshing token on server when token is expired.
- serving on serverless platform because we use firestore as a session store.
- ~using preact for minimizing a bundle size~ // I will fix bug currently
- support monorepo and we use nest.js as backend framework
- support ionic react for PWA and native app using capacitor

### setup

1. prepare firebase project
2. save client key as `firebase.client.key.json` in packages/web
3. save admin key as `firebase.admin.key.json` in packages/web
4. save client key as `firebase.client.key.json` in packages/app/src/firebase
5. save admin key as `firebase.admin.key.json` in packages/backend

6. prepare dotenv in packages/web and packages/backend

```bash
> cp .env.tmpl .env
```

- replace a value of `FIREBASE_CLIENT_API_KEY` to active key.

### Apps

| Package                                        | Localhost             | Prodction  |
| :--------------------------------------------- | :-------------------- | :--------- |
| **[[next.js] web](./packages/web)**            | http://localhost:3000 | web.\*     |
| **[[next.js] app](./packages/app)**            | http://localhost:3002 | app.\*     |
| **[[nestjs] backend](./packages/backend)**     | http://localhost:3001 | backend.\* |
| **[[electron] electron](./packages/electron)** | http://localhost:3003 | native app |

### how to run on local

```bash
# install npm packages
$ yarn

# build deps
$ yarn build

# run web and backend by a commnad
$ yarn start

# web run
$ yarn workspace @abyssparanoia/web start

# backend run
$ yarn workspace @abyssparanoia/backend start

# ionic run
$ yarn workspace @abyssparanoia/app start

# electron run
$ yarn workspace @abyssparanoia/electron start
```
