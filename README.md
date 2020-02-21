## Full-stack market

This is a full-stack e-commerce application built with [React](https://reactjs.org/) and [Express](https://expressjs.com/).

### About

It is basically a marketplace where anyone can sign up and start selling products. The application has a clean and minimal interface to help users to interact with the marketplace. I built it all by myself without any type of instructions or tutorials, just to test my skills. I wasn't planning on making the project this big, but this was a interesting passion project so I didn't see any point in stopping development. By now the application has all the things I can think of. It really has been a blast making up cool features and implementing them in this application.

### Challenges

The application was not hard to build since it is basically a CRUD application. Even though this was the case, I ran into many problems, but in the end I figured out how to solve them myself. Building this application has opened my eyes to the importance of clean code. Since the project is ~40K lines of code, scaling the application proved to be difficult. During the timespan in which I built this application I learned many things, like CSS animations or optimizing the back-end and front-end.

### Technologies

At first I wanted to construct the back-end with something other than Javascript, but in the end I decided to stick with it. I'm a bit sad that I didn't know about Typescript at the time of starting this project, since that would've immensely helped me with bugs.

- Javascript
- NodeJS
- Express
- MongoDB
- React
- Redux
- Jest
- Markdown

### Setting up the project

```
$ git clone https://github.com/nireo/fullstack-market
$ cd fullstack-market/backend
$ npm install
$ cd ../frontend
$ npm install
```

Now that you've installed all the dependencies it is time to run the code. First you need to setup a `.env` file with a [MongoDB](https://www.mongodb.com/) address and the port number.

```
// .env.js
PORT=3001
MONGO_URI='mongodb+srv://<username>:<password>@cluster0-ww9qd.mongodb.net/<dbname>?retryWrites=true&w=majority'
```

#### Run back-end

Make sure you're in the back-end directory and run:

```
$ npm run dev
```

#### Run front-end

Make sure you're in the front-end directory and run:

```
$ npm start
```
