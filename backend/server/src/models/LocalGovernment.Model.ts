import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { District } from './District.Model';
import { State } from './State.Model';

export class LocalGovernmentArea extends Model<InferAttributes<LocalGovernmentArea>, InferCreationAttributes<LocalGovernmentArea>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare districts: NonAttribute<District[]>
    declare stateId : ForeignKey<State['id']>
    declare state: NonAttribute<State>

}