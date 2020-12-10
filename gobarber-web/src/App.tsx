import React from 'react';
import GlobalStyle from './styles/global';

import ToasContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <ToasContainer />

    <GlobalStyle />
  </>
);

export default App;
