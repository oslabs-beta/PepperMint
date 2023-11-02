import React from 'react';
import CodeWindow from './CodeWindow';

const FinalDraft = (props) => {
  let doc = {};

  const onMount = (editor, next) => {
    doc = editor;
    doc.setOption("readOnly", false);
  }

  const copyClipboard = (event) => {
      // Write the code to the clipboard
      navigator.clipboard.writeText(doc.getValue());
  }

  let file = window.sessionStorage.getItem('fileCode')

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className='final-page'>

        <textarea id='finalComponent' defaultValue={file} />
      
        <div className='code-mirror-wrapper'>
          <CodeWindow
            value={window.sessionStorage.getItem("finalDraft")}
            displayName=''
            onMount={onMount}
          />
          <br></br>
          <button onClick={copyClipboard} className='copyButton'>Copy Code</button>
        </div>

      </div>
      
    </>
  )
}

export default FinalDraft;