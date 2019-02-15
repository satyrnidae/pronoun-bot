import i18n = require('i18n')
import yargsParser from 'yargs-parser';
import container from '../src/ioc-config';
import discordCommandParser from 'discord-command-parser';
import { ServiceIdentifiers } from '../src/constants';
import { Client, Message, TextChannel } from 'discord.js';
import { EventHandler, Configuration, CommandRegistry } from '../src/interfaces';

export default class MessageEventHandler implements EventHandler {
    name: string = 'message';
    configuration: Configuration;
    commandRegistry: CommandRegistry;

    constructor() {
        this.configuration = container.get(ServiceIdentifiers.Configuration);
        this.commandRegistry = container.get(ServiceIdentifiers.CommandRegistry);
    }

    handle(client: Client, message: Message, ..._args: any[]): any {
        var prefix = this.configuration.getPrefix(message.guild);
        var parsedCommand = discordCommandParser.parse(message, prefix);
        if(!parsedCommand.success) return;

        const command = this.commandRegistry.get(parsedCommand.command);
        var senderId: string;

        if(message.member && message.guild && message.channel as TextChannel) {
            senderId = message.member.displayName.concat('@').concat(message.guild.name).concat('/').concat((<TextChannel>message.channel).name);
        }
        else {
            senderId = message.author.username;
        }

        if(!command) return console.warn(i18n.__('%s: Command %s was not registered (prefix collision?)', senderId, parsedCommand.command));

        var commandArgs = yargsParser(parsedCommand.arguments, command.options);
        console.debug('%s: Attempt execute command %s[%s]', senderId, parsedCommand.command, parsedCommand.arguments.join(', '));

        if(command.checkPermissions(message)) {
            return command.run(client, message, commandArgs);
        }
    }
}
