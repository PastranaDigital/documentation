// makes all characteres lowercase, and strips whitespace from a string

export const formatStringForSearch = (string) => {
    // if a number, stringify else enforce string input
    if (typeof string === 'number') string = JSON.stringify(string);
    return typeof string === 'string' && string?.toLowerCase()?.replace(/(\r\n|\n|\r)/gm, "")?.replace(/\s/g, "") || '';
}

export const flatSearch = (list, searchString, propsToSearch) => {
    try {
        if (propsToSearch?.length) {
            return list.filter(listEntry => {
                for (const [key, value] of Object.entries(listEntry)) {
                    if (!propsToSearch.includes(key)) continue
                    return formatStringForSearch(value).includes(formatStringForSearch(searchString));
                } 
            })
        } else {
            return list.map(entry => {
               for (const val of Object.values(entry)) {
                   if (!formatStringForSearch(val).includes(formatStringForSearch(searchString))) continue;
                   return entry; 
               }
            }).filter(e => e != null); // filtering out null values
        }
    } catch (error) {
        console.error(error);
    }
    
}

/** get an array of objects between two dates, includes start and end date */
export const betweenTwoDates = ({start, end, list, field}) => {
    
    try {
        if (start && end) {
            return list.filter(item => Date.parse(item[field] || 0) >= Date.parse(start) && Date.parse(item[field] || 0) <= Date.parse(end));
        } else {
            if (start) {
                return list.filter(item => Date.parse(item[field] || 0) >= Date.parse(start));
            } else {
                return list.filter(item => Date.parse(item[field] || 0) <= Date.parse(end));
            }
        }
    } catch (err) {
        console.error(err);
    }
    
}

