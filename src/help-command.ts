import Command from './command';
import { Client, Message } from 'discord.js';
import { Options, Arguments } from 'yargs-parser';

export default class HelpCommand implements Command {
    name: string;
    syntax: string;
    description: string;
    options: Options;

    run(client: Client, message: Message, args: Arguments): boolean {
        throw new Error("Method not implemented.");
    }

    checkPermissions(message: Message): boolean {
        throw new Error("Method not implemented.");
    }


}