export function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) {
        if(key === 'year_publication' || key === 'number_quotes'){
            result[key] = JSON.parse(value);
        }
        else if(value)
            result[key] = value;
    }
    return result;
}