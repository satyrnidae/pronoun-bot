import Enmap from 'enmap';
import Command from '../src/command';
import EventHandler from '../src/event-handler';
import { Client, Message } from 'discord.js';

export default class MessageEvent implements EventHandler {
    name: string;    
    handle(getCommands: () => Enmap<string, Command>, client: Client, message: Message, ..._args: any[]): boolean {
        throw new Error("Method not implemented.");
    }


}