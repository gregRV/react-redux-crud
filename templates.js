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
  
  return actionTypes;
}

console.log(resourceClass('User'));
console.log(resourceActionTypes('User'));
module.exports = resourceClass;
