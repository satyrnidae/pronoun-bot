import i18n = require('i18n')
import Enmap from 'enmap';
import Command from './command';
import configuration from './configuration';
import { Client, Message } from 'discord.js';
import { Options, Arguments } from 'yargs-parser';
import { getHeart } from './messages';

export default class HelpCommand implements Command {
    name: string = 'help';
    syntax: string[] = ['help', 'help {-a|--all}', 'help [-c|--command] *command*'];
    description: string = i18n.__('Provides a detailed overview of any command registered with the bot.');
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

    constructor(private getCommands: () => Enmap<string, Command>) { }

    run(client: Client, message: Message, args: Arguments): any {
        const commands = this.getCommands();
        const prefix = configuration.getPrefix(message.guild);

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
        var prefix: string = configuration.getPrefix(message.guild);
        
        if(!message.guild) {
            helpMessage = i18n.__("Hi! I'm %s, the pronoun role assignment robot!", client.user.username);
        } else {
            helpMessage = i18n.__("hi! I'm %s, the pronoun role assignment robot!", message.guild.members.get(client.user.id).displayName);
        }

        helpMessage = helpMessage.concat('\r\n')
            .concat(i18n.__('To list all of the commands I can understand, just send %s%s to any channel I can read. Or, you can also DM me if you want!', prefix, 'help --all')).concat('\r\n')
            .concat(i18n.__('You can also check my documentation on %s!', '<https://github.com/centurionfox/pronoun-bot>')).concat('\r\n')
            .concat(i18n.__('Thanks! %s', getHeart()));

        return message.reply(helpMessage);
    }
}