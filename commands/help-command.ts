import i18n = require('i18n')
import container from '../src/ioc-config';
import { getHeart } from '../src/messages';
import { Client, Message } from 'discord.js';
import { Options, Arguments } from 'yargs-parser';
import { SERVICE_IDENTIFIERS } from '../src/constants';
import { CommandRegistry, Command, Configuration } from '../src/interfaces';

export default class HelpCommand implements Command {
    name: string = 'help';
    syntax: string[] = ['help', 'help {-a|--all|*all*}', 'help [-c|--command] *command*'];
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

    constructor() {
        this.configuration = container.get(SERVICE_IDENTIFIERS.CONFIGURATION);
    }

    run(client: Client, message: Message, args: Arguments): any {
        const commandRegistry = container.get<CommandRegistry>(SERVICE_IDENTIFIERS.COMMAND_REGISTRY);
        const commands = commandRegistry.getAll();
        const prefix = this.configuration.getPrefix(message.guild);
        const locale = message.author.locale || 'en';

        if (args._.length == 0 && !args['all'] && !args['command']) {
            return this.sendGeneralHelpMessage(client, message)
        }

        if(args['all'] || args._[0] === "all") {
            var helpMessage = i18n.__({phrase: "here's a list of all of the commands I can help you with:", locale: locale}).concat('\r\n');
            commands.forEach(command => {
                helpMessage = `${helpMessage}\t•\t\**${prefix}${command.name}**\:\r\n`;
                //command.syntax.forEach(option => helpMessage = `${helpMessage}\t\t•\t${prefix}${option}\r\n`);
            })
            helpMessage = helpMessage.concat(i18n.__({phrase: 'You can find out more by specifying a single specific command:', locale: locale})).concat('\r\n\t')
                .concat('**').concat(prefix).concat(this.syntax[2]).concat('**');
            return message.reply(helpMessage);
        }

        var commandName = (args['command']||args._[0]) as string;
        var command = commandRegistry.get(commandName);

        if(command) {
            var helpMessage = '\r\n'.concat(i18n.__({phrase: command.description, locale: locale})).concat('\r\n')
                .concat(i18n.__({phrase: 'Usage:', locale: locale})).concat('\r\n')
                command.syntax.forEach(option => {
                    helpMessage = `${helpMessage}\t•\t${prefix}${option}\r\n`
                });
            return message.reply(helpMessage);
        }

        return message.reply(i18n.__({phrase: 'unfortunately, I don\'t know the command "%s"', locale:locale}, commandName).concat('\r\n')
            .concat(i18n.__({phrase: 'If you\'d like to see a list of commands that I understand, just send **%s%s** to any channel I can read, or DM me if you like.', locale:locale}, prefix, this.syntax[1])));
    }

    checkPermissions(_message: Message): boolean {
        return true;
    }

    private sendGeneralHelpMessage(client: Client, message: Message): Promise<Message | Message[]> {
        var helpMessage: string ;
        const prefix = this.configuration.getPrefix(message.guild);
        const locale = message.author.locale || 'en';

        if (!message.guild) {
            helpMessage = i18n.__({ phrase: "Hi! I'm %s, the pronoun role assignment robot!", locale: locale }, client.user.username);
        } else {
            helpMessage = i18n.__({ phrase: "hi! I'm %s, the pronoun role assignment robot!", locale: locale }, message.guild.members.get(client.user.id).displayName);
        }

        helpMessage = helpMessage.concat('\r\n')
            .concat(i18n.__({ phrase: 'To list all of the commands I can understand, just send **%s%s** to any channel I can read. Or, you can also DM me if you want!', locale: locale }, prefix, this.syntax[1])).concat('\r\n')
            .concat(i18n.__({ phrase: 'You can also check my documentation on %s!', locale: locale }, '<https://github.com/centurionfox/pronoun-bot>')).concat('\r\n')
            .concat(i18n.__({ phrase: 'Thanks! %s', locale: locale }, getHeart()));

        return message.reply(helpMessage);
    }
}
