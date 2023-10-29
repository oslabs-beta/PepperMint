import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import parse from './propParser2.js';
import * as ReactDOMServer from 'react-dom/server';
import CodeWindow from './CodeWindow';

//NEED TO CREATE A BACK BUTTON FOR RECHOOSING THE FILE STRUCTURE. 

const CreateTemplate = (props) => {

  const [lineState, setLineState] = useState('');
  let doc = {}; // I changed this back from a stateful variable to a regular one.
  const [posArray, setPosArray] = useState([]);
  
  const navigate = useNavigate();

  let componentName = 'aComponent'
  const boilerPlate = {};

  const codeTemplate = [
    '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n'
  ];

  const codeLineLib = {

    a: '\na {\n\n\n}\n',
    b: '\nb( )bb( )( )\n'

  }

  const insertionPtLib = {

    a: [{start: {line: 3, char: 0}, end: {line: 4, char: 0}, kind: 'codemirror-subinsert'}],
    b: [{start: {line: 2, char: 2}, end: {line: 2, char: 3}, kind: 'codemirror-inline'}, 
        {start: {line: 2, char: 7}, end: {line: 2, char: 8}, kind: 'codemirror-inline'},
        {start: {line: 2, char: 10}, end: {line: 2, char: 11}, kind: 'codemirror-inline'}]

  }

  const onMount = (editor) => {    
    componentName = (((file.split('export default'))[1]).split(';'))[0]
    doc = editor;
    doc.replaceRange((codeTemplate.join('')).replaceAll('placeholder', componentName.slice(1)), { line: 0, char: 0 })

    Object.assign(
      boilerPlate,
      {
        a: {
          indentLevel: 0,
          start: bookmarkCreator({line: 0, char: 0}),
          end: bookmarkCreator({line: 3, char: 0}),
          insertionStart: bookmarkCreator({line: 1, char: 0}, 'codemirror-insertion-point'),
          insertionEnd: bookmarkCreator({line: 2, char: 0}, 'codemirror-insertion-point'),
          // 
          contents: [
            
          ]
        },
        b: {
          indentLevel: 1,
          start: bookmarkCreator({line: 6, char: 0}),
          end: bookmarkCreator({line: 9, char: 0}),
          insertionStart: bookmarkCreator({line: 7, char: 0}, 'codemirror-insertion-point'),
          insertionEnd: bookmarkCreator({line: 8, char: 0}, 'codemirror-insertion-point'),
          contents: [

          ]          
        }
      }
    );

    addContents();
    console.log(boilerPlate);
  }

  const addContents = () => {
    
    const fetchInsertionPt = (title, startOrEnd) => {
     return (startOrEnd === 's') ? boilerPlate[title].insertionStart.find() : boilerPlate[title].insertionEnd.find();
    }

    addAtBookmarks(codeLineLib['a'], fetchInsertionPt('a', 's').line, fetchInsertionPt('a', 'e').line)
    addAtBookmarks(codeLineLib['b'], fetchInsertionPt('b', 's').line, fetchInsertionPt('b', 'e').line)
    addNewInsertionPts('a');
    addNewInsertionPts('b');

  }

  const addAtBookmarks = (insertValue, start, end) => {
    doc.replaceRange(insertValue, { line : start, char: 0 }, { line : end, char: 1 });
  }

  const addNewInsertionPts = (title) => {
    
    insertionPtLib[title].forEach((insertionPt) => {

      const ac = document.createElement("span")
      ac.textContent = ' ';
      ac.className = insertionPt.kind;

      const bc = document.createElement("span")
      bc.textContent = ' ';
      bc.className = insertionPt.kind;

      boilerPlate[title].contents.push(
        {
          start: doc.setBookmark({line: boilerPlate[title].start.find().line + insertionPt.start.line, ch: insertionPt.start.char}, ac),
          end: doc.setBookmark({line: boilerPlate[title].start.find().line + insertionPt.end.line, ch: insertionPt.end.char}, bc)
        }
      );

    });
  }

  const valueCapture = (_, __, value) => {
    window.sessionStorage.setItem("finalDraft", value);
    return value;
  }

  const addAllProps = (event) => {
      event.preventDefault();

      const propsObj = Object.keys(JSON.parse(userProps));

      for (let i = 0; i < propsObj.length; i++) {
          if (i === propsObj.length - 1) addAtBookmarks(`\n${propsObj[i]}: ''\n`, boilerPlate[2].start.find().line);
          else addAtBookmarks(`${propsObj[i]}: '',\n`, boilerPlate[2].start.find().line);
      }

  }

  function bookmarkCreator(position, kind = 'codemirror-bookmark') {

    const ac = document.createElement("span")
    ac.textContent = ' ';
    ac.className = kind;

    return doc.setBookmark(position, ac);;
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userProps, setUserProps] = useState('{}');
  const [file, setFile] = useState(window.sessionStorage.getItem('fileCode'))

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

  const componentParsing = (event) => {
    event.preventDefault();

    let newUserProps = JSON.stringify(parse(file));
    setUserProps(newUserProps);
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
          componentName = (((file.split('export default'))[1]).split(';'))[0];
          console.log(componentName);
          setFile(fileCode)
          doc.replaceRange((codeTemplate.join('')).replaceAll('aComponent', componentName.slice(1)), { line: 0, char: 0 }, { line: 0, char: 0 })
      };

  }

  const newBookmark = (event) => {
    event.preventDefault();

    let ac = document.createElement("span")
    ac.textContent = ' ';
    ac.className = 'codemirror-bookmark';
    ac.title=`${posArray.length}`

    const currentPosArray = [... posArray];
    currentPosArray.push(doc.setBookmark({line: Number(lineState) - 1, char: 1}, ac))
    setPosArray(currentPosArray);
  }

  const findBookmarks = (event) => {
    event.preventDefault();

    console.log('posArray:')

    for (let i = 0; i < posArray.length; i++) {
      console.log(posArray[i].find());
    }

  }

  const insertionTest = (event) => {
    event.preventDefault();
    doc.replaceRange('\n\n\n\n', { line : 2, char: 0 });
  }

  function getLineNum(event){
    event.preventDefault();
    setLineState(event.target.value);
  }

  function goToFinalDraft(){
    navigate("/finaldraft")
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
                    <button className="dropbtn" onClick={insertionTest}>Add Test</button>
                    <br />
                    <br />
                    <input value={lineState} onChange={getLineNum}></input>
                    <button onClick={newBookmark}>Add Bookmark</button>
                    <button onClick={findBookmarks}>Find Bookmark</button>
                    <button 
                      onClick={(event) => { 
                        event.preventDefault()
                        doc.undo(); 
                      }}
                    >Undo</button>
                    <button 
                      onClick={(event) => { 
                        event.preventDefault()
                        doc.redo(); 
                      }}
                    >Redo</button>
                  </form>

                  <form id="subsection4">
                  </form>
              </div>
              <button className="dropbtn" id="bigSaveTemplateButton" onClick={goToFinalDraft}>Save Template</button>
          </div>

          <div id="CreateTemplateColumnTwo">
            <div id="componentWindow" className="component-title">Component Window</div>
            <textarea id="componentWindowTextInput" defaultValue={file} onChange={handleFileChange} />
            <div id="templatePreviewWindow" className="component-title">Template Preview</div>
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

