import fs = require('fs');
import i18n = require('i18n');
import { Guild } from 'discord.js';
import { injectable } from 'inversify';
import { Configuration, JsonConfiguration } from '../interfaces';

@injectable()
export default class ConfigurationWrapper implements Configuration {
    configuration: JsonConfiguration;

    constructor() {
        this.configuration = <JsonConfiguration>JSON.parse(fs.readFileSync(`${__dirname}/../../config/config.json`).toString())
    }

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
        if (guild) {
            //TODO: Data access
        }
        return this.prefix;
    }

    setPrefix(value: string, guild: Guild) {
        if (!guild) throw i18n.__('Cannot set default prefix value!')
        //TODO: Data access\
        return true;
    }

    getWelcomeMessage(guild: Guild): boolean {
        if (guild) {
            //TODO: Data access
        }
        return this.welcomeMessage;
    }

    setWelcomeMessage(value: boolean, guild: Guild): boolean {
        if (!guild) throw i18n.__('Cannot set default welcome message flag!')
        return true;
    }

    get trustAllCommands(): boolean {
        return this.configuration.trustAllCommands;
    }

    get trustAllEvents(): boolean {
        return this.configuration.trustAllEvents;
    }
}
