{
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
}

{
    type: 'REMOVE_TODO',
    id: 0,
}

{
    type: 'TOGGLE_TODO',
    id: 0,
}

{
    type: 'ADD_GOAL',
    goal: {
        id: 0,
        name: 'Run a marathon'
    }
}

{
    type: 'REMOVE_GOAL',
    id: 0
}

/*
    Characteristics of a pure function
    1. They always return the same result if the same arguments are passed in.
    2. They depend only upon the arguments passed into them.
    3. The never produce any side-effects.
*/
// Reducer function
function todos(state = [], action) {
    if(action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}

function createStore (reducer) {
    // The store should have four parts:
    // 1. The state
    // 2. Get the state - getState
    // 3. Listen to the state - subscribe
    // 4. Update the state - dispatch

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

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(todos)

// This function will "dispatch an action"
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})