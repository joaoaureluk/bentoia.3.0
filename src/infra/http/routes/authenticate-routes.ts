import { UserRepository } from "../../repositories/user-repository-imp";
import { prismaClient } from "../../database/prisma-client";
import { Router } from "express";
import { AuthenticateController } from "../../controllers/authenticate-controller";

const authRoutes = Router();

const userRepository = UserRepository.build(prismaClient);

const createUserController = new AuthenticateController(userRepository);

authRoutes.post("/auth", createUserController.handler);

export default authRoutes;
