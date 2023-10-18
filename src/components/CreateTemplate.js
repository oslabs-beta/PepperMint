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
    

    

    

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [componentInputCode, setComponentInputCode] = useState('');


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const parse = () => {

        const componentInputElement = document.getElementById('componentWindowTextInput');
        if (componentInputElement) {
            setComponentInputCode(componentInputElement.value);
            console.log('Component Input code:', componentInputCode);

            //parse then runs the paring code
            //then populates the box with props
        }
    }



    return (
        <>
            <h1 className="PageTitles">Create A New Template</h1>
            <div id='CreateTemplateColumns'>
                <div id="CreateTemplateColumnOne">
                    <form>

                        <form id="subsection1">
                            <label for="templateName">Template Name:</label>
                            <input type="text" id="templateName" placeholder="Name" />

                            <br></br>
                            <br></br>
                            <br></br>

                            <div className="dropdown">
                                <button onClick={toggleDropdown} className="dropbtn">Select Your Component</button>
                                <div id="myDropdown" className={isDropdownOpen ? "dropdown-content show" : "dropdown-content"}>
                                    <a href="#comp1">Component 1</a>
                                    <a href="#comp2">Component 2</a>
                                    <a href="#comp3">Component 3</a>
                                </div>
                                <button onClick={parse} className="dropbtn">Parse Component</button>
                            </div>


                        </form>

                        <form id="subsection2">
                            <label for="templateProps">Do You Want To Include Props?</label>
                            <input type="radio" id="yesProps" name="yesProps" value="Yes" />
                            <label for="html">Yes</label>
                            <br></br>
                            <br></br>
                            <input type="text" id="templateProps" placeholder="Props Will Populate Here" />
                        </form>

                        <form id="subsection3">
                            <label for="testCount">Enter Number of Tests:</label>
                            <input type="number" id="testCount" placeholder="0" min="1" />
                            <br></br>
                            <br></br>
                            <label for="assertionCount"> Enter Number of Assertions:</label>
                            <input type="number" id="assertionCount" placeholder="0" min="1" />
                        </form>

                    </form>
                </div>

                <div id="CreateTemplateColumnTwo">
                    <div id="componentWindow"> Component Window</div>
                    <input type="text" id="componentWindowTextInput" placeholder='Insert Component Text Here...' />
                    <div id="templatePreviewWindow">Template Preview</div>
                    <input type="text" id="templatePreviewWindowInput" />

                </div>
            </div>
        </>
    );
}

export default CreateTemplate;
