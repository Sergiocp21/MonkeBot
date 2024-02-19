async function loadEvents(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const tableEvents = new ascii().setHeading("Event", "Status");

    await client.events.clear();

    const Files = await loadFiles("Events");

    Files.forEach((file) => {
        const event = require(file);

        const execute = (...args) => event.execute(...args, client);
        client.events.set(event.name, execute);

        if(event.rest){
            if(event.once){
                client.rest.once(event.name, execute);
            }
            else{
                client.rest.on(event.name, execute);
            }
        }
        else{
            if(event.once) {
                client.once(event.name, execute)
            }
            else{
                client.on(event.name, execute);
            }
        }

        tableEvents.addRow(event.name, "😎");

    });

    return console.log(tableEvents.toString(), "\nLoaded Events");
}


module.exports = { loadEvents };