# SBA318 Express Server Application - Medium Clone API

This is an Express.js server RESTFUL AOI application that serves a blog site. The blog site has posts, comments, and authors. The data for these entities is stored in JSON format in the `data` directory.

## Project Structure

- `app.js`: The main application file.
- `data/`: Contains data for authors, comments, and posts.
- `public/`: Contains static files like CSS.
- `routes/`: Contains route handlers for authors, comments, and posts.
- `utilities/`: Contains utility functions like error handling logic
- `views/`: Contains Pug templates for the views. current views consist of index which is root 
            and singlepage which show details of articles . comment posting is enables for each post.

## API Endpoints

- `GET /posts`: Get all posts.
- `GET /posts/:id`: Get a specific post by ID.
- `POST /posts`: Create a new post.
- `PATCH /posts/:id`: Update a specific post by ID.
- `DELETE /posts/:id`: Delete a specific post by ID.

- `GET /comments`: Get all comments.
- `GET /comments/:id`: Get a specific comment by ID.
- `POST /comments`: Create a new comment.
- `PATCH /comments/:id`: Update a specific comment by ID.
- `DELETE /comments/:id`: Delete a specific comment by ID.

- `GET /authors`: Get all authors.
- `GET /authors/:id`: Get a specific author by ID.
- `POST /authors`: Create a new author.
- `PATCH /authors/:id`: Update a specific author by ID.
- `DELETE /authors/:id`: Delete a specific author by ID.


## Getting Started

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `npm start` or `npm run dev` for development mode.

## Dependencies

- [Express.js](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js
- [Pug](https://pugjs.org/): High-performance template engine.
- [Nodemon](https://nodemon.io/): Utility that will monitor for any changes in your source and automatically restart your server.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
