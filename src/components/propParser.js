//prop parser that parses through component definition


 function parse(component){
    //console.log('inside searchProps')
 
    if (component.startsWith('props')) return searchProps(component);
 
    let i = 0;
 
    if (component.startsWith('_ref')){
 
     while (i < component.length){
         if (component.slice(i).startsWith('var')){
             return searchDesProps(component.slice(i+3));
         }
       i++;
     }
    }
    function searchProps(component){
     
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
   //console.log("got to getprop")
     
     let newString = '';
     let i = 0;
     while (i < propAndRest.length && /^[a-zA-Z0-9]+$/.test(propAndRest[i])){
       //console.log(newString)
       newString += propAndRest[i];
       i++;
     }
   //console.log("got through while")
     return [newString, i];
  
  }
  
  
  
  function searchDesProps(component){
      let i = 0;
    //console.log(component)
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
 }
 
 
 
//  console.log(parse('props => { var idk = false; return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "".concat(props.label, ": ")), props.text); }'));
//  console.log(parse('_ref => {var {label, text} = _ref; var idk = false; return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "".concat(label, ": ")), text); }'));