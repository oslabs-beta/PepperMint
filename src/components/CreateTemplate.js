import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import parse from './propParser2.js';
import CodeWindow from './CodeWindow';

//NEED TO CREATE A BACK BUTTON FOR RECHOOSING THE FILE STRUCTURE. 

let doc = {}; // I changed this back from a stateful variable to a regular one.
let selectorVal = 0;
let handlers = '';
let componentName;
let foundHandlers;
let queryDropdown = ['', 'getBy...', 'findBy...', 'queryBy...', 'getAllBy...', 'findAllBy...', 'queryAllBy...'];
let realQueryDropdown;
let specficQueryDropdown;
let specificDropdown;

const CreateTemplate = (props) => {

    const navigate = useNavigate();

    let file = window.sessionStorage.getItem('fileCode')

    componentName = ((((file.split('export default'))[1]).split(';'))[0]);
    const macroStructure = {};

    const codeTemplate = [
        '\n', '\n', '\n', '\n', '\n', '\n', `describe((\'Unit Testing for${componentName}'), () => {`, '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n',
        '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '});', '\n',
    ];

    const codeLineLib = {
        // a: '\na {\n\n\n}\n',
        // b: '\nb( )bb( )( )\n',
        // c: '\nc {\n\n\n}\n',
        imports: '\nimport React from \'React\'\nimport { render, cleanup, screen, waitFor } from \'@testing-library/react\'\nimport userEvent from \'@testing-library/user-event\'\n',
        props: '\nprops {\n\n\n}\n',
        testblock: '\ntest((\' \'), () => {\n\n\n}\n',
        beforeAll: '\nbeforeAll(() => {\n\n\n});\n',
        expect: '\nexpect( ).( );\n',
        mockVar: `\nlet${componentName}Mock;\n`,
        render: `\n${componentName}Mock = render(<${componentName} {...props} />);\n`
    }

    const insertionPtLib = {
        // a: [{start: {line: 2, char: 0}, end: {line: 3, char: 0}, kind: 'codemirror-subinsert'}],
        // b: [{start: {line: 1, char: 2}, end: {line: 1, char: 3}, kind: 'codemirror-inline'},
        //     {start: {line: 1, char: 7}, end: {line: 1, char: 8}, kind: 'codemirror-inline'},
        //     {start: {line: 1, char: 10}, end: {line: 1, char: 11}, kind: 'codemirror-inline'}],
        // c: [{start: {line: 2, char: 0}, end: {line: 3, char: 0}, kind: 'codemirror-subinsert'}],
        props: [{ start: { line: 2, char: 0 }, end: { line: 3, char: 0 }, kind: 'codemirror-subinsert' }],
        beforeAll: [{ start: { line: 2, char: 0 }, end: { line: 3, char: 0 }, kind: 'codemirror-subinsert' }],
        newProp: [{ start: { line: 2, char: 0 }, end: { line: 3, char: 0 }, kind: 'codemirror-subinsert' }],
        testblock: [{ start: { line: 2, char: 0 }, end: { line: 3, char: 0 }, kind: 'codemirror-subinsert' }],
        expect: [{ start: { line: 1, char: 7 }, end: { line: 1, char: 8 }, kind: 'codemirror-inline' },
        { start: { line: 1, char: 11 }, end: { line: 1, char: 12 }, kind: 'codemirror-inline' }]
    }

    class InsertionObject {

        constructor(startPos, endPos, kind, singleOrMultiple) {
            this.insertionStart = bookmarkCreator(startPos, kind);
            this.insertionEnd = bookmarkCreator(endPos, kind)
            this.kind = kind;
            this.contents = [];
            this.insertionPts = [{ insertionStart: this.insertionStart, insertionEnd: this.insertionEnd }];
            this.allowAdditional = true;
        }

        addContents(title, allowAdditional) {

            if (this.allowAdditional) {
                doc.replaceRange(codeLineLib[title], this.fetchPosition('s'), this.fetchPosition('e'));
                this.addInsertionPts(title, allowAdditional);
            }

            if (allowAdditional === false) this.allowAdditional = false;
        }

        addInsertionPts(title, allowAdditional) {

            if (!(insertionPtLib[title])) return;

            const newInsertion = [];

            insertionPtLib[title].forEach((insertionPt) => {

                newInsertion.push(
                    new InsertionObject(
                        { line: this.insertionStart.find().line + insertionPt.start.line, ch: insertionPt.start.char },
                        { line: this.insertionStart.find().line + insertionPt.end.line, ch: insertionPt.end.char },
                        insertionPt.kind
                    )
                );

                this.contents.push(newInsertion);

            });

            if (allowAdditional) this.handleNewLines(this.kind);

        }

        handleNewLines(kind) {

            const insertionEndPos = this.fetchPosition('e');

            doc.replaceRange('\n\n', insertionEndPos)
            this.insertionStart = bookmarkCreator({ line: insertionEndPos.line + 1, ch: 0 }, kind);
            this.insertionEnd = bookmarkCreator({ line: insertionEndPos.line + 2, ch: 0 }, kind);

            this.insertionPts.push({ insertionStart: this.insertionStart, insertionEnd: this.insertionEnd })


        }

        fetchPosition(startOrEnd) {

            return (startOrEnd === 's') ?
                { line: this.insertionStart.find().line, ch: this.insertionStart.find().ch } :
                { line: this.insertionEnd.find().line, ch: this.insertionEnd.find().ch };

        }
    }

    const onMount = (editor) => {

        doc = editor;
        doc.replaceRange((codeTemplate.join('')), { line: 0, char: 0 })
        parseAndProcess();

        Object.assign(
            macroStructure,
            {
                // a: {
                //   start: bookmarkCreator({line: 0, char: 0}),
                //   end: bookmarkCreator({line: 3, char: 0}),
                //   insertionZone: new InsertionObject({line: 1, char: 0}, {line: 2, char: 0}, 'codemirror-insertion-point')
                // },
                // b: {
                //   start: bookmarkCreator({line: 6, char: 0}),
                //   end: bookmarkCreator({line: 9, char: 0}),
                //   insertionZone: new InsertionObject({line: 7, char: 0}, {line: 8, char: 0}, 'codemirror-insertion-point')  
                // },
                // c: {
                //   start: bookmarkCreator({line: 12, char: 0}),
                //   end: bookmarkCreator({line: 15, char: 0}),
                //   insertionZone: new InsertionObject({line: 13, char: 0}, {line: 14, char: 0}, 'codemirror-insertion-point')
                // }
                imports: {
                    start: bookmarkCreator({ line: 0, char: 0 }),
                    end: bookmarkCreator({ line: 3, char: 0 }),
                    insertionZone: new InsertionObject({ line: 1, char: 0 }, { line: 2, char: 0 }, 'codemirror-insertion-point')
                },
                props: {
                    start: bookmarkCreator({ line: 9, char: 0 }),
                    end: bookmarkCreator({ line: 12, char: 0 }),
                    insertionZone: new InsertionObject({ line: 10, char: 0 }, { line: 11, char: 0 }, 'codemirror-insertion-point')
                },
                mocks: {
                    start: bookmarkCreator({ line: 15, char: 0 }),
                    end: bookmarkCreator({ line: 18, char: 0 }),
                    insertionZone: new InsertionObject({ line: 16, char: 0 }, { line: 17, char: 0 }, 'codemirror-insertion-point')
                },
                jestHooks: {
                    start: bookmarkCreator({ line: 21, char: 0 }),
                    end: bookmarkCreator({ line: 24, char: 0 }),
                    insertionZone: new InsertionObject({ line: 22, char: 0 }, { line: 23, char: 0 }, 'codemirror-insertion-point')
                },
                testZone: {
                    start: bookmarkCreator({ line: 27, char: 0 }),
                    end: bookmarkCreator({ line: 30, char: 0 }),
                    insertionZone: new InsertionObject({ line: 28, char: 0 }, { line: 29, char: 0 }, 'codemirror-insertion-point')
                },
            }
        );

        macroStructure['imports'].insertionZone.addContents('imports', false);
        macroStructure['props'].insertionZone.addContents('props', false);
        macroStructure['props'].insertionZone.contents[0][0].addContents('propsList', false);
        macroStructure['mocks'].insertionZone.addContents('mockVar', true);
        macroStructure['jestHooks'].insertionZone.addContents('beforeAll', false)
        macroStructure['jestHooks'].insertionZone.contents[0][0].addContents('render', true)    // macroStructure['props'].insertionZone.contents[0].contents[0].addContents('propsList', false);
        macroStructure['testZone'].insertionZone.addContents('testblock', true);

    }

    function bookmarkCreator(position, kind = 'codemirror-bookmark') {

        const ac = document.createElement("span")
        ac.textContent = ' ';
        ac.className = kind;

        return doc.setBookmark(position, ac);;
    }

    const valueCapture = (_, __, value) => {
        window.sessionStorage.setItem("finalDraft", value);
        // console.log(value);
        return value;
    }

    const undoOrRedo = (undoOrRedo) => {

        console.log(doc);
        (undoOrRedo === 'undo') ? doc.undo() : doc.redo();

    }

    const addAllProps = (event) => {
        event.preventDefault();

        const propsObj = Object.keys(JSON.parse(userProps));

        for (let i = 0; i < propsObj.length; i++) {
            if (i === propsObj.length - 1) addAtBookmarks(`\n${propsObj[i]}: ''\n`, macroStructure[2].start.find().line);
            else addAtBookmarks(`${propsObj[i]}: '',\n`, macroStructure[2].start.find().line);
        }

    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [userProps, setUserProps] = useState('{}');

    const toggleDropdown = (event) => {
        event.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handlePropLoad = (event) => {
        event.preventDefault();
        setUserProps(event.value);
    }

    const handleFileChange = (event) => {
        event.preventDefault();
        // setFile(event.value)
    }

    const parseAndProcess = () => {

        const propsList = parse(file);
        let codeLineString = '\n';
        let insertionPtArray = [];
        let i = 1;

        for (const key in propsList) {
            codeLineString = codeLineString + `${key}: \' \',\n`
            insertionPtArray.push({ start: { line: i, char: key.length + 3 }, end: { line: i, char: key.length + 4 }, kind: 'codemirror-inline' });
            i++;
        }

        

        codeLineLib['propsList'] = codeLineString;
        insertionPtLib['propsList'] = insertionPtArray;

        toggleQueryDropdown();

        console.log('lmao')
        findHandlers();
        console.log('lol')

    }

    const findHandlers = (event) => {

      

        const eventHandlers = [['', ''], ['onChange', 'change'], ['onClick', 'click'], ['onSubmit', 'submit']];
        foundHandlers = eventHandlers
            .filter(handler => file.indexOf(handler[0]) !== -1)
          

        console.log(foundHandlers);

        const fireEvDD = document.getElementById('fireEvent');

        for (let i = 0; i < foundHandlers.length; i++) {
          let optionEl = document.createElement('option');
          optionEl.setAttribute('value', foundHandlers[i][1]);
          optionEl.setAttribute('key', foundHandlers[i][1]);
          optionEl.innerHTML = foundHandlers[i][1];
          fireEvDD.appendChild(optionEl);
        }
    }

    const chosenEvent = (event) => {
        event.preventDefault();
        const ourValue = event.target.value;
        codeLineLib['fireEvent'] = `fireEvent.${ourValue}();`

        // Object.assign(macroStructure, {testZone: {
        //     start: bookmarkCreator({ line: 27, char: 0 }),
        //     end: bookmarkCreator({ line: 30, char: 0 }),
        //     insertionZone: new InsertionObject({ line: 28, char: 0 }, { line: 29, char: 0 }, 'codemirror-insertion-point')
        // }})
        macroStructure['testZone'].insertionZone.contents[selectorVal][0].addContents('fireEvent', true);
        // macroStructure['testZone'].insertionZone.addContents('fireEvent', true);


    }

    const chosenQuery = (event) => {
        event.preventDefault();
        console.log("Hello from chosenQuery")
        const ourValue = event.target.value;
        codeLineLib['queryEvent'] = `${componentName}Mock.${ourValue}('')`
        macroStructure['testZone'].insertionZone.contents[0][0].contents[0][0].addContents('queryEvent', false)
    }




    const handleNewTest = (event) => {
        event.preventDefault();
        macroStructure['testZone'].insertionZone.addContents('testblock', true);
    }

    const handleDeleteTest = (event) => {

        event.preventDefault();

        const zoneContents = macroStructure['testZone'].insertionZone.insertionPts;
        const mostRecent = zoneContents[zoneContents.length - 1]

        const mostRecentStart = mostRecent.insertionStart.find();
        const mostRecentEnd = mostRecent.insertionEnd.find();


        doc.replaceRange('', { line: mostRecentStart.line - 1, ch: 0 }, { line: mostRecentEnd.line, ch: 0 });
        mostRecent.insertionStart.clear();
        mostRecent.insertionEnd.clear();
        zoneContents.pop();

    }

    const handleNewAssertion = (event) => {
        event.preventDefault();
        const insertionPt = selectorVal;
        macroStructure['testZone'].insertionZone.contents[selectorVal][0].addContents('expect', true);
    }

    const testButton = (event) => {
      event.preventDefault();
      // console.log("Nassims console Log:", macroStructure['testZone'].insertionZone.contents[0][0])
      console.log("Nassims console Log:", macroStructure['testZone'].insertionZone.contents[0][0].contents[0][0]);
    }

    function goToFinalDraft() {
        navigate("/finaldraft")
    }

    const toggleQueryDropdown = () => {
        realQueryDropdown = queryDropdown.map(query =>
            <option key={query} href="#comp1" onClick={specificDropdown} value={query}>{query}</option>);
    }

    function specificDropdownMaker(event) {
        event.preventDefault();
        console.log("What did the user select?", event.target.value);
        let newDropdown;
        let specDropdown = document.getElementById('specEvent');
        specDropdown.innerHTML = '';
        let optionEl;
        if (event.target.value === 'getBy...') {
            newDropdown = ['getByRole', 'getById', 'getByLabelText', 'getByText', 'getByDisplayValue'];
        }
        if (event.target.value === 'findBy...') {
            newDropdown = ['findByRole', 'findById', 'findByLabelText', 'findByText', 'findDisplayValue'];
        }
        if (event.target.value === 'queryBy...') {
            newDropdown = ['queryByRole', 'queryById', 'queryByLabelText', 'queryByText', 'queryByDisplayValue'];
        }
        if (event.target.value === 'getAllBy...') {
            newDropdown = ['getAllByRole', 'getAllById', 'getAllByLabelText', 'getAllByText', 'getAllByDisplayValue'];
        }
        if (event.target.value === 'findAllBy...') {
            newDropdown = ['findAllByRole', 'findAllById', 'findAllByLabelText', 'findAllByText', 'findAllByDisplayValue'];
        }
        if (event.target.value === 'queryAllBy...') {
            newDropdown = ['queryAllByRole', 'queryAllById', 'queryAllByLabelText', 'queryAllByText', 'queryAllByDisplayValue'];
        }
        for (let i = 0; i < newDropdown.length; i++) {
            optionEl = document.createElement('option');
            optionEl.setAttribute('value', newDropdown[i]);
            optionEl.setAttribute('key', newDropdown[i]);
            optionEl.innerHTML = newDropdown[i];
            specDropdown.appendChild(optionEl);
        }
    }

    return (
        <>
            <h1 className="PageTitles">Create A New Test</h1>
            <div id='CreateTemplateColumns'>
                <div id="CreateTemplateColumnOne">
                    <div>
                        <div id="subsection1">
                        </div>
                        <form id="subsection3">
                            <label> Undo, Redo, getAllMarks, testButton: </label>
                            <br></br>
                            <br></br>
                            <button
                                onClick={() => { undoOrRedo('undo') }}
                            >Undo</button>
                            <button
                                onClick={() => { undoOrRedo('redo') }}
                            >Redo</button>
                            <button
                                onClick={() => { console.log(doc.getAllMarks()) }}
                            >getAllMarks</button>
                            <button
                                onClick={testButton}
                            >testButton</button>
                        </form>
                        <form id="subsection3">
                            <label> Add a New Test Block: </label>
                            <br></br>
                            <br></br>
                            <button
                                className="dropbtn"
                                onClick={handleNewTest}
                            >Add</button>
                            <button
                                onClick={handleDeleteTest}
                                className="dropbtn"
                            >Remove</button>
                        </form>
                        <form id="subsection3">
                            <label> Add by Test Block # (Zero-based Index): </label>
                            <br></br>
                            <br></br>
                            <input type="number" onChange={(event) => { event.preventDefault(); selectorVal = event.target.value; console.log(selectorVal) }} />
                            <br></br>
                            <br></br>
                            <button type='submit' className="dropbtn" onClick={handleNewAssertion}>Add Expect Statement</button>
                            <button className="dropbtn">Remove Expect Statement</button>
                            <br></br>
                            <br></br>

                            {/* <button onClick={toggleDropdown} className="dropbtn" id="fireEvent" >Fire Event On Test ↓</button>
                            <div id="myDropdown" className={isDropdownOpen ? "dropdown-content show" : "dropdown-content"}>
                                {handlers}
                            </div> */}

                            <label for="fireEvent">Fire Event On Test</label>
                            <select name='fireEvent' id='fireEvent' onChange={chosenEvent}>
                                {foundHandlers}
                            </select>





                            {/* <button onClick={toggleQueryDropdown} className="dropbtn" id="queryEvent" > Add Query ↓</button>
                            <div id="QueryDropdown" className={isDropdownOpen ? "dropdown-content show" : "dropdown-content"}>
                                {realQueryDropdown}
                            </div> */}

                            <br></br>
                            <br></br>

                            <label for="queryEvent">Input Query On Assertion</label>
                            <select name='queryEvent' id='queryEvent' onChange={specificDropdownMaker}>
                                {realQueryDropdown}
                            </select>

                            <br></br>
                            <br></br>

                            <label for="queryEvent">Select The Specfics</label>
                            <select name='queryEvent' id='specEvent' onChange={chosenQuery}>
                                {specificDropdown}
                            </select>

                        </form>
                    </div>
                    <button className="dropbtn" id="bigSaveTemplateButton" onClick={goToFinalDraft}>Finalize Test</button>
                </div>

                <div id="CreateTemplateColumnTwo">
                    <div id="componentWindow" className="component-title">Component Window</div>
                    <textarea id="componentWindowTextInput" defaultValue={file} onChange={handleFileChange} />
                    <div id="templatePreviewWindow" className="component-title">Test Preview</div>
                    <div className='code-mirror-wrapper'>
                        <CodeWindow
                            value=''
                            displayName=''
                            onMount={onMount}
                            onChange={valueCapture}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateTemplate;