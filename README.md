# Search Github Repos demo

## Demo
Link to demo app: https://search-github-repos-demo.herokuapp.com/

Table of contents:
* [Demo](#demo)
* [Features](#features)
  * Cancellable requests
  * Sorting
  * Requests caching
  * Suggestions
  * Google style!
  * Plop Templates
* [Testing](#testing)  
* [Styles](#styles)  
* [Available Scripts](#available-scripts)

## Features

### Cancellable requests
Requests are cancelled using [Axios Cancel token](https://github.com/axios/axios#cancellation). I find `redux-saga` the best way to handle cancellation token.
Here's where it's actually happening: https://github.com/DenysIvko/search-github-repos-demo/blob/master/src/sagas/index.js#L34

Also in order to avoid creating unnecessary requests, `debounce` method is used: https://github.com/DenysIvko/search-github-repos-demo/blob/master/src/sagas/index.js#L52

### Sorting
Sorting by starts is implemented by simple setting `sort` param in API request: https://github.com/DenysIvko/search-github-repos-demo/blob/master/src/api/repos/repos.js#L15

### Requests caching
For now requests are being cached in memory. That means once you reload your page, data will be lost. As a solution we may want to implement redux middleware to store state in LocalStorage. Anyway, here's how search results are being stored: https://github.com/DenysIvko/search-github-repos-demo/blob/master/src/reducers/repos/repos.js#L67
In short, it's just two collections.
`byId` collection contains all result items collected from all user requests.
`resultsByHash` collection contains ids of results for specific page and search query
```
{
  byId: {
    '1582': {
      id: 1582,
      name: 'angular',
      url: 'https://github.com/angular/angular'
      stargazers: 999
    },
    '3817': {
      id: 3817,
      name: 'angular.js',
      url: 'https://github.com/angular/angular.js'
      stargazers: 651
    }
  }
  resultsByHash: {
      'angular_1': {
        total: 1598,
        items: [1582, 3817]
      }
  }
}
```

### Suggestions
There's additional feature: suggestions. It's not really suggestions to be honest. Every time user search anything, search query is being saved so that when user tries to search anything else he'll see his previous search queries. These suggestions are quite intuitive to use, so I hope this feature doesn't need any istructions or FAQs.

### Google style!
Although design might seem to be a little weird, Google search was used as an example. Hope you'll find it useful.

## Testing
There is a couple of unit tests samples written using Jest + Enzyme.
E.g. https://github.com/DenysIvko/search-github-repos-demo/blob/master/src/components/AutosuggestInput/__tests__/AutosuggestInput.spec.js


## Styles
Super simple styling system: https://github.com/DenysIvko/search-github-repos-demo/blob/master/src/styles/index.scss
For styling React components [BEM methodology](https://en.bem.info/methodology/quick-start/) was chosen.


## Plop Templates
In order to create react components files, reducer files and other way faster, I added and configured [plop](https://www.npmjs.com/package/plop). Please find plop commands below in Available Scripts section.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverge`

Run tests and collect coverage. Coverage report will be generated in `./coverage`.

### `npm run plop`

Run plop cli. Helps to create different files (react components, reducer files, utils, etc) from template.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

