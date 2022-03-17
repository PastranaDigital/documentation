// object flattener
// takes an object with nested properties and brings them to the root of the object
export const flattenObject = ({...obj}, extractMultiples) => {
    const preFormatted = {...obj};
    // handling properties that show up more than once on sub-properties e.g. "value"
    Object.keys(obj).forEach(property => {
        if (obj[property].hasOwnProperty(extractMultiples)) {
            Object.keys(obj[property]).forEach(innerProp => {
                if (innerProp == extractMultiples) {
                    obj[property][property] = obj[property][innerProp]; 
                } 
            })
        }
    })
    
    const flattened = {}
  
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
        
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value))
      } else {
        flattened[key] = value
      }
    })

    flattened.preFormatted = preFormatted;
    delete flattened[extractMultiples];  // deleting value since the value property maps to value of the last

    return flattened
  }