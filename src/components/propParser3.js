function findComponent(component){
console.log(component)
    let i = 0;
    while (i < component.length){
        if (component.slice(i).startsWith('const')){
            return parseComponent(component.slice(i+5));
        }
    i++;
    }
}

function parseComponent(component){
console.log(component)
    let i = 0;
    while (i < component.length){
        if (/[A-Z]/.test(component[i])){
            return parse(component.slice(i));
        }
    i++;
    }

}


function parse(component){
console.log(component)


    let i = 0;
    while (i < component.length){

        if (component.slice(i).startsWith('(')){
        return check(component.slice(i));

        }
    i++;
    
    
    }
return 'not a valid component'
}

function check(component){
console.log(component)
let i = 0;

while (i !== ')'){
    const section = component.slice(i)
    if (section.startsWith('props')){

        return searchProps(component.slice(i+4));
    }
    if (section.startsWith('{')){

        return searchDesProps(component.slice(i));
    }
    i++;
}

}
function searchProps(component){
    console.log(component)
    
    let i = 0;

    const props = {};

    while (i < component.length){

        let propAndI;

        if (component.slice(i, i+6) === 'props.') {

            propAndI = getProp(component.slice(i+6))

            props[propAndI[0]] = '';
            i += propAndI[1];
        }
        else{
            i++;
        }
        
    }
    return props;

}

function getProp(propAndRest){
    console.log(propAndRest)

    
    let newString = '';
    let i = 0;
    while (i < propAndRest.length && /^[a-zA-Z0-9]+$/.test(propAndRest[i])){

    newString += propAndRest[i];
    i++;
    }

    return [newString, i];

}



function searchDesProps(component){
    console.log(component)
    let i = 0;

    while (i < component.length){
        if (component[i] === '{'){
            return parseObject(component.slice(i+1));
        }
        i++;
    }

}

function parseObject(props){
    console.log(props)
    const makeProps = {};
    let i = 0;
    let propAndI;
    while (i < props.length && props[i] !== '}'){
        if (/^[a-zA-Z0-9]+$/.test(props[i])){
            propAndI = getProp(props.slice(i))
            makeProps[propAndI[0]] = '';
            i += propAndI[1];
        }
        else{
            i++;
        }

    }
    return makeProps;
}


console.log(findComponent('const LabeledText = ({ label, text }) => (<p><strong>{`${label}: `}</strong>{text}</p>);'));
console.log(parse('const LabeledText2 = (props) => (<p><strong>{`${props.label}: `}</strong>{props.text}</p>);'));

