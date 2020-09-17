import React from 'react';
import './Recipe.css';


const recipe = (props) => {
    return (
        <div>
            <div className="container background-primary pb-3">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <h2 className="flex-grow-1 p-3 font-weight-bold text-monospace text-center"><span className="border-top border-bottom border-dark">{props.name}</span></h2>
                        <button onClick={props.delete} className="delete-recipe">  Delete Recipe </button>
                </div>

                <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
                    <div className="col-lg-6">
                        <img className="img-fluid" src={props.img} alt="image here" />
                    </div>
                    <div>
                        <div className="mt-3 mr-5">
                            <h3 className="text-monospace color-primary ml-3">Ingredients:</h3>
                            <ul>
                                {props.ingredients}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className= "d-flex flex-column">
                    <h3 className="mt-5 ml-3 color-primary text-monospace">Directions:</h3>
                    <ol className="text-justify">
                        {props.directions}
                    </ol>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default recipe; 