module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'add a new component to the project',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What\'s your component called?'
    }, {
      type: 'list',
      name: 'type',
      choices: ['functional', 'class'],
      message: 'What type of component?'
    }],
    actions: [{
      type: 'add',
      path: 'src/components/{{properCase name}}/{{properCase name}}.js',
      templateFile: 'utils/plop-templates/component/{{type}}.hbs'
    }, {
      type: 'add',
      path: 'src/components/{{properCase name}}/__tests__/{{properCase name}}.spec.js',
      templateFile: 'utils/plop-templates/component/component-spec.hbs'
    }, {
      type: 'add',
      path: 'src/components/{{properCase name}}/{{properCase name}}.mscss',
      templateFile: 'utils/plop-templates/component/css.hbs'
    }, {
      type: 'add',
      path: 'src/components/{{properCase name}}/index.js',
      templateFile: 'utils/plop-templates/component/index-export.hbs'
    }],
  });

  plop.setGenerator('container', {
    description: 'add a new container to the project',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What\'s your container called?'
    }, {
      type: 'input',
      name: 'component',
      message: 'What component is your container wrapping?'
    }],
    actions: [{
      type: 'add',
      path: 'src/containers/{{properCase name}}/{{properCase name}}.js',
      templateFile: 'utils/plop-templates/component/container.hbs'
    }, {
      type: 'add',
      path: 'src/containers/{{properCase name}}/__tests__/{{properCase name}}.spec.js',
      templateFile: 'utils/plop-templates/component/container-spec.hbs'
    }, {
      type: 'add',
      path: 'src/containers/{{properCase name}}/index.js',
      templateFile: 'utils/plop-templates/component/index-export.hbs'
    }],
  });

  plop.setGenerator('reducer', {
    description: 'add a new reducer to the project',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What\'s your reducer function called?'
    }],
    actions: [{
      type: 'add',
      path: 'src/reducers/{{lowerCase name}}/{{lowerCase name}}.js',
      templateFile: 'utils/plop-templates/reducer/reducer.hbs'
    }, {
      type: 'add',
      path: 'src/reducers/{{lowerCase name}}/__tests__/{{lowerCase name}}.reducer.spec.js',
      templateFile: 'utils/plop-templates/reducer/reducer-spec.hbs'
    }, {
      type: 'add',
      path: 'src/reducers/{{lowerCase name}}/__tests__/{{lowerCase name}}.action-creators.spec.js',
      templateFile: 'utils/plop-templates/reducer/action-creators-spec.hbs'
    }, {
      type: 'add',
      path: 'src/reducers/{{lowerCase name}}/__tests__/{{lowerCase name}}.selectors.spec.js',
      templateFile: 'utils/plop-templates/reducer/selectors-spec.hbs'
    }, {
      type: 'add',
      path: 'src/reducers/{{lowerCase name}}/__tests__/{{lowerCase name}}.thunks.spec.js',
      templateFile: 'utils/plop-templates/reducer/thunks-spec.hbs'
    }],
  });

  plop.setGenerator('util', {
    description: 'add a new util function to the project',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What\'s your util function called?'
    }],
    actions: [{
      type: 'add',
      path: 'src/utils/{{lowerCase name}}/{{lowerCase name}}.js',
      templateFile: 'utils/plop-templates/generic/generic.hbs'
    }, {
      type: 'add',
      path: 'src/utils/{{lowerCase name}}/__tests__/{{lowerCase name}}.spec.js',
      templateFile: 'utils/plop-templates/generic/generic-spec.hbs'
    }],
  });
};
