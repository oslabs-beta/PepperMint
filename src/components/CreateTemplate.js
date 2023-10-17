import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateTemplate = (props) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    return (
        <>
            <h1 className="PageTitles">Create A New Template</h1>
            <div id='CreateTemplateColumns'>
                <div id="CreateTemplateColumnOne">
                    <form>

                        <form id="subsection1">
                            <label for="templateName">Template Name:</label>
                            <input type="text" id="templateName" placeholder="Name" /> <br></br>

                            <label for="templateComponent">Choose your Component:</label>

                            <div className="dropdown">
                                <button onClick={toggleDropdown} className="dropbtn">Dropdown</button>
                                <div id="myDropdown" className={isDropdownOpen ? "dropdown-content show" : "dropdown-content"}>
                                    <a href="#comp1">Component 1</a>
                                    <a href="#comp2">Component 2</a>
                                    <a href="#comp3">Component 3</a>
                                </div>
                            </div>
                        </form>

                        <form id="subsection2">
                            <label for="templateProps">Do You Want To Include Props?</label>
                            <input type="radio" id="yesProps" name="yesProps" value="Yes" />
                            <label for="html">Yes</label><br></br>
                            <input type="text" id="templateProps" placeholder="Props Will Populate Here" />
                        </form>

                        <form id="subsection3">
                            <label for="testCount">Enter Number of Tests:</label>
                            <input type="number" id="testCount" placeholder="0" />
                            <label for="assertionCount"> Enter Number of Assertions:</label>
                            <input type="number" id="assertionCount" placeholder="0" />
                        </form>

                    </form>
                </div>

                <div id="CreateTemplateColumnTwo">
                    <div id="componentWindow"> Component Window</div>
                    <div id="templatePreviewWindow">Template Preview</div>
                </div>
            </div>
        </>
    );
}

export default CreateTemplate;
