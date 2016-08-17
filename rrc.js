(function(clArguments) {
  fs = require('fs');
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

  // create files for each file name in above array
  const createFiles = (allResourceFileNames) => {
    allResourceFileNames.forEach((resourceFileNames) => {
      let dirName = resourceFileNames.dir;
      fs.mkdirSync(`./${dirName}`);
      resourceFileNames.files.map((file) => {
        fs.writeFile(`./${dirName}/${file}`, `This is file ${file}!`, (err) => {
          if (err) throw err;
          console.log(`${file} saved!`);
        });
      });
    });
  }

  // driver
  createFiles(createResourceFileNames(resources));
})(process.argv);
