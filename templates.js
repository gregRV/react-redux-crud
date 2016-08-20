const EOL = require('os').EOL;

const resourceClass = (resource) => {
  return `import React, { Component } from 'react';${EOL}
    class ${resource} extends Component {${EOL}
      render() {
        return <div>
        </div>
      }
    }
    `
}

const resourceActionTypes = (resource) => {
  const keys = ['FETCH_', 'CREATE_', 'UPDATE_', 'DELETE_'];
  const status = ['_START', '_SUCCESS', '_ERROR'];
  const resourceCaps = resource.toUpperCase();
  let actionTypes = {};
  
  keys.forEach((key) => {
   status.forEach((status) => {
     actionTypes[`${key}${resourceCaps}${status}`] = `${key}${resourceCaps}${status}`;
   }); 
  });

  return Object.keys(actionTypes).reduce((memo, curr) => {
    const current = actionTypes[curr];
    memo += `export const ${current} =\t'${current}';${EOL}`;
    return memo;
  }, '');
}

const resourceActions = (resource) => {
  let actions = {};
  const keys = {
    fetch: 'Fetch',
    create: 'Create',
    delete: 'Delete'
  };
  const capitalized = resource[0].toUpperCase() + resource.substr(1);

  return Object.keys(keys).reduce((memo, key) => {
    memo +=
    `export function ${key}${capitalized}() {
      return dispatch => {
        dispatch({type: ${key.toUpperCase()}_${resource.toUpperCase()}_START});
        api${keys[key]}${capitalized}()
          .then((data) => { dispatch({type: ${key.toUpperCase()}_${resource.toUpperCase()}_SUCCESS, payload: data}) });${EOL}
      `
    return memo;
  }, '');
}

const resourceReducer = (resource) => {
  const caps = resource.toUpperCase();
  
  return `
    import {
      FETCH_${caps}_START,
      FETCH_${caps}_SUCCESS,
      FETCH_${caps}_ERROR,
      CREATE_${caps}_START,
      CREATE_${caps}_SUCCESS,
      CREATE_${caps}_ERROR,
      UPDATE_${caps}_START,
      UPDATE_${caps}_SUCCESS,
      UPDATE_${caps}_ERROR,
      DELETE_${caps}_START,
      DELETE_${caps}_SUCCESS,
      DELETE_${caps}_ERROR
    } from ./${resource}-actions;

    function ${resource}(state=[], action) {
      switch(action.type) {
        case FETCH_${caps}_START:
          return state;
        case FETCH_${caps}_SUCCESS:
          return state;
        case FETCH_${caps}_ERROR:
          return state;
        
        case CREATE_${caps}_START:
          return state;
        case CREATE_${caps}_SUCCESS:
          return state;
        case CREATE_${caps}_ERROR:
          return state;
          
        case UPDATE_${caps}_START:
          return state;
        case UPDATE_${caps}_SUCCESS:
          return state;
        case UPDATE_${caps}_ERROR:
          return state;
        
        case DELETE_${caps}_START:
          return state;
        case DELETE_${caps}_SUCCESS:
          return state;
        case DELETE_${caps}_ERROR:
          return state;

        default:
          return state;
      }
    }
  `;
}

// console.log(resourceClass('User'));
// console.log(resourceActionTypes('User'));
console.log(resourceActions('user'));
console.log(resourceReducer('user'));
module.exports = resourceClass;
