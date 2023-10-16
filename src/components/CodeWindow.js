import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'

const CodeWindow = ({language, displayName, value, onChange}) => {

  // const [open, setOpen] = useState(true);

  const handleChange = (editor, data, value) => {
    onChange(value);
  }

  return (
      // <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className={'editor-container'}>
        <div className='editor-title'>
          {displayName}
          {/* <button onClick={() => setOpen(!open)}>
            O/C
          </button> */}
        </div>
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className='code-mirror-wrapper'
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true,
            readOnly: true
          }}
        />
      </div>
  );

}

export default CodeWindow;