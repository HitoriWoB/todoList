import {TODO_ADD, TODOS_LOAD, TODO_REPLACE, REMOVE_TODO} from './todo';

const MESSAGE_SHOW = 'MESSAGE_SHOW';

export const showMessage = (message) => ({type: MESSAGE_SHOW, payload: message});

export default function(state='', action) {
    switch(action.type) {
        case MESSAGE_SHOW:
            return action.payload;
        case TODO_ADD:
        case TODOS_LOAD:
        case TODO_REPLACE:
        case REMOVE_TODO:
            return '';
        default:
            return state;
    }
}