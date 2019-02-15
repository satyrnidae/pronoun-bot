import "reflect-metadata";
import { Container } from 'inversify';
import { ServiceIdentifiers } from './constants';
import { Configuration, CommandRegistry } from './interfaces';
import { ConfigurationWrapper, CommandRegistryImpl } from './entities';

let container = new Container();

container.bind<Configuration>(ServiceIdentifiers.Configuration).to(ConfigurationWrapper).inSingletonScope();
container.bind<CommandRegistry>(ServiceIdentifiers.CommandRegistry).to(CommandRegistryImpl).inSingletonScope();

export default container;
