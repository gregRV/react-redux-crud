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

// console.log(resourceClass('User'));
// console.log(resourceActionTypes('User'));
// console.log(resourceActions('user'));
module.exports = resourceClass;
