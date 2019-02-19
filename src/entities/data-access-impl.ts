import Enmap from 'enmap';
import { Guild, User } from 'discord.js';
import { DataAccess, Configuration, PronounRole } from "../interfaces";
import { injectable, inject } from "inversify";
import { SERVICE_IDENTIFIERS } from "../constants";

@injectable()
export default class DataAccessImpl implements DataAccess {
    dataSource: Enmap<string | number, any>;

    constructor(@inject(SERVICE_IDENTIFIERS.CONFIGURATION) public configuration: Configuration) { }

    getRoles(guild: Guild): PronounRole[] {
        throw new Error("Method not implemented.");
    }
    addRole(role: PronounRole, guild: Guild): void {
        throw new Error("Method not implemented.");
    }
    removeRole(role: PronounRole, guild: Guild): boolean {
        throw new Error("Method not implemented.");
    }
    getGlobalRoles(): PronounRole[] {
        throw new Error("Method not implemented.");
    }
    addGlobalRole(role: PronounRole): void {
        throw new Error("Method not implemented.");
    }
    removeGlobalRole(role: PronounRole): boolean {
        throw new Error("Method not implemented.");
    }
    getUserRoles(user: User): PronounRole[] {
        throw new Error("Method not implemented.");
    }
    addUserRole(role: PronounRole, user: User): void {
        throw new Error("Method not implemented.");
    }
    removeUserRole(role: PronounRole, user: User): boolean {
        throw new Error("Method not implemented.");
    }
    getPrefix(guild: Guild): string {
        throw new Error("Method not implemented.");
    }
    setPrefix(value: string, guild: Guild): void {
        throw new Error("Method not implemented.");
    }
    getWelcomeMessageFlag(guild: Guild): boolean {
        throw new Error("Method not implemented.");
    }
    setWelcomeMessageFlag(value: string, guild: Guild): void {
        throw new Error("Method not implemented.");
    }
}