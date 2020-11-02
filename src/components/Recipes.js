import React, { Fragment } from 'react';
import Recipe from "./Recipe/Recipe";
import propTypes from 'prop-types';


const recipes = (props) => {
    
    let recipes = (
        <Fragment>
            {props.recipes.map((recipes) => {
                const ref = React.createRef();
                return <Recipe 
                name={recipes.name}
                img={recipes.img}  
                ingredients={recipes.ingredients.map((ingredient, index) => {
                return <li key={index}> {ingredient.quantity + " " + ingredient.unitOfMeasurement + " of " + ingredient.ingredient}</li>
                })}  
                directions={recipes.directions.map((direction, index) => {
                return <li key={index}>{direction}</li>
                })}
                key={recipes.id}
                ref={ref}
                delete={(event) => props.delete(event, recipes.id)}
                />
            })}
        </Fragment>
    );

    let resetButton;

    if (props.recipes.length == 0) {
    resetButton = 
        <div className="pb-2 d-flex flex-row justify-content-center">
        <button onClick={props.reset} className="text-center button submit-button col-lg-2">
            Restore default
        </button>
        </div> 
    }

    return (
        <Fragment>
            {resetButton}
            {recipes}
        </Fragment>
    );
};

recipes.propTypes = {
    recipes: propTypes.array,
    delete: propTypes.func,
    reset: propTypes.func
};

export default recipes;