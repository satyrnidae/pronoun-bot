import i18n = require('i18n')
import Enmap from 'enmap';
import { injectable } from 'inversify';
import { Command, CommandRegistry } from '../interfaces';

@injectable()
export default class CommandRegistryImpl implements CommandRegistry {
    commands: Enmap<string, Command> = new Enmap<string, Command>();

    register(command: Command): Enmap<string, Command> {
        const commandName = command.name.toLowerCase();
        if (this.commands.has(command.name)) {
            throw i18n.__('The command %s was already registered.', commandName);
        }
        return this.commands.set(commandName, command);
    }

    get(name: string): Command {
        return this.commands.get(name.toLowerCase());
    }

    getAll(): Command[] {
        var commands: Command[] = [];
        this.commands.forEach(command => commands.push(command));
        return commands;
    }
}
