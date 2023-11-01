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

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className='code-mirror-wrapper'>
        <CodeWindow
          value={window.sessionStorage.getItem("finalDraft")}
          displayName=''
          onMount={onMount}
        />
      <br></br>
        <button onClick={copyClipboard}>Copy Code</button>
      </div>
    </>
  )
}

export default FinalDraft;