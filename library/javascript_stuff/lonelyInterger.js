// function lonelyInteger(a) {
//     a.sort((a, b) => a - b)
//     for (let i = 0; i < a.length; i++) {
//         for (let j = 0; j < a.length; j++) {
//             console.log(a.lastIndexOf(a[j]) == a.indexOf(a[i]))
//             if (a.lastIndexOf(a[j]) == a.indexOf(a[i])) {
//                 return a[j]
//             }
//         }
//     }
// }

function lonelyInteger(a) {
    const memo = a.reduce((acc, n) => {
        if (n in acc) acc[n] += 1
        else acc[n] = 1
        return acc
    }, {})
    const [num, _] = Object
        .entries(memo)
        .reduce(([num, freq], [memo_num, memo_freq]) => {
            if (memo_freq < freq) return [memo_num, memo_freq]
            return [num, freq]
        }, [null, Infinity])
    return Number(num)
}

console.log(lonelyInteger([1, 2, 1, 2, 5, 7, 6, 5, 6]))

