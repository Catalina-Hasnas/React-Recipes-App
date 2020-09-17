import 'bootstrap/dist/css/bootstrap.min.css';


import React, { Component } from 'react';
import Recipe from "./Recipe/Recipe";
import NewRecipe from "./NewRecipe/NewRecipe";
import './App.css';
import avocadoToastImg from "./img/avocado-toast.jpg";
import greekSaladImg from "./img/greek-salad.jpg";
import mushroomCreamSoupImg from "./img/mushroom-cream-soup.jpg";

class App extends Component {
  state = {
    recipes: [
      {id: Date.now(), 
      name: "Avocado Toast", 
      ingredients: [ 
        {quantity: 0.5, unitOfMeasurement: "pieces", ingredient: "avocado"}, 
        {quantity: 0.5, unitOfMeasurement: "teaspoons", ingredient: "lemon juice"}, 
        {quantity: 1, unitOfMeasurement: "pinch", ingredient: "Kosher salt"}, 
        {quantity: 1, unitOfMeasurement: "pinch", ingredient: "freshly ground black pepper"}, 
        {quantity: 1, unitOfMeasurement: "slices", ingredient: "whole grain bread, toasted"}, 
        {quantity: 0.5, unitOfMeasurement: "teaspoons", ingredient: "olive oil"}
      ],
      directions: ["In a small bowl, combine avocado, lemon juice, salt, and pepper. Gently mash with the back of a fork.", "Top toasted bread with mashed avocado mixture. Drizzle with olive oil and sprinkle over desired toppings."],
      img: avocadoToastImg
    },
      {id: Date.now(),
      name: "Greek Salad",
      ingredients: [ 
        {quantity: 1, unitOfMeasurement: "pieces", ingredient: "cucumber"},
        {quantity: 1, unitOfMeasurement: "pieces", ingredient: "red bell pepper"}, 
        {quantity: 1, unitOfMeasurement: "pints", ingredient: "tomatoes"}, 
        {quantity: 1, unitOfMeasurement: "pieces", ingredient: "red onion"}, 
        {quantity: 0.5, unitOfMeasurement: "pounds", ingredient: "feta cheese"}, 
        {quantity: 0.5, unitOfMeasurement: "cups", ingredient: "calamata olives"},
        {quantity: 0.25, unitOfMeasurement: "cups", ingredient: "vinegar"},
        {quantity: 1, unitOfMeasurement: "teaspoons", ingredient: "kosher salt"},
        {quantity: 0.5, unitOfMeasurement: "teaspoons", ingredient: "freshly ground black pepper"},
        {quantity: 0.5, unitOfMeasurement: "cups", ingredient: "olive oil"}
      ],
      directions: ["Place the cucumber, peppers, tomatoes and red onion in a large bowl.", "For the vinaigrette, whisk together the garlic, oregano, mustard, vinegar, salt and pepper in a small bowl. Still whisking, slowly add the olive oil to make an emulsion. Pour the vinaigrette over the vegetables. Add the feta and olives and toss lightly. Set aside for 30 minutes to allow the flavors to blend. Serve at room temperature."],
      img: greekSaladImg
    },
      {id: Date.now(),
      name: "Mushroom Cream Soup",
      ingredients: [
        {quantity: 4, unitOfMeasurement: "tablespoons", ingredient: "butter"}, 
        {quantity: 1, unitOfMeasurement: "tablespoons", ingredient: "oil"},
        {quantity: 2, unitOfMeasurement: "pieces", ingredient: "onions"}, 
        {quantity: 4, unitOfMeasurement: "cloves", ingredient: "garlic"}, 
        {quantity: 1.5, unitOfMeasurement: "pounds", ingredient: "mushrooms"},
        {quantity: 4, unitOfMeasurement: "teaspoons", ingredient: "thyme"},
        {quantity: 6, unitOfMeasurement: "tablespoons", ingredient: "flour"},
        {quantity: 4, unitOfMeasurement: "cups", ingredient: "chicken broth"},
        {quantity: 1, unitOfMeasurement: "teaspoons", ingredient: "salt"},
        {quantity: 1, unitOfMeasurement: "teaspoons", ingredient: "freshly ground black pepper"},
        {quantity: 1, unitOfMeasurement: "cups", ingredient: "heavy cream"},
        {quantity: 1, unitOfMeasurement: "teaspoons", ingredient: "fresh parsley"}
      ],
      directions: ["Heat butter and oil in a large pot over medium-high heat until melted. Sauté onion for 2 to 3 minutes until softened. Cook garlic until fragrant, about 1 minute.", "Add mushrooms and 2 teaspoons thyme, cook for 5 minutes. Pour in wine and allow to cook for 3 minutes.", "Sprinkle mushrooms with flour, mix well and cook for 2 minutes. Add stock, mix again and bring to a boil. Reduce heat to low-medium heat, season with salt, pepper and crumbled bouillon cubes.", "Cover and allow to simmer for 10-15 minutes, while occasionally stirring, until thickened.", "Reduce heat to low, stir in cream or half and half. Allow to gently simmer (do not boil). Adjust salt and pepper to your taste.", "Mix in parsley and remaining thyme. Serve warm."],
      img: mushroomCreamSoupImg
    }
    ]
  };

  userRecipe(userRecipe) {
    let recipes = [...this.state.recipes, userRecipe];
    this.setState({
      recipes: recipes
    });
    console.log(recipes);
  }

  deleteRecipe(event, id){
    event.preventDefault();
    let recipes = [...this.state.recipes];
    const recipesIndex = this.state.recipes.findIndex(recipe => {
        return recipe.id === id;
    });
    recipes.splice(recipesIndex,1);
    this.setState( {recipes: recipes} );
  }

  render() {
    let recipes = (
      <div>
        {this.state.recipes.map((recipes) => {
          return <Recipe 
          name={recipes.name}
          img={recipes.img}  
          ingredients={recipes.ingredients.map((ingredient) => {
            return <li> {ingredient.quantity + " " + ingredient.unitOfMeasurement + " of " + ingredient.ingredient}</li>
          })}  
          directions={recipes.directions.map((direction) => {
            return <li>{direction}</li>
          })}
          key={recipes.id}
          delete={(event) => this.deleteRecipe(event, recipes.id)}
          />
        })}
      </div>
    );

   

    return (
      <div className="App">
        <header className="py-3">
          <div className="container">
            <h2 className="font-weight-bold color-primary">Everyday <br/> Recipes</h2>
            <h5 className="font-weight-bold color-primary">For those who like to eat, but don't like to cook.</h5>
          </div>
        </header>

        {recipes}

        <NewRecipe
          userRecipe={(userRecipe) => this.userRecipe(userRecipe)}/>

      </div>
    );
  }
}

export default App;
