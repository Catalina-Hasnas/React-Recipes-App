import React, { Component } from 'react';
import './NewRecipe.css' 


class NewRecipe extends Component {
    state = {
        name: "",
        ingredients : [
            {
            id: "",
            quantity: 0,
            unitOfMeasurement: "pieces",
            ingredient: ""
            }
        ],
        directions: "",
        img: ""
    };
    

    handleChange(event) { 
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value
        });  
    }

    handleIngredientChange(event, propertyName) {
        const ingredient = {
            ...this.state.ingredients[0]
        };
        ingredient[propertyName] = event.target.value;
        let ingredients = [...this.state.ingredients];
        ingredients[0] = ingredient;
        this.setState({ 
            ingredients: ingredients
        });
    }

    addIngredient(event) {
        event.preventDefault();
        let ingredients = [...this.state.ingredients];
        let newIngredient = {
            id: Date.now(),
            quantity: ingredients.quantity,
            unitOfMeasurement: ingredients.unitOfMeasurement,
            ingredient: ingredients.ingredient,
        };
          this.setState({
            ingredients: [...this.state.ingredients, newIngredient]
          })
    }


    // handleSubmit(event) {
    //     alert('A name was submitted: ' + this.state.name);
    //     event.preventDefault();
    //   }

    
    render() {
        return (    
            <div className="container text-center">
                <h2 className="text-monospace"> Upload your own recipe </h2>

            
                <form className="form background-primary p-3 mt-4">

                    
                    <div className="form-row d-flex align-items-center flex-wrap">
                        <div className="col-lg-8 form-group d-flex flex-column align-items-center">
                            <label for="name">Recipe name:</label>
                            <input onChange={(event) => this.handleChange(event)} name="name" type="text" placeholder="Mashed potatoes"/>
                        </div>
                    

                        <div className="mt-4 col-lg-4 form-group">
                            <input type="file" name="file-3[]" id="file-3" className="inputfile inputfile-3" />
                            <label for="file-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Upload an image&hellip;</span></label>
                        </div>
                    </div>

                    <form onSubmit={(event) => {this.addIngredient(event)}}>
                        <div className="form-row">
                            <div className="d-flex flex-row flex-wrap align-items-center">
                                <div className="fivepxpadding  form-group col-lg-3">
                                    <label for="quantity">Quantity:</label>
                                    <input onChange={(event, propertyName="quantity") => this.handleIngredientChange(event, propertyName)} name="quantity" type="number" placeholder="6" />
                                </div>
                                <div className="form-group col-lg-3">
                                    <label for="unitOfMeasurement">Unit of measurement:</label>
                                    <select className="p-2" onChange={(event, propertyName="unitOfMeasurement") => this.handleIngredientChange(event, propertyName)} name="unitOfMeasurement" id="metric" name="metric">
                                        <option value="pieces">pieces</option>
                                        <option value="miligrams">miligrams</option>
                                        <option value="grams">grams</option>
                                        <option value="kilograms">kilograms</option>
                                        <option value="liters">liters</option>
                                        <option value="mililiter">mililiters</option>
                                    </select>
                                </div>
                                <div className="form-group col-lg-3">
                                    <label for="ingredient">Ingredient:</label>
                                    <input onChange={(event, propertyName="ingredient") => this.handleIngredientChange(event, propertyName)} name="ingredient" type="text" placeholder="potatoes" />
                                </div>
                                <div className="col-lg-3 align-self-center">
                                    <button className="button ingr-button" type="submit"> Submit ingredient </button> 
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="form-group mt-3">
                        <textarea onChange={(event) => this.handleChange(event)} name="directions" type="text" placeholder="Recipe directions..."/>
                    </div>

                    <button className="button submit-button col-lg-3" type="submit"> Submit recipe </button>

                </form>
            

                 
                <div> 
                    <h2> Name: {this.state.name} </h2>
                    <ul> Ingredients: 
                        {this.state.ingredients.map((ingredient, index) => {
                            return <li key={index}> {ingredient.quantity + " " + ingredient.unitOfMeasurement + " of " + ingredient.ingredient} </li>
                        })} 
                    </ul>
                    <p>Directions: {this.state.directions} </p>
                </div>

                


                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

// const NewRecipe = () => {
//     return <NewRecipe />
// }


export default NewRecipe; 