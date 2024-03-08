# Football Team Shuffling Bot

This project is a bot application developed using TypeScript, SQL, JavaScript, and npm. The bot is designed to perform various tasks and is built with a focus on modularity and scalability.

## Features

- **Player Shuffling**: The bot has a feature to shuffle players and divide them into teams. This is done based on the player's position and skill level.

- **Telegram Integration**: The bot is integrated with Telegram and can send messages to a group chat. It uses the Telegraf library for this purpose.

- **Cron Jobs**: The bot uses node-cron to schedule tasks. For example, it sends a message to a group chat every Friday at 6 AM.

- **Admin Commands**: The bot has commands that can only be executed by admins. For example, the 'shuffle' command can only be executed by an admin.

## Dependencies

The project uses several dependencies, including:

- `@prisma/client`: For database operations.
- `bcrypt`: For password hashing.
- `jsonwebtoken`: For generating and verifying JWT tokens.
- `telegraf`: For Telegram bot API.
- `node-cron`: For scheduling tasks.
- `axios`: For making HTTP requests.
- `express`: For handling HTTP requests and responses.

## Scripts

- `serve`: Starts the development server using nodemon and TypeScript.
- `build`: Compiles the TypeScript files into JavaScript.
- `start`: Starts the application using the compiled JavaScript files.

## Setup

To set up the project, clone the repository and install the dependencies using npm. Then, you can use the provided npm scripts to run the application.

Please note that you will need to provide your own `.env` file with the necessary environment variables for the bot token and group ID.

## License

This project is licensed under the ISC license.
