import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LabeledText = ({ label, text }) => {
    const idk = false;

    return (
        <p>
            <strong>{`${label}: `}</strong>
            {text}
        </p>
    )
    
};

const LabeledText2 = (props) => {
    const idk = false;

    return (
        <p>
            <strong>{`${props.label}: `}</strong>
            {props.text}
        </p>
    )
    
};

// function searchProps(component){
    

//      let i = 0;

//      const props = {};

//      while (i < component.length){

//         let propAndI;

//         if (component.slice(i, i+6) === 'props.') {

//             propAndI = getProp(component.slice(i+6))

//             props[propAndI[0]] = '';
//             i += propAndI[1];
//         }
//         else{
//             i++;
//         }
       

//      }
//      return props;

// }

// function getProp(propAndRest){
    
//     let newString = '';
//     let i = 0;
//     while (i < propAndRest.length && /^[a-zA-Z0-9]+$/.test(propAndRest[i])){
//         newString += propAndRest[i];
//     }
//     return [newString, i];
 
// }

// function parse(component){
//     console.log('inside searchProps')

//     if ('props'.startsWith('props')) return searchProps(component);

// }

// parse(LabeledText2.toString());
console.log(LabeledText.toString())
console.log(LabeledText2.toString())

const CreateTemplate = (props) => {
    

    

    

    return (
        <>
            <h1>Create Template</h1>
            <form>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Insert template" />
                <Link to="/templatehome"><button type='submit'>Save Your Template!</button></Link>
            </form>
        </>

    )
}

export default CreateTemplate;