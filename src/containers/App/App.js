import React from 'react';
import './App.scss';
import Repos from 'containers/Repos';
import ErrorBoundary from 'components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur assumenda commodi corporis dolor
      doloremque eius esse incidunt, labore modi mollitia natus pariatur quisquam quos repudiandae sit totam.
      Blanditiis, quisquam.
      <Repos />
    </ErrorBoundary>
  );
}

export default App;
