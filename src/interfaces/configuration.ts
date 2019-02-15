import { Guild } from 'discord.js';

export default interface Configuration {
    token: string;
    prefix: string;
    welcomeMessage: boolean;
    trustAllCommands: boolean;
    trustAllEvents: boolean;

    getPrefix(guild: Guild): string;
    setPrefix(value: string, guild: Guild): boolean;

    getWelcomeMessage(guild: Guild): boolean;
    setWelcomeMessage(value: boolean, guild: Guild): boolean;
}
