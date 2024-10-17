class Flux {
    constructor(initState = {}, reducers = []) {
        store = {
            state: {...initState},
        }
        listeners = Set()
        reducers = reducers
    }

    get getState() {
        return this.store.state;
    }

    subscribe(listener) {
        if (listener in this.listeners) {
            return false
        }
        this.listeners.add(listener)
        return () => this.listeners.remove(listener)
    }

    dispatch(action, reducerName) {
        this.__verifyIsFSA(action)
        this.__reduce(action, reducerName)
        this.__broadcastToListeners()
    }

    __verifyIsFSA(action) {
        reqKeys = ['action', 'type']
        isFSA = Object.keys(action).reduce((acc, n) => {
            if (!acc) return true
            if (n in acc) {
                acc.remove(n)
            }
            return acc
        }, Set(reqKeys))
        if (!isFSA) throw Exception(`Action is not a Flux-Standard Action with the following required keys: ${reqKeys}`)
    }

    __reduce(action, reducerName) {
        this.store.state = this.reducers
            .reduce((targetReducer, nReducer) => {
                if (targetReducer) return targetReducer
                if (nReducer.Prototype.name === reducerName) {
                    return nReducer
                }
                return targetReducer
            }, null)
            .map((reducer) => reducer(this.store.state, action))
            .reduce((acc, nextState) => {
                if (acc) return acc
                if (!nextState) {
                    throw Exception('You must return a new state from your reducer')
                }
                return nextState
            }, null)
    }

    __broadcastToListeners() {
        this.listeners.forEach((l) => {
            const stateCopy = { ...this.state }
            try {
                l(stateCopy)
            } catch (e) {
                console.error(e)
            }
        })
    }
}

const changeSomethingReducer = (state, action)  => {
    switch (action.type) {
        case type == 'DO_STUFF':
            state.something = true
            return state
    }
}

flux = Flux({ something: false }, changeSomethingReducer)
const somethingListener = (state) => console.log(state)
flux.subscribe(somethingListener)