let timeout;

function arm(changeCallback) {
    if (timeout) {
        clearTimeout(timeout);
    };
    timeout = setTimeout(() => {
        changeCallback();
        timeout = undefined;
    }, 0);
}

// function disarm() {
//     clearTimeout(timeout);
//     timeout = undefined;
// }

export default function wrap(data, changeCallback) {
    if (!data || typeof data != 'object') {
        throw new Error('Unacceptable data object for wrap()');
    }
    return new Proxy(data, {
        get: function (target, propertyKey) {
            //console.log('get:', propertyKey);
            const value = target[propertyKey];
            if (typeof value === 'object') {
                // Wrap sub-objects (including arrays) so assigning to a.b.c[0].d triggers refresh()
                return wrap(value, changeCallback);
            } else {
                return value;
            }

        },

        set: function (target, propertyKey, value) {
            //console.log('set:', propertyKey, value);
            if (target[propertyKey] !== value) {
                target[propertyKey] = value;
                arm(changeCallback);
            }
            return true; // Proxy contract
        },

        // apply: function (target, thisArg, argList) {
        //     //console.log('apply:', propertyKey, argList);
        //     const fn = target[propertyKey];
        //     return fn.apply(thisArg, argList);
        // }
    })
}