import i18n = require('i18n')
import Enmap from 'enmap'
import { Command, EventHandler } from "../src/interfaces";
import { Client } from 'discord.js';

export default class ReadyEventHandler implements EventHandler {
    name: string = 'ready';

    handle(_getCommands: () => Enmap<string, Command>, client: Client, ..._args: any[]): any {
        client.on('error', (msg) => console.error(msg));
        client.on('warn', (msg) => console.warn(msg));
        client.on('info', (msg) => console.info(msg));
        client.on("debug", (msg) => console.debug(msg));

        client.user.setActivity(i18n.__('Pronoun Assignment'))
        console.log(i18n.__('Logged in as %s and ready for service!', client.user.username));

        //TODO: message welcome state
    }

}