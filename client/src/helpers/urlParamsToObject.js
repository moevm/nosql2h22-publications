export function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) {
        if(value)
            result[key] = value;
    }
    return result;
}