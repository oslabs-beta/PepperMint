import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import parse from './propParser2.js';
import * as ReactDOMServer from 'react-dom/server';
import CodeWindow from './CodeWindow';


console.log(parse)
const CreateTemplate = (props) => {

    let componentName = 'aComponent'
    const codeTemplate = [
        'import React from \'react\'',
        '\n',
        'import aComponent from \'../client/components/aComponent\'',
        '\n',
        'import { render, screen, waitFor } from \'@testing-library/react\'',
        '\n\n',
        'describe(\'Unit testing for aComponent\', () => {',
        '\n\n',
        'let aComponentMock;',
        '\n\n',
        'const props = {',
        '\n\n\n',
        '}',
        '\n\n',
        'beforeAll(() => {',
        '\n\n',
        'aComponentMock = render(<aComponent {...props}/>);',
        '\n\n',
        '}',
        '\n\n',
        'test(\'First test block:\'), () => {',
        '\n\n\n',
        '});',
        '\n\n\n',
        '});'
    ];

    const [doc, setDoc] = useState('');
    const [selectorVal, setSelectorVal] = useState(1);

    const indices = [10, 15, 21, 24]

    const onMount = (editor) => {
        setDoc(editor);
    }

    const valueCapture = (_, __, value) => {
        console.log(value);
    }

    const handleInsert = (value, position) => {
        const numLines = value.split('\n').length;

        doc.replaceRange(value, { line: indices[position], char: 0 }, { line: indices[[position]], char: 0 })

        for (let i = position; i < indices.length; i++) {
            indices[i] = indices[i] + (numLines - 1);
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

    const addAllProps = (event) => {
        event.preventDefault();

        const propsObj = Object.keys(JSON.parse(userProps));

        for (let i = 0; i < propsObj.length; i++) {
            if (i === propsObj.length - 1) handleInsert(`${propsObj[i]}: ''\n`, 0);
            else handleInsert(`${propsObj[i]}: '',\n`, 0);
        }

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
 
    const [userProps, setUserProps] = useState('{}');
    const [file, setFile] = useState('')

    const toggleDropdown = (event) => {
        event.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleChange = (event) => {
        event.preventDefault();
        setUserProps(event.value);
    }

    const handleFileChange = (event) => {
        event.preventDefault();
        setFile(event.value)
    }

    const describe = (string) => {
        return string

    }
    const componentParsing = (event) => {
        event.preventDefault();

        let newUserProps = JSON.stringify(parse(file));

        setUserProps(newUserProps);

        // console.log(newUserProps)

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
            event.preventDefault();
            fileCode = event.target.result;
            componentName = (((fileCode.split('export default'))[1]).split(';'))[0];
            setFile(fileCode)
            doc.replaceRange((codeTemplate.join('')).replaceAll('aComponent', componentName.slice(1)), { line: 0, char: 0 }, { line: 0, char: 0 })
        };

    }

    return (
        <>
            <h1 className="PageTitles">Create A New Template</h1>
            <div id='CreateTemplateColumns'>
                <div id="CreateTemplateColumnOne">
                    <div>

                        <div id="subsection1">
                            <div className="name-template">
                                <label htmlFor="templateName">Template Name:</label>
                                <input type="text" id="templateName" placeholder="Name" />
                            </div>
                            <div className="dropdown">
                                <input type="file" class="dropbtn" onChange={readFile} />
                                <button onClick={toggleDropdown} className="dropbtn">Select Your Component</button>
                                <div id="myDropdown" className={isDropdownOpen ? "dropdown-content show" : "dropdown-content"}>
                                    <a href="#comp1">Component 1</a>
                                    <a href="#comp2">Component 2</a>
                                    <a href="#comp3">Component 3</a>
                                </div>
                                <button onClick={componentParsing} type="button" className="dropbtn">Parse Component</button>
                                
                            </div>


                        </div>

                        <form id="subsection2">
                            <label> Add Props from Component File: </label>
                            <br></br>
                            <br></br>
                            <textarea id="templateProps" value={userProps} onChange={handleChange} placeholder="Props Will Populate Here" />
                            <br></br>
                            <button onClick={addAllProps}> Add these props </button>
                        </form>

                        <form id="subsection3">
                            <label> Add New Test Blocks: </label>
                            <br />
                            <br />
                            <button className="dropbtn" onClick={() => handleTests('add')}>Add Test</button>
                            <button className="dropbtn" onClick={() => handleTests('delete')}>Delete Test</button>
                        </form>
                        <form id="subsection4">
                            <label> Add Assertion By Test #: </label>
                            <br></br>
                            <br></br>
                            <input type="number" value={selectorVal} onChange={(event) => setSelectorVal(event.target.value)} />
                            <button type="submit" className="dropbtn" value="Add Expect" onClick={(event) => handleAssertions(event.target.value)} >Add Expect</button>
                            <button type="submit" className="dropbtn" value="Delete Expect" onClick={(event) => handleAssertions(event.target.value)} >Delete Expect</button>
                        </form>
                    </div>
                    <Link to="/templateHome"><button className="dropbtn" id="bigSaveTemplateButton">Save Template</button></Link>
                </div>

                <div id="CreateTemplateColumnTwo">
                    <div id="componentWindow" className="component-title">Component Window</div>
                    <textarea id="componentWindowTextInput" value={file} onChange={handleFileChange} placeholder='Insert Component Text Here...' />
                    <div id="templatePreviewWindow" className="component-title">Template Preview</div>
                    {/* <textarea id="templatePreviewWindowInput" /> */}
                    <div className='code-mirror-wrapper'>
                        <CodeWindow
                            value=''
                            displayName=''
                            onMount={onMount}
                            onChange={valueCapture}
                        />
                        {/* <button onClick={() => handleInsert()}>Generic Insert</button>
                        <button onClick={() => handleDelete()}>Generic Delete</button>
                        <button onClick={() => handleRender()}>Add Render</button>
                        <button onClick={() => handleProps('sampleProp', 'add')}>Add Prop</button>
                        <button onClick={() => handleProps('sampleProp', 'delete')}>Delete Prop</button>
                        <button onClick={() => handleTests('add')}>Add Test</button>
                        <button onClick={() => handleTests('delete')}>Delete Test</button> */}
                        <div>
                            {/* <form>
                                <input type="number" value={selectorVal} onChange={(event) => setSelectorVal(event.target.value)} />
                                <input type="submit" value="Add Expect" onClick={(event) => handleAssertions(event.target.value)} />
                                <input type="submit" value="Delete Expect" onClick={(event) => handleAssertions(event.target.value)} />
                            </form> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateTemplate;
