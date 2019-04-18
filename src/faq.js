import React from 'react';
import './faq.css';

const headerStyle = {
    fontFamily: 'Open Sans Condensed, sans-serif',
    color: '#8c1515',
};

const questionStyle = {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'Glegoo, serif',
    fontSize: '16px',
    marginLeft: '3%',
    marginRight: '3%',
};

const answerStyle = {
    marginLeft: '3%',
    marginRight: '3%',
};

const divStyle = {
    //backgroundColor: '#95CCEB',
    border: "solid #8c1515",
    borderWidth: '4px',
};

function Question1() {
    return (
        <div>
            <p style={questionStyle}>
                What does Modeling the Draw use for its calculations?
            </p>
            <p style={answerStyle}>
                Modeling the Draw uses historical cutoff numbers from previous Draws, 
                as reported by Stanford R&amp;DE. For the purposes of the calculator, 
                only the historical draw statistics from years 2014-2018 are considered. 
                Many academic themed, Greek, and all-frosh residences are excluded from 
                this dataset, and cannot be inputted into the calculator for an accurate 
                reading.
            </p>
        </div>
    );
}

function Question2() {
    return (
        <div>
            <p style={questionStyle}>
                How does MTD calculate my chances?
            </p>
            <p style={answerStyle}>
                Modeling the Draw uses linear regression on historical cut-off numbers 
                in order to estimate the cut-off numbers of Stanford residences for the 
                2019 Draw. Our calculator considers several factors in its calculation, 
                including sex, desired residence, desired type of room, the number of 
                people you're drawing with, and your tier number.
            </p>
            <p style={answerStyle}>
                In the case of split groups – where some but not all students with a 
                certain cut-off number can make it into a certain residence – the 
                calculator assumes that you will be able to make the cut-off. Additionally, 
                sophomore priority for residences such as Toyon and FroSoCo are not 
                considered by the calculator.
            </p>
        </div>
    );
}

function Question3() {
    return (
        <div>
            <p style={questionStyle}>
                What inputs does the calculator take, and what do they mean?
            </p>
            <p style={answerStyle}>
                The first input, sex, will allow the calculator to consider either the 
                men’s or women’s historical cut-off numbers.
            </p>
            <p style={answerStyle}>
                The second input, residence, is the residence that you’re considering drawing into. 
                You could input a particular residence (e.g. “Branner”), a residence hall (e.g. 
                “Gerhard Casper”), a part of campus (e.g. “West Campus”), or any dorm at Stanford (“Dorm”).
            </p>
            <p style={answerStyle}>
                The third input, room type, is the type of room that you’d like to draw into (ex: "1 Room Single",
                "2 Room Double"). The calculator will automatically update the dropdown options
                to only show the room types that are offered in your residence. Please note that the availability
                of room types could also hinge on other factors (i.e. sex and apply type). If you have no preference 
                for your room type, input “Any.”

            </p>
            <p style={answerStyle}>
                The fourth input, tier number, is the tier level that you are selecting.
            </p>
            <p style={answerStyle}>
                The last input, apply type, is the number of people drawing with you 
                as a group. Since our calculator only calculates your chances for the 
                2019 Draw, groups of 5 or greater or not recognized.
            </p>
        </div>
    );
}

function Question4() {
    return (
        <div>
            <p style={questionStyle}>
                What does my outputted percentage mean?</p>
            <p style={answerStyle}>
                The percentage that the Modeling the Draw calculator outputs is our 
                estimate of your chances of drawing into the residence and room type 
                that you’re applying for, based on historical draw data from previous 
                years. If you receive the output “>99%,” it’s likely that your tier 
                level is lower than our estimated cutoff number for your residence. If 
                you receive the output “&#60;0.1%,” it’s likely that your tier level is 
                higher than our estimated cutoff number for your residence.
            </p>
        </div>
    );
}

class FAQ extends React.Component {
    render() {
        return (
            <div style={divStyle}>
                <br />
                <h1 style={headerStyle}>
                    Frequently Asked Questions
                </h1>
                <br />
                <Question1 />
                <br />
                <Question2 />
                <br />
                <Question3 />
                <br />
                <Question4 />
                <br />
                <p style={answerStyle}>
                    Contact lilyzhou@stanford.edu for further inquiries.
                </p>
                <br />
            </div>
 
        );
    }
}

export default FAQ;