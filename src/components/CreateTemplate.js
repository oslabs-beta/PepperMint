import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css'
import CodeWindow from './CodeWindow';


const CreateTemplate = (props) => {

    // const imports = `Import AComponent from './apath/to/AComponent'\n`
    // const describe = `\n\ndescribe('AComponent', () => {\n\n\n`
    // const beforeAll = `beforeAll(() => {\n\n})\n\n`
    // const test = `test('', => {\n\n})\n\n}`


    const codeTemplateObj = {
        imports: ['import React from \'react\'', 'import AComponent from \'./aDirectory/AComponent\''],
        describe: {
            mock: {
                
            },
            props: {

            },
            beforeAll: {

            },
            tests: [['expect()','expect()','expect()'], 
                    ['expect()','expect()','expect()'], 
                    ['expect()','expect()','expect()']]
        }
    }



    const [javascript, setJs] = useState(imports + describe + beforeAll + test);

    const handleInsertBefore = () => {
        setJs(`console.log('lol')\n` + javascript);
    }

    const handleInsertAfter = () => {
        setJs(javascript + `\nconsole.log('lol')`);
    }

    return (
        <div className="display-flex">
            <div className="flex-1">
                <h1>Create Template</h1>
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Insert template" />
                    <Link to="/templatehome"><button type='submit'>Save Your Template!</button></Link>
                </form>
            </div>
            <div className="flex-1">
                <div className='code-mirror-wrapper'>
                    <CodeWindow 
                    displayName='Code Preview' 
                    language='javascript'
                    value={javascript}
                    onChange={setJs}
                    />
                </div>
                <button onClick = {handleInsertAfter}> Insert After </button>
                <button onClick = {handleInsertBefore}> Insert Before </button>

            </div>
        </div>

    )
}

export default CreateTemplate;