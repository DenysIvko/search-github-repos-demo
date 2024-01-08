import React from 'react';
import './App.scss';
import Repos from 'containers/Repos';
import ErrorBoundary from 'components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      12345678
      <Repos />
    </ErrorBoundary>
  );
}

export default App;
