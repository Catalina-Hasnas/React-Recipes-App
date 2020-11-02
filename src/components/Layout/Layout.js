import React from 'react';
import './Layout.css'

const Layout = (props) => {
    return (
        <div className="App">
            <header className="py-3">
            <div className="container">
                <h2 className="font-weight-bold color-primary">Everyday <br/> Recipes</h2>
                <h5 className="font-weight-bold color-primary">For those who like to eat, but don't like to cook.</h5>
            </div>
            </header>
            <main>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
