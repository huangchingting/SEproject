# admin

### Development
1. Install dependencies.
```
npm install
```

2. Create a `.env` file in the project's root directory and set environment variable
in the file. You can check `dev.example.env` for reference.

3. Populate the development database with some data. **(Make sure you installed MongoDB locally)**
```
npm run filldb
```

4. Run backend.
```sh
npm run backend
```

5. Run frontend: compiles and hot-reloads for development.
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run tests
```sh
npm test
```

### Backup MongoDB
```sh
mongodump --db=DATABASE_NAME --archive=ARCHIVE_NAME --host=HOST --port=PORT
```

### Restore MongoDB
```sh
mongorestore --archive=ARCHIVE_NAME --host=HOST --port=PORT
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
