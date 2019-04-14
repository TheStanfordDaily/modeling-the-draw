import React from 'react';
import Button from 'react-bootstrap/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
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

const footer2Style = {
    marginLeft: '20%',
    marginRight: '20%',
};

function ViewPastData() {
    return (
        <Link to="/pastdata"><Button variant="outline-danger">
            View Past Data
        </Button></Link>
    )
}

function Calculator() {
    return (
        <Link to="/calculator"><Button variant="outline-danger">
            Calculate Your Chances
        </Button></Link>
    )
}

function Faq() {
    return (
        <Link to="/faq"><Button variant="outline-danger">
            FAQ
        </Button></Link>
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
                <br />
                <br />
                <div style={buttonStyle}>
                    <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center">
                        <ViewPastData />
                        <Calculator />
                        <Faq />
                    </Grid>
                </div>
                <br />
                <br />
                <br />
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