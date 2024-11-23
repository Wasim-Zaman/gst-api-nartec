import Joi from "joi";
import MyError from "../utils/error.js";
import { addDomain, deleteFile } from "../utils/file.js";
import prisma from "../utils/prismaClient.js";
import response from "../utils/response.js";

const menuSchema = Joi.object({
  nameEn: Joi.string().required(),
  nameAr: Joi.string().required(),
  status: Joi.number().valid(0, 1).required(),
  image: Joi.string().allow("", null),
});

class MenuController {
  static async createMenu(req, res, next) {
    let imagePath;
    try {
      const { error, value } = menuSchema.validate(req.body);
      if (error) {
        throw new MyError(error.details[0].message, 400);
      }

      if (req.file) {
        imagePath = addDomain(req.file.path);
        value.image = imagePath;
      }

      const menu = await prisma.menu.create({
        data: value,
      });

      res
        .status(201)
        .json(response(201, true, "Menu created successfully", { menu }));
    } catch (error) {
      if (imagePath) {
        await deleteFile(imagePath);
      }
      next(error);
    }
  }

  static async getMenus(req, res, next) {
    try {
      const menus = await prisma.menu.findMany({
        include: {
          subMenus: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res
        .status(200)
        .json(response(200, true, "Menus retrieved successfully", { menus }));
    } catch (error) {
      next(error);
    }
  }

  static async getActiveMenus(req, res, next) {
    try {
      const menus = await prisma.menu.findMany({
        where: {
          status: 1,
        },
        include: {
          subMenus: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res
        .status(200)
        .json(
          response(200, true, "Active menus retrieved successfully", { menus })
        );
    } catch (error) {
      next(error);
    }
  }

  static async getMenu(req, res, next) {
    try {
      const { id } = req.params;

      const menu = await prisma.menu.findUnique({
        where: { id },
        include: {
          subMenus: true,
        },
      });

      if (!menu) {
        throw new MyError("Menu not found", 404);
      }

      res
        .status(200)
        .json(response(200, true, "Menu retrieved successfully", { menu }));
    } catch (error) {
      next(error);
    }
  }

  static async updateMenu(req, res, next) {
    let imagePath;
    try {
      const { id } = req.params;
      const { error, value } = menuSchema.validate(req.body);

      if (error) {
        throw new MyError(error.details[0].message, 400);
      }

      const existingMenu = await prisma.menu.findUnique({
        where: { id },
      });

      if (!existingMenu) {
        throw new MyError("Menu not found", 404);
      }

      if (req.file) {
        imagePath = addDomain(req.file.path);
        if (existingMenu.image) {
          await deleteFile(existingMenu.image);
        }
        value.image = imagePath;
      }

      const menu = await prisma.menu.update({
        where: { id },
        data: value,
        include: {
          subMenus: true,
        },
      });

      res
        .status(200)
        .json(response(200, true, "Menu updated successfully", { menu }));
    } catch (error) {
      if (imagePath) {
        await deleteFile(imagePath);
      }
      next(error);
    }
  }

  static async deleteMenu(req, res, next) {
    try {
      const { id } = req.params;

      const existingMenu = await prisma.menu.findUnique({
        where: { id },
      });

      if (!existingMenu) {
        throw new MyError("Menu not found", 404);
      }

      if (existingMenu.image) {
        await deleteFile(existingMenu.image);
      }

      await prisma.menu.delete({
        where: { id },
      });

      res
        .status(200)
        .json(response(200, true, "Menu deleted successfully", null));
    } catch (error) {
      next(error);
    }
  }
}

export default MenuController;
