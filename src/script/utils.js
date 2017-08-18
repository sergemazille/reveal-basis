// check for a partial class name in a classList
export function classListIncludes(classList, string) {
    return classList.value.includes(string);
}

// convert milliseconds into css duration property (eg. 300 => .3s)
export function getCssDuration(milliseconds) {
    return (milliseconds / 1000 + 's');
}
