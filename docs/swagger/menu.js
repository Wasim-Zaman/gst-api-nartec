/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         nameEn:
 *           type: string
 *         nameAr:
 *           type: string
 *         status:
 *           type: number
 *           enum: [0, 1]
 *         image:
 *           type: string
 *
 * /api/menu/v1:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nameEn:
 *                 type: string
 *               nameAr:
 *                 type: string
 *               status:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Menu created successfully
 *
 *   get:
 *     summary: Get all menus
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of menus retrieved successfully
 *
 * /api/menu/v1/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a menu
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a menu
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 */
