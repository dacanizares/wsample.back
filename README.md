# sem.backend

![Diagram](.assets/diagram.png)

## Quick start

1. Install dependencies.
   ```sh
   npm install
   ```
 
2. Execute migrations:
   ```sh
   npm run migrate
   ```

3. Run!
   ```sh
   npm start
   ```

4. Run tests (WARNING!: This step deletes local db and re-runs migrations):
   ```sh
   npm test
   ```

## Features

- DDD-like structure (not purely DDD because of time constraints).
  - Domain events.
  - Simple DI.
- CQRS.
- Lightweight data access using Kysely + SQLite.
- ViewModels to prevent exposing data from the server.
- Generic validators and mappers, checking information cosistency and protecting from over-posting attacks.
- Included http examples (check *test/* folder).
- Included functional tests.
- Standard security measures (check *src/app.ts*)
- Fast development iteration with hot reloading.

## Recommended VSCode extensions

* [SQLite Viewer](https://open-vsx.org/vscode/item?itemName=qwtel.sqlite-viewer) to inspect *sqlite* database files.
* [REST Client](https://open-vsx.org/vscode/item?itemName=humao.rest-client) to run .http files located under *test/* folder
