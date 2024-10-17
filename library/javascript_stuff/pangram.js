
function pangrams(s) {
    const a_code = 'a'.charCodeAt(0)
    const alphabet = Array('z'.charCodeAt(0) - a_code + 1)
        .fill()
        .map((_, i) => String.fromCharCode(i + a_code))
    const input = new Set(s
        .split('')
        .map((n) => n.toLowerCase()))
    const result = alphabet.filter((n) => !input.has(n))
    return (result.length ? 'not pangram' : 'pangram')
}

result = pangrams('We promptly judged antique ivory buckles for the next prize')
console.log('Result: ', result)