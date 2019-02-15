import i18n = require('i18n')
import Enmap from 'enmap';
import { Command, Configuration } from './interfaces';
import { Client, Message } from 'discord.js';
import { Options, Arguments } from 'yargs-parser';
import { getHeart } from './messages';
import container from './config/ioc-config';
import { ServiceIdentifiers } from './constants';

export default class HelpCommand implements Command {
    name: string = 'help';
    syntax: string[] = ['help', 'help {-a|--all}', 'help [-c|--command] *command*'];
    description: string = 'Provides a detailed overview of any command registered with the bot.';
    options: Options = {
        alias: {
            command: ['-c'],
            all: ['-a']
        },
        string: ['command'],
        configuration: {
            "duplicate-arguments-array": false
        }
    };

    configuration: Configuration;

    constructor(private getCommands: () => Enmap<string, Command>) { 
        this.configuration = container.get(ServiceIdentifiers.Configuration);
    }

    run(client: Client, message: Message, args: Arguments): any {
        const commands = this.getCommands();
        const prefix = this.configuration.getPrefix(message.guild);

        if(args._.length == 0 && !args['all'] && !args['command']) {
            return this.sendGeneralHelpMessage(client, message)
        }

        //TODO: the rest of this
    }

    checkPermissions(_message: Message): boolean {
        return true;
    }

    private sendGeneralHelpMessage(client: Client, message: Message): Promise<Message | Message[]> {
        var helpMessage: string;
        var prefix: string = this.configuration.getPrefix(message.guild);
        
        if(!message.guild) {
            helpMessage = i18n.__({phrase: "Hi! I'm %s, the pronoun role assignment robot!", locale: message.author['locale'] || 'en_US'}, client.user.username);
        } else {
            helpMessage = i18n.__({phrase: "hi! I'm %s, the pronoun role assignment robot!", locale: message.author['locale'] || 'en_US'}, message.guild.members.get(client.user.id).displayName);
        }

        helpMessage = helpMessage.concat('\r\n')
            .concat(i18n.__({phrase: 'To list all of the commands I can understand, just send %s%s to any channel I can read. Or, you can also DM me if you want!', locale: message.author['locale'] || 'en_US'}, prefix, 'help --all')).concat('\r\n')
            .concat(i18n.__({phrase: 'You can also check my documentation on %s!', locale: message.author['locale'] || 'en_US'}, '<https://github.com/centurionfox/pronoun-bot>')).concat('\r\n')
            .concat(i18n.__({phrase: 'Thanks! %s', locale: message.author['locale'] || 'en_US'}, getHeart()));

        return message.reply(helpMessage);
    }
}