import React from 'react';
import './App.scss';
import Repos from 'containers/Repos';
import ErrorBoundary from 'components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      1234567
      <Repos />
    </ErrorBoundary>
  );
}

export default App;
