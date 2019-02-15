import fs = require('fs');
import i18n = require('i18n');
import { Guild } from 'discord.js';

interface Configuration {
    token: string;
    prefix: string;
    welcomeMessage: boolean;
    trustAllCommands: boolean;
    trustAllEvents: boolean;
}

export class ConfigurationWrapper {
    
    constructor(private configuration: Configuration) { }

    get token(): string {
        return this.configuration.token;
    }

    set token(token: string) {
        this.configuration.token = token;
    }

    get prefix(): string {
        return this.configuration.prefix;
    }

    get welcomeMessage(): boolean {
        return this.configuration.welcomeMessage;
    }

    getPrefix(guild: Guild): string {
        if(guild) {
            //TODO: Data access
        }
        return this.prefix;
    }

    setPrefix(value: string, guild: Guild) {
        if(!guild) throw i18n.__('Cannot set default prefix value!')
        //TODO: Data access
    }

    shouldShowWelcomeMessage(guild: Guild): boolean {
        if(guild) {
            //TODO: Data access
        }
        return this.welcomeMessage;
    }

    setShowWelcomeMessage(value: boolean, guild: Guild) {
        if(!guild) throw i18n.__('Cannot set default welcome message flag!')
    }

    get trustAllCommands(): boolean { 
        return this.configuration.trustAllCommands; 
    }

    get trustAllEvents(): boolean {
        return this.configuration.trustAllEvents;
    }
}

var configuration = new ConfigurationWrapper(<Configuration>JSON.parse(fs.readFileSync(`${__dirname}/../config/config.json`).toString()));
export default configuration;
