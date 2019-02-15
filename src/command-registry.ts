import i18n = require('i18n')
import Enmap from 'enmap';
import HelpCommand from './help-command';
import ConfigurationWrapper from './configuration-wrapper';
import { Command } from './interfaces';

export default class CommandRegistry {
    commands: Enmap<string, Command> = new Enmap<string, Command>();

    constructor() {
        let helpCommand = new HelpCommand(() => this.commands);
        this.register(helpCommand);
    }

    register(command: Command): Enmap<string, Command> {
        const commandName = command.name.toLowerCase();
        if(this.commands.has(command.name)) {
            throw i18n.__('The command %s was already registered.', commandName);
        }
        return this.commands.set(commandName, command);
    }

    get(name: string): Command {
        return this.commands.get(name.toLowerCase());
    }
}