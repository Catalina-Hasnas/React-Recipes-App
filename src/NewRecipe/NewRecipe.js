import React, { Component } from 'react';
import './NewRecipe.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'


class NewRecipe extends Component {
    state = {
        name: "",
        ingredients: [],
        currentIngredient: 
            {
            id: "",
            quantity: 0,
            unitOfMeasurement: "pieces",
            ingredient: ""
            },
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
        let currentIngredient = {
            ...this.state.currentIngredient
        };
        currentIngredient[propertyName] = event.target.value;
        currentIngredient.id = Date.now();
        
        this.setState({ 
            currentIngredient: currentIngredient
        });
    }

    addIngredient(event) {
        event.preventDefault();
        let newIngredient = this.state.currentIngredient;
        const ingredients = [...this.state.ingredients, newIngredient]
          this.setState({
            ingredients: ingredients,
            currentIngredient: {
                id: "",
                quantity: 0,
                unitOfMeasurement: "pieces",
                ingredient: ""  
            }
          })
    }

    resetIngredient = () => {
        this.form.reset() 
      }

    deleteIngredient(id){
        const ingredients = [...this.state.ingredients];
        const ingredientIndex = this.state.ingredients.findIndex(ingredient => {
            return ingredient.id === id;
        });
        ingredients.splice(ingredientIndex,1);
        this.setState( {ingredients: ingredients} );
        }
    
    

    handleSubmit(event) {
        event.preventDefault();
        let userRecipe = {
            id: Date.now(),
            name: this.state.name,
            ingredients: [...this.state.ingredients],
            directions: this.state.directions.split("\n"),
            img: this.state.img
        }
        this.props.userRecipe(userRecipe);
    }       


    render() {
        return (    
            <div className="container text-center">
                <h2 className="text-monospace"> Upload your own recipe </h2>

            
                <form className="form background-primary p-3 mt-4">

                    
                    <div className="form-row d-flex align-items-center flex-wrap">
                        <div className="col-lg-7 form-group d-flex flex-column align-items-center">
                            <label for="name">Recipe name:</label>
                            <input onChange={(event) => this.handleChange(event)} name="name" type="text" placeholder="Mashed potatoes"/>
                        </div>
                    

                        <div className="col-lg-5 form-group">
                            {/* <input type="file" name="file-3[]" id="file-3" className="inputfile inputfile-3" />
                            <label for="file-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Upload an image&hellip;</span></label> */}
                            <label for="url">Recipe image URL</label>
                            <input onChange={(event) => this.handleChange(event)} type="url" name="img" placeholder="https://i.ibb.co/xgbxQHW/greek-salad.jpg"/>
                        </div>
                    </div>

                    <form ref={form => this.form = form} onSubmit={(event) => {this.addIngredient(event)}}>
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
                                    <button onClick={(event) => this.resetIngredient(event)} className="button ingr-button" type="submit"> Submit ingredient </button> 
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="form-group mt-3">
                        <textarea onChange={(event) => this.handleChange(event)} name="directions" type="text" placeholder="Recipe directions..."/>
                    </div>

                    <button onClick={(event) => this.handleSubmit(event)} className="button submit-button col-lg-3" type="submit"> Submit recipe </button>
                    
                </form>
            
                <div> 
                    <h1 className="text-muted">Preview:</h1>
                    <h2> Name: {this.state.name} </h2>
                    <ul> Ingredients: 
                        {this.state.ingredients.map((ingredient) => {
                            return <li key={ingredient.id}> {ingredient.quantity + " " + ingredient.unitOfMeasurement + " of " + ingredient.ingredient} 
                                        <FontAwesomeIcon onClick={(event, id=ingredient.id) => this.deleteIngredient(event, id)} className="ml-2 delete-button" icon={faTrash}/>
                                    </li>
                        })} 
                    </ul>
                    <ol> Directions:
                        {this.state.directions.split('\n').map(direction => {
                            return <li>{direction}</li>
                        })}
                    </ol>
                    <p>Image:</p>
                    <img style={{maxHeight: 525}} src={this.state.img} alt="please try another link"/>
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



export default NewRecipe; 