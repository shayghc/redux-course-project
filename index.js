function createStore () {
    // The store should have four parts:
    // 1. The state
    // 2. Get the state
    // 3. Listen to the state
    // 4. Update the state

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        // Remove listener from the array after the listener function has been invoked
        return () => {
            listener = listeners.filter((l) => l !== listener)
        }
    }

    return {
        getState,
        subscribe
    }
}