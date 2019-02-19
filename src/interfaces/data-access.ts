import Enmap from 'enmap';
import { Guild, User } from 'discord.js';

export interface PronounRole {
    name: string;
    roleId: string;
    guildId: string;
}

export default interface DataAccess {
    dataSource: Enmap;
    
    getRoles(guild: Guild): PronounRole[];
    addRole(role: PronounRole, guild: Guild): void;
    removeRole(role: PronounRole, guild: Guild): boolean;
    
    getGlobalRoles(): PronounRole[];
    addGlobalRole(role: PronounRole): void;
    removeGlobalRole(role: PronounRole): boolean;

    getUserRoles(user: User): PronounRole[];
    addUserRole(role: PronounRole, user: User): void;
    removeUserRole(role: PronounRole, user: User): boolean;

    getPrefix(guild: Guild): string;
    setPrefix(value: string, guild: Guild): void;

    getWelcomeMessageFlag(guild: Guild): boolean;
    setWelcomeMessageFlag(value: string, guild: Guild): void;
}