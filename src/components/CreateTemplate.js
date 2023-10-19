import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import parse from './propParser2.js';
import * as ReactDOMServer from 'react-dom/server';
import CodeWindow from './CodeWindow';


console.log(parse)
const CreateTemplate = (props) => {

    const codeTemplate = [
        'import React from \'react\'',
        '\n',
        'import AComponent from \'./aPath/to/aComponent\'',
        '\n',
        'import { render, screen, waitFor } from \'@testing-library/react\'',
        '\n\n',
        'describe(\'Unit testing for AComponent\', () => {',
        '\n\n',
        'let AComponentMock;',
        '\n\n',
        'const props = {',
        '\n\n\n',
        '}',
        '\n\n',
        'beforeAll(() => {',
        '\n\n\n',
        '});',
        '\n\n',
        'test(\'First test block:\'), () => {',
        '\n\n\n',
        '});',
        '\n\n\n',
        '});'
    ];

    const [doc, setDoc] = useState('');
    const [selectorVal, setSelectorVal] = useState(1);

    const indices = [10, 15, 20, 23]
    const assertionIndices = [20]

    const onMount = (editor) => {
        setDoc(editor);
    }

    const valueCapture = (_, __, value) => {
        console.log(value);
    }

    const handleInsert = (value, position) => {
        const numLines = value.split('\n').length;

        doc.replaceRange(value, { line: indices[position], char: 0 }, { line: indices[[position]], char: 0 })

        if (position >= 3 && value.length < 16) indices.push(indices[position] + (numLines - 1));
        else {
            for (let i = position; i < indices.length; i++) {
                indices[i] = indices[i] + (numLines - 1);
            }
        }
    }

    const handleDelete = (number, position) => {
        doc.replaceRange('\n', { line: indices[position] - number, char: 0 }, { line: indices[position], char: 0 })

        for (let i = position; i < indices.length; i++) {
            indices[i] = indices[i] - (number - 1);
        }
    }

    const handleProps = (propName, addOrDel) => {
        (addOrDel === 'add') ? handleInsert(`${propName}: ''\n`, 0) : handleDelete(2, 0)
    }

    const handleRender = (value, position) => {
        handleInsert('AComponentMock = render(<AComponent {...props}/>); \n', 1);
    }

    const handleTests = (addOrDel) => {
        const newTest = [
            'test(\'Another test block:\'), () => {',
            '\n\n\n',
            '});',
            '\n\n'
        ];

        (addOrDel === 'add') ? handleInsert(newTest.join(''), indices.length - 1) : handleDelete(6, 3);
    }

    const handleAssertions = (addOrDel) => {
        console.log(addOrDel);
        console.log(selectorVal);

        const newAssertion = [
            'expect();',
            '\n'
        ];

        const insertionPoint = (selectorVal === 1) ? 2 : 3 + selectorVal;

        (addOrDel === 'Add Expect') ? handleInsert(newAssertion.join(''), insertionPoint) : handleDelete(6, 3);
    }



    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [componentInputCode, setComponentInputCode] = useState('');
    const [userProps, setUserProps] = useState('');
    const [file, setFile] = useState('')

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleChange = (event) => {
        setUserProps(event.value);
    }

    const handleFileChange = (event) => {
        setFile(event.value)
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
        event.preventDefault();
        let compFile = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(compFile);
        let fileCode = "";
        // reader.onload fires when a file is read successfully
        reader.onload = function (event) {
            // event.target.result holds the file code
            fileCode = event.target.result;
            // console.log(fileCode)
            // fileCode = ReactDOMServer.renderToString(fileCode)
            setFile(fileCode)
            // console.log(ReactDOMServer.renderToString(file))
            console.log(file);
        };

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


                            <div className="dropdown">
                                <input type="file" class="dropbtn" onChange={readFile} />
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
                            <textarea id="templateProps" value={userProps} onChange={handleChange} placeholder="Props Will Populate Here" />
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
                    <textarea id="componentWindowTextInput" value={file} onChange={handleFileChange} placeholder='Insert Component Text Here...' />
                    <div id="templatePreviewWindow">Template Preview</div>
                    {/* <textarea id="templatePreviewWindowInput" /> */}
                    <div className='code-mirror-wrapper'>
                        <CodeWindow
                            value={codeTemplate.join('')}
                            displayName='Template Preview'
                            onMount={onMount}
                            onChange={valueCapture}
                        />
                        <button onClick={() => handleInsert()}>Generic Insert</button>
                        <button onClick={() => handleDelete()}>Generic Delete</button>
                        <button onClick={() => handleRender()}>Add Render</button>
                        <button onClick={() => handleProps('sampleProp', 'add')}>Add Prop</button>
                        <button onClick={() => handleProps('sampleProp', 'delete')}>Delete Prop</button>
                        <button onClick={() => handleTests('add')}>Add Test</button>
                        <button onClick={() => handleTests('delete')}>Delete Test</button>
                        <div>
                            <form>
                                <input type="number" value={selectorVal} onChange={(event) => setSelectorVal(event.target.value)} />
                                <input type="submit" value="Add Expect" onClick={(event) => handleAssertions(event.target.value)} />
                                <input type="submit" value="Delete Expect" onClick={(event) => handleAssertions(event.target.value)} />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateTemplate;
