import Enmap from 'enmap';
import { Command } from '.';

export default interface CommandRegistry {
    commands: Enmap<string, Command>;

    register(command: Command): Enmap<string, Command>;

    get(name: string): Command;

    getAll(): Command[];
}