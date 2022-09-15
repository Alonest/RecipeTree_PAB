import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipe {
    title: string;
    author: string;
}

export interface IRecipeModel extends IRecipe, Document {}

const RecipeSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IRecipeModel>('Recipe', RecipeSchema);
