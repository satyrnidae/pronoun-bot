import "reflect-metadata";
import { Container } from 'inversify';
import { ServiceIdentifiers } from '../constants';
import { Configuration, CommandRegistry } from '../interfaces';
import { ConfigurationWrapper, CommandRegistryImpl } from '../entities';

let container = new Container();

container.bind<Configuration>(ServiceIdentifiers.Configuration).to(ConfigurationWrapper);
container.bind<CommandRegistry>(ServiceIdentifiers.CommandRegistry).to(CommandRegistryImpl);

export default container;
