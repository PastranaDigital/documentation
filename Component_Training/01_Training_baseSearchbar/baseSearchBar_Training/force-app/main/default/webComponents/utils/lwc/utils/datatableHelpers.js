// sorts a flat list with by property name and the type
export const sortFlatList = (list, property, direction) => {
    const { propertyName, type } = property;

    switch (type) {
        case "text":
            return list.sort((a, b) => {
                a = a[propertyName]?.toLowerCase() || "";
                b = b[propertyName]?.toLowerCase() || "";
                if (direction == "asc") {
                    return a > b ? 1 : -1;
                } else {
                    return b > a ? 1 : -1;
                }
            });

        case "date":
            return list.sort((a, b) => {
                a = Date.parse(a[propertyName]) || 0;
                b = Date.parse(b[propertyName]) || 0;

                if (direction == "asc") {
                    return a - b;
                } else {
                    return b - a;
                }
            });

        case "number":
            return list.sort((a, b) => {
                a = parseFloat(a[propertyName]) || 0;
                b = parseFloat(b[propertyName]) || 0;
                if (direction == "asc") {
                    return a - b;
                } else {
                    return b - a;
                }
            });
    }
};
