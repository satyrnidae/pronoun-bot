import "reflect-metadata";
import { Container } from 'inversify';
import { SERVICE_IDENTIFIERS } from './constants';
import { Configuration, CommandRegistry, DataAccess } from './interfaces';
import { ConfigurationWrapper, CommandRegistryImpl, DataAccessImpl } from "./entities";

let container = new Container();

container.bind<Configuration>(SERVICE_IDENTIFIERS.CONFIGURATION).to(ConfigurationWrapper).inSingletonScope();
container.bind<CommandRegistry>(SERVICE_IDENTIFIERS.COMMAND_REGISTRY).to(CommandRegistryImpl).inSingletonScope();
container.bind<DataAccess>(SERVICE_IDENTIFIERS.DATA_ACCESS).to(DataAccessImpl).inSingletonScope();

export default container;
