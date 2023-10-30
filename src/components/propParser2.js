//prop parser that parses through component syntax



export default function parse(component){
    let i = 0;
    while (i < component.length){
        if (component.slice(i).startsWith('(')){
          return check(component.slice(i));
        }
      i++;
    }
  return 'not a valid component'
}

function findComponent(component){
  let i = 0;
  while (i < component.length){
      if (component.slice(i).startsWith('const')){
          return parseComponent(component.slice(i+5));
      }
    i++;
  }
}

function parseComponent(component){
  let i = 0;
  while (i < component.length){
      if (/[A-Z]/.test(component[i])){
          return parse(component.slice(i));
      }
    i++;
  }
}

function check(component){
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
     let i = 0;
     const props = {};
     while (i < component.length){
        let propAndI;
        if (component.slice(i, i+5) === 'props') {
          if (component[i+5] === '.'){
            propAndI = getProp(component.slice(i+6))
            props[propAndI[0]] = '';
            i += propAndI[1];
          }
          else return structure(component.slice(0, i))
        }
        else{
            i++;
        }
     }
     return props;
 }

 function getProp(propAndRest){
    let newString = '';
    let i = 0;
    while (i < propAndRest.length && /^[a-zA-Z0-9]+$/.test(propAndRest[i])){
      newString += propAndRest[i];
      i++;
    }
    return [newString, i];
 }

 function searchDesProps(component){
     let i = 0;
     while (i < component.length){
         if (component[i] === '{'){
             return parseObject(component.slice(i+1));
         }
       i++;
     }
 }

 function parseObject(props){
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

 function structure(component){
  const makeProps = {};
  let i = component.length-1;
  while (i >= 0 && component[i] !== '{'){
    let propString = '';
    if (/^[a-zA-Z0-9]+$/.test(component[i])){
        while (/^[a-zA-Z0-9]+$/.test(component[i])){
            propString = component[i] + propString;
            i--;
        }
        makeProps[propString] = '';
        propString = '';
    }
    else i--;
  }
  return makeProps;
 }
