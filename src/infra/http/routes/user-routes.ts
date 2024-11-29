import { Router } from "express";
import { CreateUserController } from "../../controllers/user-controller";
import { GetUserByIdController } from "../../controllers/user-controller";
import { UserRepository } from "../../repositories/user-repository-imp";
import { prismaClient } from "../../database/prisma-client";

const userRoutes = Router();

const userRepository = UserRepository.build(prismaClient);

const createUserController = new CreateUserController(userRepository);
const getUserByIdController = new GetUserByIdController(userRepository);

userRoutes.post("/user", createUserController.handler);
userRoutes.get("/user/:id", getUserByIdController.handler);

export default userRoutes;
