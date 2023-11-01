import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const CodeWindow = ({value, displayName, onMount, onChange}) => {

  return (
      <div className={'editor-container'}>
        <div className='editor-title'>
          {displayName}
        </div>
          <CodeMirror
            editorDidMount={onMount}
            onChange={onChange}
            value={value}
            className='code-mirror-wrapper'
            options={{
              lineWrapping: true,
              lint: true,
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
              readOnly: true,
              gutters: ["CodeMirror-linenumbers", "CodeMirror-bookmark"]
            }}
          />
      </div>
  );

}

export default CodeWindow;