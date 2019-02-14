import Enmap from 'enmap';
import Command from './command';
import EventHandler from './event-handler';
import { Client } from 'discord.js';

export default class EventBus {

    constructor(public getCommand: () => Enmap<string, Command>, public client: Client) { }

    register(eventHandler: EventHandler): void {
        this.client.on(eventHandler.name, eventHandler.handle.bind(eventHandler, this.getCommand, this.client));
    }
}