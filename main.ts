import fs = require('fs');
import i18n = require('i18n');
import container from './src/config/ioc-config';
import registeredEvents from './events/registered-events.json';
import registeredCommands from './commands/registered-commands.json';
import { Client } from 'discord.js';
import { contains } from './src/utility';
import { ServiceIdentifiers } from './src/constants/index.js';
import { Command, EventHandler, Configuration, CommandRegistry } from './src/interfaces';

i18n.configure({
    locales: ['en_US'],
    directory: `${__dirname}/locale`
})

var client = new Client();
var configuration = container.get<Configuration>(ServiceIdentifiers.Configuration);

var commandRegistry = container.get<CommandRegistry>(ServiceIdentifiers.CommandRegistry);

const commandDirectory = `${__dirname}/commands`;
fs.readdir(commandDirectory, (err, items) => {
    if(err) {
        return console.error(i18n.__('Unable to load commands from %s: %s', commandDirectory, `${err}`));
    }
    items.forEach(item => {
        var [,fileName,extension] = item.match(/^(.+)\.(.+)$/);
        if(!extension.match(/^(ts|js)$/g)) {
            return console.warn(i18n.__('Skipped command file %s as it is does not appear to be a valid module file.', item));
        }
        if(configuration.trustAllCommands !== true && !contains(registeredCommands, fileName[0])) {
            return console.warn(i18n.__('Skipped command file %s as it was not specified in the registered commands list.', item));
        }
        try {
            const module = require(`${commandDirectory}/${item}`);
            const command = new module.default() as Command;
            if(!command) return console.error(i18n.__('Failed to load command from %s', item));
            commandRegistry.register(command);
            return console.debug(i18n.__('Successfully registered command %s', command.name));
        } catch (ex) {
            return console.error(i18n.__('Failed to register command in file %s: %s', item, ex));
        }
    });
});

const eventDirectory = `${__dirname}/events`;
fs.readdir(eventDirectory, (err, items) => {
    if(err) {
        return console.error(i18n.__('Unable to load events from %s: %s', eventDirectory, `${err}`));
    }
    items.forEach(item => {
        var [,fileName,extension] = item.match(/^(.+)\.(.+)$/);
        if(!extension.match(/^(ts|js)$/g)) {
            return console.warn(i18n.__('Skipped event file %s as it is does not appear to be a valid module file.', item));
        }
        if(configuration.trustAllEvents !== true && !contains(registeredEvents, fileName)) {
            return console.warn(i18n.__('Skipped event file %s as it was not specified in the registered events list.', item));            
        }
        try {
            const module = require(`${eventDirectory}/${item}`)
            const event = new module.default() as EventHandler;
            if(!event) return console.error(i18n.__('Failed to load event from %s', item));
            client.on(event.name, event.handle.bind(event, client));
            return console.debug(i18n.__('Successfully registered event %s', event.name));
        } catch (ex) {
            return console.error(i18n.__('Failed to register event in file %s: %s', item, ex));
        }
    });
});

client.login(configuration.token)
    .catch(reason => {
        console.error(i18n.__('Failed to launch pronoun bot:'), reason)
    });
