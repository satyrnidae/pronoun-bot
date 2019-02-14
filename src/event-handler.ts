import Enmap from 'enmap';
import Command from './command'
import { Client } from 'discord.js';

export default interface EventHandler {
    name: string;

    handle(getCommands: () => Enmap<string, Command>, client: Client, ...args: any[]): boolean;
}