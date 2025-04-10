var promise = job1()

function job1() {
    return new Promise((res, rej) => {
        setTimeout(() => res('hello'), 1000)
    })
}

function job2() {
    return new Promise((res, rej) => {
        setTimeout(() => res('world'), 1000)
    })
}

promise
.then((data) => console.log('1', data))
.then((data2) => {
    console.log('can you see me? ', data2)
    return job2()
})
.then((data3) => console.log('3: ', data3))
.then((data4) => console.log('4', data4))
.then(() => console.log(1))
.then(() => console.log(2))