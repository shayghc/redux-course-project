/*
    Characteristics of a pure function
    1. They always return the same result if the same arguments are passed in.
    2. They depend only upon the arguments passed into them.
    3. The never produce any side-effects.
*/

// Library code **********************************************************************
function createStore(reducer) {
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

// App code **************************************************************************
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE-TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action creators
function addToDoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeToDoAction(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleToDoAction(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(goal) {
    return {
        type: REMOVE_GOAL,
        goal,
    }
}

// Reducer function - for TODOS
function todos(state = [], action) {
    switch(action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo : 
            Object.assign({}, todo, {complete: !todo.complete}))
        default:
            return state
    }
}

// Reducer function - for GOALS
function goals(state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}


const store = createStore(app)

store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

// These functions will "dispatch an action"
store.dispatch(addToDoAction({
        id: 0,
        name: 'Walk the dog',
        complete: false,
}))

store.dispatch(addToDoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
}))

store.dispatch(addToDoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
}))

store.dispatch(removeToDoAction(1))

store.dispatch(toggleToDoAction(0))

store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
}))

store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
}))

store.dispatch(removeGoalAction(0))