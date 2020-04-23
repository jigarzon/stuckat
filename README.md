# Stuck at (stuckat)

A project to unite geographically stucked people developed in vue.js+quasar
## Use cases
### Front page
- 4 buttons:
   1. I'm stucked
   2. I have a relative stucked
   3. I want to post a positive experience
   4. I want to post a negative experience
- A map showing all stucked people and paths

### Actions:
#### 1. I'm stucked
1. Ask login
2. Ask origin location
3. Ask destination location
4. Ask:
   1. how many people ar in this stucked group? [number]
   2. do they have mobility (car/truck/etc)? [yes/no]
   3. how many additional people can they carry? [number]
   4. Description [text]
   5. Phone [string]

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
