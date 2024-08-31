
import { CreationOptional, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { LocalGovernmentArea } from './LocalGovernment.Model';

export class State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare localGovernmentAreas: NonAttribute<LocalGovernmentArea[]>;
    
}