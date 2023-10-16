# Challenge 1: Processing Pipeline

In this challenge, you will build a toy version of our data downloading and processing pipeline. Your task is to download a large `.tar.gz` file, containing lists of organizations and customers, decompress and unzip the CSVs within, parse them, and add them to a SQLite database.

You can find the starter file at <https://wielabs-task.s3.ap-south-1.amazonaws.com/dump.tar.gz>.

## Task

Complete the `processDataDump` function in `challenge.ts`. You are encouraged to make as many helper functions as you need; you can put these in whatever files you like.

Your ultimate goal is to deliver a finished SQLite database, stored in the `out/` folder.

## Constraints

- You must use TypeScript, with explicit typing for every variable and function.
- **You must use Node.js's Streams API** to download and process all required files. This is because, in prod, we'll be working with multi-gigabyte files that can't be processed without the efficiency of streams.
- You must use a functional, immutable code style. That means using only `const`s, and no `let`s or `var`s (unless `let` is absolutely necessary).
- You may `npm install` whatever new libraries you like, although most of the ones you'll need have already been added to `package.json` for you.

## Instructions

1. Use Node.js's Streams API to download `https://wielabs-task.s3.ap-south-1.amazonaws.com/dump.tar.gz` from the cloud; save it to the local file system in the `tmp/` folder.
2. Use a streaming API to decompress the GZIP part of your file, then extract the TAR archive. Save the resulting folder somewhere in `tmp/`.
3. Use `knex` to set up a SQLite database at `out/database.sqlite`.
4. Use a streaming API to read the two CSVs in the folder you just extracted. Add each row to the SQL database (for I/O efficiency, we suggest adding ~100 rows at a time using a batch insert). You'll have a table for `customers` and a table for `organizations`. For your columns, use the same column headers as the original CSV files. However, you should be sure to convert to the appropriate SQL types: integers should be stored as `integer`/`biginteger` in SQL, dates should be stored as `datetime`, etc.

Note that our `.gitignore` will ignore the `out/` and `tmp/` folders; this is by design.

## Tips

We recommend using the following Node.js modules:

- `fs`
- `fs-extra`
- `http`
- `https`
- `zlib`
- `tar`
- `fast-csv`
- `knex`

Any non-built-in modules have been already added to `package.json`.

To view your SQLite database, you can use [this free web app](https://sqliteviewer.app/) or [download this open-source desktop app](https://github.com/sqlitebrowser/sqlitebrowser). On Mac, you can install the latter with:

```sh
brew install --cask db-browser-for-sqlite
```

## Database requirements

- Your code must do all the SQL table management (including defining columns) automatically; you should _not_ have to go into a SQLite browser or the command-line to do any configuration.
- Your SQL tables should have a unique, auto-incrementing primary key columns called `id`.
- All your columns should be non-nullable.
- You don't have to specify any database indices, but you can add some sensible ones if you want to impress us.

## Do this to impress us

Some tips to make your submission stand out:

- Create many small, standalone helper functions.
- Use a lot of comments, including commenting atop each helper function to explain what it does. VSCode can auto-generate JSDoc comments for you ((see this guide)[https://stackoverflow.com/a/42805312]), which are very helpful.
- Use Promises and `async`/`await` rather than callbacks. The Node Streams API likes to use callbacks, so you will want to wrap them in a `new Promise((resolve, reject) => { ... })` to make them Promise-friendly.
- Use functional constructs like `map`, `reduce`, and `filter` rather than imperative `for` loops.
- Use TypeScript generics wherever they're helpful.
- Use TypeScript interfaces whenever possible.
- Use [Prettier](https://prettier.io/) to auto-format your code. They have a great [VSCode plugin](https://github.com/prettier/prettier-vscode).
- Design your project for scale: think about how it could handle hundreds of millions of rows without using excessive memory, storage space, or time, and without getting rate-limited or encountering I/O errors.

## Getting started

To start the challenge, run these:

```sh
npm install
npm install --global tsx
```

Be sure you're using Node version 18 or greater.

## Testing

To test your code, do:

```sh
tsx runner.ts
```

Feel free to make other `.ts` files for testing purposes; you can run them all with `tsx`.

You should also run `npx tsc` to ensure your code passes all the TypeScript compiler's checks. The TypeScript compiler we've set up in this repo is fairly strict.

## Evaluation

We will run the following commands to test your code, starting in the `challenge-1` folder:

```sh
npm install
tsx runner.ts
```

We will expect your code to output a properly designed SQLite database at `out/database.sqlite`. We will run your code exactly once, so be sure your code works correctly, end-to-end, in one shot.

Before you submit, be sure that you get the right result when you run exactly these commands. You may want to delete your `node_modules/`, `out/`, and `tmp/` folders to simulate the "clean-room" run we'll do; remember that none of those folders will be saved to GitHub, so we won't get your copies.
# wielabs
