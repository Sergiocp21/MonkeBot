async function loadCommands(client) {
    const { loadFiles } = require('../Functions/fileLoader');
    const ascii = require('ascii-table');
    const commandTable = new ascii().setHeading('Command', 'Status');

    await client.commands.clear();

    let commandsArray = [];

    const commandFiles = await loadFiles('Commands');

    commandFiles.forEach((file) => {
      const command = require(file);
      client.commands.set(command.data.name, command);

      commandsArray.push(command.data.toJSON());

      commandTable.addRow(command.data.name, '😎');
    });

    client.application.commands.set(commandsArray);

    console.log(commandTable.toString(), '\nLoaded Commands');
  }
  module.exports = { loadCommands };