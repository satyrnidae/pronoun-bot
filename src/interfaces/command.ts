import { Client, Message } from 'discord.js';
import { Options, Arguments } from 'yargs-parser';

export default interface Command {
    name: string;
    syntax: string[];
    description: string;
    options: Options;

    run(client: Client, message: Message, args: Arguments): any;

    checkPermissions(message: Message): boolean;
}
