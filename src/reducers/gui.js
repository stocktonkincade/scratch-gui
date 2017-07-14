import {combineReducers} from 'redux';

module.exports = combineReducers({
    modals: require('./modals'),
    monitors: require('./monitors'),
    targets: require('./targets'),
    toolbox: require('./toolbox'),
    vm: require('./vm')
});
