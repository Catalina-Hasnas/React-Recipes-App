import React, {Component} from 'react';
import './NewRecipe.css'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const validateForm = (...errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class NewRecipe extends Component {
    state = {
        name: "",
        ingredients: [],
        currentIngredient: 
            {
            id: "",
            quantity: "",
            unitOfMeasurement: "pieces",
            ingredient: ""
            },
        directions: "",
        img: "",
        errors: {
            name: '',
            quantity: '',
            ingredient: '',
        }
    };
    
    handleChange(event) { 
        const { name, value } = event.target;
        let errors = this.state.errors;

        let noSpace = value.replace(/ /g,"");
        let length = noSpace.length;

        if (name === 'name') {
            if (RegExp(/^[a-zA-Z\s]*$/).test(value)) {
                if (length < 4 || length >= 30) {
                    errors.name='Name must be between 4 and 30 characters'
                } else if (length >=4 && length < 30) {
                    errors.name=''
                }
            } else {
                errors.name = 'Name must not contain any numbers'
            }
        }

        this.setState({
            errors, [name]: value
        })
    }

    handleIngredientChange(event, propertyName) {
        let currentIngredient = {
            ...this.state.currentIngredient
        };
        const { name, value } = event.target;
        
        currentIngredient[propertyName] = value;
        currentIngredient.id = Date.now();
        let errors = this.state.errors;

        let noSpace = value.replace(/ /g,"");
        let length = noSpace.length;

       if (name === 'quantity') {
           if (RegExp(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/).test(value)) {
               if (length >= 4) {
                   errors.quantity = "Quantity can't have more than 4 digits"
               } else if (length < 4) {
                   errors.quantity = ''
               }
           } else {
               errors.quantity = 'Quantity must be a number greater than 0'
           }
       }

       if (name === 'ingredient') {
           if (RegExp(/^[a-zA-Z\s]*$/).test(value)) {
               if (length < 3 || length >= 30) {
                   errors.ingredient = 'Ingredient must be between 3 and 30 characters'
               } else if (length >=3) {
                   errors.ingredient = ''
               }
           } else {
               errors.ingredient = 'Ingredient must not contain any numbers'
           }
       }
        this.setState({ 
            errors, currentIngredient: currentIngredient
        })
    }

    addIngredient(event) {
        event.preventDefault();
        let newIngredient = this.state.currentIngredient;
        let ingredients = [...this.state.ingredients];

        if (newIngredient.quantity !== "" && newIngredient.ingredient !== "") {
            if(validateForm(this.state.errors.quantity, this.state.errors.ingredient)) {
                ingredients = [...this.state.ingredients, newIngredient]
            } else {
                alert ('Invalid Ingredient')
            }
        } else {
            alert ("Ingredient can't be empty")
        }

          this.setState({
            ingredients: ingredients,
            currentIngredient: {
                id: "",
                quantity: "",
                unitOfMeasurement: "pieces",
                ingredient: ""  
            }
          })
    }

    resetIngredient = () => {
        this.ingredient.reset() 
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

        if (this.state.name !== "") {
            if(validateForm(this.state.errors)) {

                let userRecipe = {
                    id: Date.now(),
                    name: this.state.name,
                    ingredients: [...this.state.ingredients],
                    directions: this.state.directions.split("\n"),
                    img: this.state.img
                }
                this.props.userRecipe(userRecipe);

                this.form.reset();

                this.setState({
                    name: "",
                    ingredients: [],
                    directions: "",
                    img: ""  
                })

            } else {
                alert('Invalid Form')
            }
        } else {
            alert("You can't leave name empty")
        }
    } 
       
    render() {

        const {errors, formValid} = this.state;

        return (    
            <div  className="container text-center">
                <h2 className="text-monospace"> Upload your own recipe </h2>

            
                <form ref={form => this.form = form} className="form background-primary p-3 mt-4">

                    
                    <div className="form-row d-flex align-items-center flex-wrap">
                        <div className="col-lg-7 form-group d-flex flex-column align-items-center">
                            <label htmlFor="name">Recipe name:</label>
                            <input onChange={(event) => this.handleChange(event)} name="name" type="text" placeholder="Mashed potatoes" noValidate required/>
                        </div>

                        <div className="col-lg-5 form-group">
                            {/* <input type="file" name="file-3[]" id="file-3" className="inputfile inputfile-3" />
                            <label htmlFor="file-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Upload an image&hellip;</span></label> */}
                            <label htmlFor="url">Image URL</label>
                            <input onChange={(event) => this.handleChange(event)} type="url" name="img" placeholder="https://i.ibb.co/xgbxQHW/greek-salad.jpg"/>
                        </div>
                    </div>

                    <div>
                        {errors.name.length > 0 && 
                            <small className="text-danger">{errors.name}</small>}
                    </div>

                    <form ref={ingredient => this.ingredient = ingredient} onSubmit={(event) => {this.addIngredient(event)}} noValidate>
                        <div className="form-row">
                            <div className="d-flex flex-row flex-wrap align-items-center">
                                <div className="fivepxpadding  form-group col-lg-3">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input onChange={(event, propertyName="quantity") => this.handleIngredientChange(event, propertyName)} name="quantity" type="" placeholder="6" noValidate required/>
                                </div>
                                <div className="form-group col-lg-3">
                                    <label htmlFor="unitOfMeasurement">Unit of measurement:</label>
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
                                    <label htmlFor="ingredient">Ingredient:</label>
                                    <input onChange={(event, propertyName="ingredient") => this.handleIngredientChange(event, propertyName)} name="ingredient" type="text" placeholder="potatoes" noValidate required/>
                                </div>
                                <div className="col-lg-3 align-self-center">
                                    <button onClick={(event) => this.resetIngredient(event)} className="button ingr-button" type="submit"> Submit ingredient </button> 
                                </div>
                            </div>
                            <div>
                                {errors.quantity.length > 0 && 
                                    <small className="text-danger text-center">{errors.quantity}</small>}
                                    <br/>
                                {errors.ingredient.length > 0 && 
                                    <small className="text-danger text-center">{errors.ingredient}</small>}
                            </div>
                        </div>
                    </form>

                    <div className="form-group mt-3">
                        <textarea onChange={(event) => this.handleChange(event)} name="directions" type="text" placeholder="Recipe directions..."/>
                    </div>

                    <button onClick={(event) => this.handleSubmit(event)} className="button submit-button col-lg-3" type="submit"> Submit recipe </button>
                    
                </form>
            
                <div> 
                    <h2 className="text-muted">Preview:</h2>
                    <h2> Name: {this.state.name} </h2>
                    <ul> Ingredients: 
                        {this.state.ingredients.map((ingredient) => {
                            return <li key={ingredient.id}> {ingredient.quantity + " " + ingredient.unitOfMeasurement + " of " + ingredient.ingredient} 
                                        <FontAwesomeIcon onClick={(event, id=ingredient.id) => this.deleteIngredient(event, id)} className="ml-2 delete-button" icon={faTrash}/>
                                    </li>
                        })} 
                    </ul>
                    <ol> Directions:
                        {this.state.directions.split('\n').map((direction, index) => {
                            return <li key={index}>{direction}</li>
                        })}
                    </ol>
                    <p>Image:</p>
                    <img className="img-fluid" src={this.state.img} alt="please try another link"/>
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