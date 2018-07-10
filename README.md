# Groopy

> Backend application for Groopy app

> [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Groopy is an App for creating chat groups for organizing activities. On top of giving users a place to coordinate their activities through the chat, Groopy provides functionality for different categories of events like holidays, sport events or parties. This allows group members to coordinate on dates, check-lists, locations and other things necessary for the event to go smoothly.

For the backend repository refer to:

https://github.com/marlonbs/groopy-api

## Table of contents

- [Getting started](#getting-started)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Developer](#developer)
- [License](#license)

## Getting started

A few things you have to take in consideration before using Groopy

After cloning the repo you'll have to :

### Install global and local dependencies:

- [Node](https://nodejs.org/en/): `brew install node`
- [Npm](https://www.npmjs.com/): `npm install`
- [Homebrew](https://brew.sh/)

```dotenv
ENV=development
PORT=<backend-port>
DB_HOST=<hostname>
DB_NAME=<database-name>
JWT_SECRET=<jwt-secret-string>
JWT_AUTH_LIFETIME=<jwt-lifetime>
S3_BUCKET=<s3-bucket-name>
S3_PUBLIC_URL=<s3-bucket-url>
AWS_ACCESS_KEY=<aws-access-key>
AWS_SECRET_ACCESS_KEY=<aws-secret-access-key>
DEFAULT_AVATAR=<default-avatar-img>
```

> When running the server it will automatically create a new database

## Usage

Start the server for development:

```bash
cd eventing
npm start
```

## Tech Stack

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [SASS](https://sass-lang.com/)

## Developer

- Marlon Becker - [GitHub](https://github.com/marlonbs) - [LinkedIn](https://www.linkedin.com/in/marlon-becker-santos)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/marlonbs/groopy-react/blob/master/LICENSE) file for details
