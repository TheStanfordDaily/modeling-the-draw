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
                Modeling the Draw utilizes historical cutoff numbers from previous Draws, as reported by 
                Stanford R&amp;DE. For the purposes of the calculator, statistics from the years 2014-2018 
                are taken into consideration. Many academic theme, Greek, and all-frosh residences are excluded 
                from this dataset, and cannot be inputted into the calculator for an accurate reading.
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
                Modeling the Draw uses linear regression on historical cut-off numbers in order to determine the 
                trend of popularity of various residences that partake in the 2019 Draw. Aside from the desired 
                residence, several other factors – such as sex, desired type of room, the number of people 
                applying in your group, and tier number – impact your chances of drawing into the residence.
            </p>
            <p style={answerStyle}>
                In the case of split groups – where some but not all students with a certain cut-off number could
                make it into a particular residence – the calculator assumes that you are able to make the 
                cut-off. Additionally, sophomore priority for particular residences and housing types – such 
                as Toyon and FroSoCo – are not considered for the purposes of this calculator.
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
                The first input, sex, will allow the calculator to consider either the men’s or women’s cut-off
                numbers, and which correspond to the inputs “male” or “female”; for any other input, the 
                calculator will not consider sex in its calculation.
            </p>
            <p style={answerStyle}>
                The second input, room type, refers to the type of room that you’d like to be placed in, and 
                recognizes inputs such as “1 room single,” “2 room double,” and “1 room triple.” Please note 
                that not all residences have your desired room type; inputting an invalid room type for 
                a residence will not lead to an accurate calculation. Additionally, for apartment complexes 
                such as Mirrielees, you may request either a “2 bedroom apartment,” “3 bedroom apartment,” 
                “4 bedroom apartment,” or “substance free housing.” Similarly, you should request either a 
                “4-person” or “6-person” suite for GovCo’s Suites, and either a “standard room” or “premier 
                room” for Row residences. If you’re considering preassigning to a cross cultural theme house, 
                you must input “ETHNIC” as the room type. Lastly, if you have no preference for the room type, 
                input “Any.”
            </p>
            <p style={answerStyle}>
                The third input, residence, refers to the residence that you’re considering drawing into. You 
                may input a particular residence (“Branner”), a residence hall (“Gerhard Casper”), a part of 
                campus (“West Campus”), or any dorm (“Dorm”).
            </p>
            <p style={answerStyle}>
                The fourth input, tier number, will take either 1, 2, or 3 as input, and refer to the tier 
                level that you are selecting. Other inputs are not recognized by the calculator.
            </p>
            <p style={answerStyle}>
                The last input, apply type, refers to the number of people applying in your group. Recognized 
                inputs include “individual,” “group of 2,” “group of 3,” or “group or 4.” Since our calculator 
                calculates your chances for the 2019 draw, groups of 5 or greater or not recognized.
            </p>
        </div>
    );
}

function Question4() {
    return (
        <div>
            <p style={questionStyle}>
                What does the outputted percentage mean?</p>
            <p style={answerStyle}>
                The percentage that the Modeling the Draw calculator outputs is our estimate of your chances 
                of drawing into the residence and room type that you’re applying for, based on data from 
                previous years. If you receive the output “>99%,” it’s likely that your tier level exceeds 
                the historical cut-off numbers. If you receive the output “&#60;0.1%,” it’s likely that your tier 
                level is lower than the historical cut-off numbers.
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