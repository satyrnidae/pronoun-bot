import i18n = require('i18n')
import { Client } from 'discord.js';
import { EventHandler } from "../src/interfaces";

export default class ReadyEventHandler implements EventHandler {
    name: string = 'ready';

    handle(client: Client, ..._args: any[]): any {
        client.on('error', (msg) => console.error(msg));
        client.on('warn', (msg) => console.warn(msg));
        client.on('info', (msg) => console.info(msg));
        client.on("debug", (msg) => console.debug(msg));

        client.user.setActivity(i18n.__('Pronoun Assignment'))
        console.log(i18n.__('Logged in as %s and ready for service!', client.user.username));

        //TODO: message welcome state
    }
}
