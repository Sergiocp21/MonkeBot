
### What is MonkeBot? 
•  MonkeBot was created with the aim of offering various interactive and entertaining functionalities on Discord servers.

### System requirements
• To run this Discord bot, you'll need an environment with Node.js installed. It's recommended to use version 18.15.0 or higher of Node.js to ensure compatibility. Additionally, you'll need the dependencies listed in the project's package.json file.

### Development environment configuration 
i. Node.js Installation: Go to the official Node.js website and download the latest stable version or version 18.15.0. Follow the installation instructions specific to your operating system.

ii. Download and unzip the project's zip file.

iii. Dependency Installation: Navigate to the root folder of the project and run the command "npm install" to install all necessary dependencies.

### Proyect structure
Folder "commands":
This is where the files representing the bot's commands will be stored. Each file will contain the logic and configuration of a specific command. It's divided into two subfolders:

Developer only: Commands that only developers can use on Discord.
Public: Commands that everyone can use or limited to server administrators.
File "SlashCommands.js":
This file solely controls the commands mentioned above. Remember to add your ID as a developer in the condition that compares your user ID.

Folder "Functions":
In this folder, you can place all the necessary functions that are not commands, events, etc. For example, the file "fileLoader.js" is used to load all files with the .js extension from the directory passed as a parameter. We'll use this in the handlers.

Folder "Handlers":
This folder contains two handlers:

CommandHandler: This handler is responsible for loading and managing the bot's commands. Commands are specific actions that the bot can perform in response to a command sent by a user. The handler reads the files from the commands folder and registers the commands on the Discord server. Additionally, it handles the execution of the commands when invoked.
EventHandler: This handler is responsible for loading and managing the bot's events. Events are actions or occurrences that happen in Discord, such as the arrival of a new message, a user joining the server, etc. The handler reads the files from the events folder and registers the events so that the bot can detect and respond to them.
File "index.js":
This will be the main file of the project. Here, the Discord bot will be configured, commands will be loaded, events will be set, and the bot will be started.

File "package.json":
This file will contain information about the project's dependencies, execution scripts, npm configuration, etc.

File "config.json":  
Contains the bot's ID and the OpenAi API.
## You must create it 
To create the config.json properly on the root folder you must:
#### Use the id "token" for the bot's APIKEY
#### Use the "OpenAiToken" for the OpenAi APIKEY

```json
{
    "token": "Discord API of your bot",
    "OpenAiToken": "OPEN AI APIKEY"
}
````

Credits to [Elitzen](https://github.com/Elitezen) for making the conection between OpenAI chatbot and discord pretty easy with [discordjs-chatgpt](https://github.com/Elitezen/discordjs-chatgpt/tree/master)
