import  { model, QueryOptions, Schema } from 'mongoose';
import { ILocation } from '../../types';


const DOCUMENT_NAME='Location'
const COLLECTION_NAME='locations'

const schema = new Schema({
    lat:{
        type:Number,
        required:[true,'You should provide location latitude']
    },
    lng:{
        type:Number,
        required:[true,'You should provide location longitude']
    }
  

},  { versionKey: false, timestamps: true })

schema.pre(/^find/, function (this: QueryOptions, next) {
    this.select('-createdAt -updatedAt')
  
    next();
  });
export const LocationModel = model<ILocation>(DOCUMENT_NAME, schema, COLLECTION_NAME);
