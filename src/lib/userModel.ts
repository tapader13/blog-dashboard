import mongoose from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password?: string; // Make password optional
  image?: string;
  authProviderId?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false, // This will prevent the password from being included in query results by default
    },
    image: {
      type: String,
    },
    authProviderId: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
