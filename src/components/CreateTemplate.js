import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import parse from './propParser2.js';
import * as ReactDOMServer from 'react-dom/server';
import CodeWindow from './CodeWindow';

//NEED TO CREATE A BACK BUTTON FOR RECHOOSING THE FILE STRUCTURE. 

const CreateTemplate = (props) => {

  const [lineState, setLineState] = useState('');
  const [doc, setDoc] = useState('');
  const [posArray, setPosArray] = useState([])
  

  let componentName = 'aComponent'
  const boilerPlate = [];

  const codeTemplate = [
    '\n', '\n', '\n', '\n', 'describe(\'Unit testing for placeholder\ () => {', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '}', '\n', '\n'
  ];

  const onMount = (editor, next) => {
    
    editor.replaceRange((codeTemplate.join('')).replaceAll('placeholder', componentName.slice(1)), { line: 0, char: 0 })

    const bookmarkCreator = (lineNo, charNo) => {
      const ac = document.createElement("span")
      ac.textContent = ' ';
      ac.className = 'codemirror-bookmark';
      ac.title=`${posArray.length}`

      return editor.setBookmark({line: lineNo, char: charNo}, ac);
    }

    boilerPlate.push(
      {
        zone: 'imports',
        indentLevel: 0,
        start: bookmarkCreator(0, 0),
        end: bookmarkCreator(2, 0),
        contents: [

        ]
      },
      {
        zone: 'setup',
        indentLevel: 1,
        start: bookmarkCreator(6, 0),
        end: bookmarkCreator(8, 0),
        contents: [

        ]          
      },
      {
        zone: 'props',
        indentLevel: 1,
        start: bookmarkCreator(10, 0),
        end: bookmarkCreator(12, 0),
        contents: [

        ]
      },
      {
        zone: 'tests',
        indentLevel: 1,
        start: bookmarkCreator(14, 0),
        end: bookmarkCreator(16, 0),
        contents: [

        ]
      }
    )

    setDoc(editor);
    addContents(editor);
  }

  const addContents = (editor) => {

    addAtBookmarks(editor, '\nimport React from \'react\'', boilerPlate[0].start.find().line)
    addAtBookmarks(editor, '\nconst props = {\n\n\n}', boilerPlate[2].start.find().line)

  }

  const addAtBookmarks = (editor = doc, insertValue, insertLine) => {
    editor.replaceRange(insertValue, { line : insertLine, char: 0 });
  }

  const valueCapture = (_, __, value) => {
      console.log(value);
  }

  const addAllProps = (event) => {
      event.preventDefault();

      const propsObj = Object.keys(JSON.parse(userProps));

      for (let i = 0; i < propsObj.length; i++) {
          if (i === propsObj.length - 1) handleInsert(`${propsObj[i]}: ''\n`, 0);
          else handleInsert(`${propsObj[i]}: '',\n`, 0);
      }

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
          componentName = (((fileCode.split('export default'))[1]).split(';'))[0];
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
              <Link to="/templateHome"><button className="dropbtn" id="bigSaveTemplateButton">Save Template</button></Link>
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

