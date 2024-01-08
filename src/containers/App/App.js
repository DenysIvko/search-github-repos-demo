import React from 'react';
import './App.scss';
import Repos from 'containers/Repos';
import ErrorBoundary from 'components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      123456789
      <Repos />
    </ErrorBoundary>
  );
}

export default App;
