
# First Server (Backend Learning)

Today I learned the basics of **Backend Development** using **Node.js** and **Express.js**.

## What I Learned
- How backend works and how a server handles requests
- How **Express** is used to create a server easily
- How to use `require()` to import Express in Node.js
- How to start a server using `app.listen()`
- How to run the server locally
- How to deploy my first backend server

## Live Link
👉 **Live Server:** [https://first-server-p7pq.onrender.com]

## How Express is Used
In this project, Express is imported using `require()` and then used to create an app instance:

```js
const express = require("express");
const app = express();
````

## Starting the Server

The server is started using `app.listen()`:

```js
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Run This Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

(or)

```bash
npm start
```

## Deployment

I successfully deployed my **first server** today 🎉
This is my first backend deployment project.





