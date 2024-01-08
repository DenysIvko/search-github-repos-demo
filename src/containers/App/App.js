import React from 'react';
import './App.scss';
import Repos from 'containers/Repos';
import ErrorBoundary from 'components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Repos />
    </ErrorBoundary>
  );
}

export default App;
