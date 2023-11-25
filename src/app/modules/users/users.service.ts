import { Users } from './users.interface';
import { UserModel } from './users.model';

const createUserIntoDb = async (user: Users) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUser = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  ).select('-password');
  return result;
};

const getSpecificUser = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (userExists === null) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOne({ userId }).select('-password');
  return result;
};

const updateUser = async (userId: string, userData: Users) => {
  const userExists = await UserModel.isUserExists(userId);

  if (userExists === null) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    $set: userData,
    new: true,
    runValidators: true,
  }).select('-password');

  return result;
};
const updateOrderField = async (userId: string, userData: Users) => {
  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    $addtoset: userData,
    new: true,
  });
  return result;
};

const deleteUser = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (userExists === null) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

//
const getSpecificOrder = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (userExists === null) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};

const getTotalPrice = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (userExists === null) {
    throw new Error('User not found');
  }

  const total = await UserModel.findOne({ userId });

  const totalPrice = total?.orders?.reduce(
    (total, order) => total + order.price * order.quantity,
    0,
  );

  return { totalPrice };
};

export const userServices = {
  createUserIntoDb,
  getAllUser,
  getSpecificUser,
  deleteUser,
  updateUser,
  updateOrderField,
  getSpecificOrder,
  getTotalPrice,
};
