import React from 'react';
import Button from 'react-bootstrap/Button';
import { isAbsolute } from 'path';

const divStyle = {
    //backgroundColor: '#94E1B0',
    border: "solid #8c1515",
    borderWidth: '4px',
};

const headerStyle = {
    top: '10%',
    color: '#8c1515',
    fontFamily: 'Open Sans Condensed, sans-serif',
    //fontFamily: 'Futura Std Condensed Light, sans-serif',
};

const buttonStyle = {
    marginLeft: '10%',
    marginRight: '10%',
};

const footerStyle = {
    textAlign: 'center',
    fontFamily: 'Bad Script, cursive',
    fontWeight: 'bold',
};

const footer2Style = {
    marginLeft: '20%',
    marginRight: '20%',
};

function ViewPastData() {
    return (
        <Button variant="outline-danger" href="pastdata">
            View Past Data
        </Button>
    )
}

function Calculator() {
    return (
        <Button variant="outline-danger" href="calculator">
            Calculate Your Chances
        </Button>
    )
}

function Faq() {
    return (
        <Button variant="outline-danger" href="faq">
            FAQ
        </Button>
    );
}

class Home extends React.Component {
    state = {
    }

    render() {
        return (
            <div style={divStyle}>
                <br />
                <h1 style = {headerStyle}>
                    MODELING THE DRAW
                </h1>
                <br />
                <div style={buttonStyle}>
                    <ViewPastData />
                    <Calculator />
                    <Faq />
                </div>
                <br />
                <br />
                <br />
                <p style = {footerStyle}>
                    Sponsored by the Stanford Daily Tech Team
                </p>
                <br />
                <p style = {footer2Style}>
                    Questions? Email Charles Pan, Tiffany Shi, 
                    or Lily Zhou with your comments and concerns.
                </p>
                <br />
                <br />
            </div>
        );
    }
}

export default Home;

/*
<Grid
container
direction="row"
justify="space-around"
alignItems="center">
*/