import { Request, Response } from 'express';
import { userServices } from './users.service';
import userValidationSchema from './users.validation';
import userUpdateValidationSchema from './user.update.validation';
import orderValidationSchema from './user.order.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // data validation with zod

    const zodParseData = userValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDb(zodParseData);

    res.status(200).json({
      success: true,
      message: 'user created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.errors,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSpecificUser(userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = userUpdateValidationSchema.parse(userData)

    const { userId } = req.params;

    const result = await userServices.updateUser(userId, zodParseData);

    res.status(200).json({
      success: true,
      message: 'user updated succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const updateOrderField = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = orderValidationSchema.parse(userData)
    const { userId } = req.params;

    const result = await userServices.updateOrderField(userId, zodParseData);
    res.status(200).json({
      success: true,
      message: 'order created succesfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not updated',
      error: {
        code: 404,
        description: 'User not updated!',
      },
    });
  }
};

const deleteUserFromDb = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSpecificOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSpecificOrder(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSpecificUser,
  updateUser,
  deleteUserFromDb,
  updateOrderField,
  getSpecificOrder,
  getTotalPrice,
};
