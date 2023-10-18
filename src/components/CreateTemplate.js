import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import parse from './propParser2.js';

console.log(parse)
const CreateTemplate = (props) => {
    

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [componentInputCode, setComponentInputCode] = useState('');
    const [userProps, setUserProps] = useState('');



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleChange = (event) => {
        setUserProps(event.value);
    }

    const describe = (string) => {
        return string

    }
    const componentParsing = () => {

        const componentInputElement = document.getElementById('componentWindowTextInput');
        if (componentInputElement) {
            setComponentInputCode(componentInputElement.value);
            console.log('Component Input code:', componentInputCode);

            let newUserProps = JSON.stringify(parse(componentInputCode));

            setUserProps(newUserProps);

            console.log(newUserProps)
        }

    }

    const readFile = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        let fileCode = "";
        // reader.onload fires when a file is read successfully
        reader.onload = function(event) {
          // event.target.result holds the file code
          fileCode = event.target.result;
          console.log(fileCode)
        };
        return fileCode;
      }

    return (
        <>
            <h1 className="PageTitles">Create A New Template</h1>
            <div id='CreateTemplateColumns'>
                <div id="CreateTemplateColumnOne">
                    <form>

                        <form id="subsection1">
                            <label htmlFor="templateName">Template Name:</label>
                            <input type="text" id="templateName" placeholder="Name" />
                            <input type="file" onChange={readFile}></input>
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
                                <button onClick={componentParsing} className="dropbtn">Parse Component</button>
                            </div>


                        </form>

                        <form id="subsection2">
                            <label for="templateProps">Do You Want To Include Props?</label>
                            <input type="radio" id="yesProps" name="yesProps" value="Yes" />
                            <label for="html">Yes</label>
                            <br></br>
                            <br></br>
                            <textarea id="templateProps" value={userProps} onChange = {handleChange} placeholder="Props Will Populate Here" />
                        </form>

                        <form id="subsection3">
                            <label for="testCount">Enter Number of Individual Tests:</label>
                            <input type="number" id="testCount" placeholder="0" min="1" />
                            <br></br>
                            <br></br>
                            <label for="assertionCount"> Enter Number of Assertions (expect statements):</label>
                            <input type="number" id="assertionCount" placeholder="0" min="1" />
                        </form>

                    </form>
                    <Link to="/templateHome"><button id="bigSaveTemplateButton">Save Template</button></Link>
                </div>

                <div id="CreateTemplateColumnTwo">
                    <div id="componentWindow"> Component Window</div>
                    <textarea id="componentWindowTextInput" placeholder='Insert Component Text Here...' />
                    <div id="templatePreviewWindow">Template Preview</div>
                    <textarea id="templatePreviewWindowInput" value = "describe()" />

                </div>
            </div>
        </>
    );
}

export default CreateTemplate;
