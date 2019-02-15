import Enmap from 'enmap';
import { Client } from 'discord.js';
import { Command, EventHandler } from './interfaces';

export default class EventBus {

    constructor(public getCommand: () => Enmap<string, Command>, public client: Client) { }

    register(eventHandler: EventHandler): void {
        this.client.on(eventHandler.name, eventHandler.handle.bind(eventHandler, this.getCommand, this.client));
    }
}