import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import parse from './propParser2.js';
import * as ReactDOMServer from 'react-dom/server';
import CodeWindow from './CodeWindow';

const FinalDraft = (props) => {
  const [doc, setDoc] = useState('');

  const onMount = (editor, next) => {
    setDoc(editor);
  }

  const valueCapture = (_, __, value) => {
    console.log(value);
  }


  return (
    <div className='code-mirror-wrapper'>
      <CodeWindow
        value={window.sessionStorage.getItem("finalDraft")}
        displayName=''
        onMount={onMount}
        onChange={valueCapture}
        options={{
          lineWrapping: true,
          lint: true,
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
          readOnly: false,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-bookmark"]
        }}
      />
    </div>
  )
}

export default FinalDraft;