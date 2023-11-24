import express from 'express'
import { UserControllers } from './users.controller'

const router = express.Router()

//will call cotroller func
router.post('/create-user', UserControllers.createUser)
router.get('/', UserControllers.getAllUser)
router.get('/:userId', UserControllers.getSpecificUser)
router.put('/:userId', UserControllers.updateUser)
router.put('/:userId/orders', UserControllers.updateOrderField)
router.get('/:userId/orders', UserControllers.getSpecificOrder)
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice)
router.delete('/:userId', UserControllers.deleteUserFromDb)

export const UserRoutes = router;