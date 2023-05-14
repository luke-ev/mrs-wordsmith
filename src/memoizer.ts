type Args = any[];
type Memoized<Type> = (args: Args) => Type 

const memoizer = <Type>(func: Memoized<Type>) => {
    // create a cache
    const cache = new Map<string, Type>()
    // call function with args
    return (...args: Args) => {
        // stringify args
        const key = JSON.stringify(args);
        // check if args already exist in cache and try to return
        if (cache.has(key)) {
            return cache.get(key)
        }
        // create new result
        const result = func({ ...args });
        // set new result in cache
        cache.set(key, result);
        return result;
    }
}

// const memo = memoizer<number>((a: number, b: number) => {
//     return a * b
// });