import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  facebookId: string;
}

const UserSchema: Schema = new Schema({
  facebookId: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
