# sem.backend

![Diagram](.assets/diagram.png)

## Quick start

1. Create a new dabase (named *wsample*) and execute the scripts located under the **scripts/** folder.
   * Run *create_db.sql*
 

## Features

- DDD-like structure (not purely DDD because of time constraints).
  - Domain events.
- CQRS.
- Lightweight data access using Dapper.
- ViewModels to prevent exposing data from the server.
- Included http examples.
- Swagger.

## Recommended VSCode extensions

* [SQLite Viewer](https://open-vsx.org/vscode/item?itemName=qwtel.sqlite-viewer) to inspect *sqlite* database files.
* [REST Client](https://open-vsx.org/vscode/item?itemName=humao.rest-client) to run .http files located under *test/* folder
