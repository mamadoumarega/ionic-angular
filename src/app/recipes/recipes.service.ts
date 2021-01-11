import { Injectable } from '@angular/core';
import {Recipe} from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schitzel',
      imageUrl: 'https://via.placeholder.com/150',
      ingredients: ['French Fries', 'Sheep Meat', 'Salad' ]
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://via.placeholder.com/150',
      ingredients: ['Spaghetti', ' Meat', 'Tomatoes' ]
    }
  ];

  constructor() { }

  getAllRecipes(){
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return {...this.recipes.find(recipe => {
      // tslint:disable-next-line:triple-equals
      return recipe.id == recipeId;
    })};
  }

  deleteRecipe(recipeId: string){
    this.recipes = this.recipes.filter(recipes => {
      return recipes.id !== recipeId;
    });
  }
}
