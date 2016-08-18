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

console.log(resourceClass('User'));
module.exports = resourceClass;
