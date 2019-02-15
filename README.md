# pronoun-bot

A simple pronoun role management and assignment discord bot

## Install

- Install the most recent LTS (long-term service) version of [Node.js](https://nodejs.org/en/)
- Install the latest version of [Python 2.7](https://www.python.org/downloads/)
- Open a command prompt of your choice and navigate to the directory where you cloned this repository
- set the PYTHON environment variable to the location of the Python 2.7 `python` executable file (e.g. C:\Python27\python.exe)
- Run the command `npm install` to install dependencies
- Copy and rename the `config/config.init.json` file to `config/config.json`
- Replace the value of `token` in `config/config.json` with your discord bot token

You can obtain your bot token from the [Discord Developer Portal](https://discordapp.com/developers/applications)

## Run

Just run the command `npm start`! If successful the bot should connect and send a welcome message to the server (first time only).
