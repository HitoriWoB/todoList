import {getTodos, createTodo, updateTodo, destroyTodo} from '../lib/todoServices';
import {showMessage} from './messages';

const initstate = {
    todos: [],
    currentTodo: ''
};

const CURRENT_UPDATE = 'CURRENT_UPDATE';
export const TODOS_LOAD = 'TODOS_LOAD';
export const TODO_ADD = 'TODO_ADD';
export const TODO_REPLACE = 'TODO_REPLACE';
export const REMOVE_TODO = 'REMOVE_TODO';

export const updateCurrent = (val) => ({type:CURRENT_UPDATE, payload: val});
export const loadTodos = (todos) => ({type: TODOS_LOAD, payload: todos});
export const addTodo = (todo) => ({type: TODO_ADD, payload: todo});
export const replaceTodo = (todo) => ({type: TODO_REPLACE, payload: todo});
export const removeTodo = (id) => ({type: REMOVE_TODO, payload: id});

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(showMessage('Loading todos'));
        getTodos()
            .then(todos => dispatch(loadTodos(todos)))
    }
};
export const saveTodo = (name) => {
    return (dispatch) => {
        dispatch(showMessage('Saving Todo'));
        createTodo(name)
            .then(res => dispatch(addTodo(res)))
    }
};
export const toggleTodo = (id) => {
    return(dispatch, getState) => {
        dispatch(showMessage('Updating todo'));
        const {todos} = getState().todo;
        const todo = todos.find(t => t.id === id);
        const toggled = {...todo, complete: !todo.complete};
        updateTodo(toggled)
            .then(res => dispatch(replaceTodo(res)));
    }
};
export const deleteTodo = (id) => {
    return (dispatch) => {
        dispatch(showMessage('Removing from list'));
        destroyTodo(id)
            .then(()=>dispatch(removeTodo(id)))
    }
};

export const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'active':
            return todos.filter(t => !t.complete);
        case 'completed':
            return todos.filter(t => t.complete);
        default:
            return todos;
    }
};

export default (state = initstate, action) => {
    switch(action.type) {
        case TODO_ADD:
            return{...state, currentTodo: '', todos: state.todos.concat(action.payload)};
        case CURRENT_UPDATE:
            return{...state, currentTodo: action.payload};
        case TODOS_LOAD:
            return{...state, todos: action.payload};
        case TODO_REPLACE:
            return {...state, todos: state.todos
                .map(t => t.id === action.payload.id ? action.payload : t)};
        case REMOVE_TODO:
            return {...state,
                todos: state.todos.filter(t => t.id !== action.payload)
            };
        default:
            return state;
    }
}