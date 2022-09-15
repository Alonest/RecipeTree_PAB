import express from 'express';
import controller from '../controllers/Recipe';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.recipe.create), controller.createRecipe);
router.get('/get/:recipeId', controller.readRecipe);
router.get('/get', controller.readAll);
router.patch('/update/:recipeId', ValidateSchema(Schemas.recipe.update), controller.updateRecipe);
router.delete('/delete/:recipeId', controller.deleteRecipe);

export = router;