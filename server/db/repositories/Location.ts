import { Types } from 'mongoose';
import { ILocation } from '../../types';
import { LocationModel } from '../model/Location';

export default class LocationRepo {
  public static async create(location: ILocation): Promise<ILocation> {
    return await LocationModel.create(location);
  }

  public static async find(): Promise<ILocation[]> {
    return await LocationModel.find({}).lean<ILocation[]>().exec();
  }

  public static async updateOne(
    id: Types.ObjectId,
    obj: ILocation
  ): Promise<ILocation | null> {
    return await LocationModel.findByIdAndUpdate(id, obj, {
      new: true,
      runValidators: true,
    });
  }

  public static async deleteOne(id: Types.ObjectId): Promise<ILocation|null> {
    return await LocationModel.findByIdAndDelete(id);     
  }

  public static async findOne(id: Types.ObjectId): Promise<ILocation | null> {
    return await LocationModel.findById(id);
  }

  public static async deleteAll(): Promise<void> {
    await LocationModel.deleteMany();
  }
}
