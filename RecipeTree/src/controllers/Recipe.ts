import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Recipe from '../models/Recipe';

const createRecipe = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return recipe
        .save()
        .then((recipe) => res.status(201).json({ recipe }))
        .catch((error) => res.status(500).json({ error }));
};

const readRecipe = (req: Request, res: Response, next: NextFunction) => {
    const recipeId = req.params.recipeId;

    return Recipe.findById(recipeId)
        .then((recipe) => (recipe ? res.status(200).json({ recipe }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Recipe.find()
        .then((recipes) => res.status(200).json({ recipes }))
        .catch((error) => res.status(500).json({ error }));
};

const updateRecipe = (req: Request, res: Response, next: NextFunction) => {
    const recipeId = req.params.recipeId;

    return Recipe.findById(recipeId)
        .then((recipe) => {
            if (recipe) {
                recipe.set(req.body);

                return recipe
                    .save()
                    .then((recipe) => res.status(201).json({ recipe }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteRecipe = (req: Request, res: Response, next: NextFunction) => {
    const recipeId = req.params.recipeId;

    return Recipe.findByIdAndDelete(recipeId)
        .then((recipe) => (recipe ? res.status(201).json({ recipe, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createRecipe, readRecipe, readAll, updateRecipe, deleteRecipe };