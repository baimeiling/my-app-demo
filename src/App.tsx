// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import DiscoverPage from './components/DiscoverPage';

const AppContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 16px;
  text-align: center;
  background-color: #ff9500;
  color: white;
`;

const DiscoverPageWrapper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dataType = searchParams.get('type') || 'default';
  
  return <DiscoverPage dataType={dataType} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        {/* <Header>233乐园社区</Header> */}
        <Routes>
          <Route path="/" element={<DiscoverPageWrapper />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;