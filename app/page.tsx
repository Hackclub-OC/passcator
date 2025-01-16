import React from 'react';
import PasswordStrengthIndicator from '../components/password-strength-indicator';

function App() {
  return (
    <div className="App">
      <main className="container mx-auto p-4 min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black">
        <PasswordStrengthIndicator />
      </main>
    </div>
  );
}

export default App;

