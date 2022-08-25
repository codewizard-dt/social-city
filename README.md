# Thought Cloud
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://opensource.org/licenses/MIT)

## A Social Network Backend
Thought Cloud is an Express server with a RESTful API that allows users to post their "thoughts" and give their "reactions" to other people's thoughts.

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

# Installation
- run `npm i`
- update `.env` with relevant Mongo db info
- run `node db/seeds` to create and seed DB


# Usage

Start the server with `node server.js`.

[Walkthrough Video](https://drive.google.com/file/d/1EKbsz3f9MmZf4ZF08oy2e7Cws4jpOmXY/view?usp=sharing) covers how to use the RESTful routes and discusses the API responses.

## Models
### User
| Property | Type | Unique | Required | Default |
|----|----|----|----|----|
| _id | ObjectId | true |  | new ObjectId |
| username | string | true | true |
| email | string | true | true |
| thoughts | ThoughtId[] | 
| friends | UserId[] |
### Thought
| Property | Type | Unique | Required | Default |
|----|----|----|----|----|
| _id | ObjectId | true |  | new ObjectId |
| thoughtText | string | | true |
| username | string | | true
| createdAt | date | | | Date.now()
### Reaction
| Property | Type | Unique | Required | Default |
|----|----|----|----|----|
| reactionId | ObjectId | true |  | new ObjectId |
| reactionBody | string | | true |
| username | string | | true |
| createdAt | date | | | Date.now()

## Routes

### Users
- GET `/api/users` List of all users
- POST `/api/users` Creates new user
- GET `/api/users/:id` Gets info of user with given ID
- PUT `/api/users/:id` Updates a user with the given ID
- DELETE `/api/users/:id` Deletes user with the given ID

### Thoughts
- GET `/api/thoughts` List of all thoughts
- POST `/api/thoughts` Creates new thought
- GET `/api/thoughts/:id` Gets info of thought with given ID
- PUT `/api/thoughts/:id` Updates a thought with the given ID
- DELETE `/api/thoughts/:id` Deletes thought with the given ID

### Reactions
- POST `/api/thoughts/:thoughtId/reactions` Creates new reaction
- DELETE `/api/thoughts/:thoughtId/reactions` Deletes reaction (req.body requires `reactionId`)

# License
This project is provisioned under the [MIT License](https://opensource.org/licenses/MIT)

# Contributing
[Repo link](https://github.com/codewizard-dt/thought-cloud)

Do you want to help make this project better? Visit the the repo to check out existing issues or create a new branch to start working on a suggested feature

# Questions
If you have any questions, please contact me on [Github](https://github.com/codewizard-dt) or [email](mailto:david@codewizard.app).