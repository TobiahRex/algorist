function marsExploration(s) {
    let [pattern, i, j, count] = ['SOS', 0, 0, 0]
    while (true) {
        i = i % pattern.length
        if (j >= s.length) break
        if (s[j++] != pattern[i++]) count += 1
    }
    return count
}

console.log('answer: ', marsExploration('SOSSPSSQSSOR'))
