(function(clArguments) {
  const fs = require('fs');
  const rs = require('./templates.js').resource;
  const resources = clArguments.slice(2);

  // construct array of resource file names (singular-naming assumed)
  const createResourceFileNames = (resources) => {
    return resources.map((resource) => {
      const capitalized = resource[0].toUpperCase() + resource.substr(1);
      return {
        dir: `${resource}s`,
        files: [
        `${capitalized}.js`,
        `${capitalized}List.js`,
        `${capitalized}ListItem.js`,
        `${capitalized}New.js`,
        `${capitalized}Edit.js`,
        `${resource}-actions.js`,
        `${resource}-reducer.js`,
        ]
      };
    });
  };

  const renderFile = (dirName, file) => {
    let fileTemp = '';
    if (file.includes('actions')) {
      fileTemp = 'actions';
    } else if (file.includes('reducer')) {
      fileTemp = 'reducer';
    }
    const res = dirName.substr(0, dirName.length-1);

    // CURRENTLY ONLY SET UP TO RECOGNIZE 'actionTypes' and 'reducer' FILES
    switch (fileTemp) {
      case 'actions':
        return (rs.actionTypes(res) + '\n' + rs.actions(res));
      case 'reducer':
        return rs.reducer(res);
      default:
        return `//${file} did not match any templates!`;
        break;
    }
  }

  // create files for each file name in above array
  const createFiles = (allResourceFileNames) => {
    allResourceFileNames.forEach((resourceFileNames) => {
      let dirName = resourceFileNames.dir;
      fs.mkdirSync(`./${dirName}`);
      resourceFileNames.files.map((file) => {
        fs.writeFile(`./${dirName}/${file}`, renderFile(dirName, file), (err) => {
          if (err) throw err;
          console.log(`${file} saved!`);
        });
      });
    });
  }

  // driver
  createFiles(createResourceFileNames(resources));
})(process.argv);
