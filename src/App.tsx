import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './frontend/styles/GlobalStyle';
import colors from './frontend/styles/colors';
import Home from './frontend/pages/Home';
import SignIn from './frontend/pages/SignIn';
import SignUp from './frontend/pages/SignUp';
import Header from './frontend/components/organisms/Header';
import Question from './frontend/pages/Question';
import Answer from './frontend/pages/Answer';
import Footer from './frontend/components/molescules/Footer';
import { ScrollToTop } from './frontend/utils/ScrollToTop';
import MyPage from './frontend/pages/MyPage';

function App() {
  return (
    <div className='App'>
      <RecoilRoot>
        <ThemeProvider theme={colors}>
          <GlobalStyle />
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signIn' element={<SignIn />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route path='/question' element={<Question />}></Route>
              <Route path='/answer' element={<Answer />}></Route>
              <Route path='/myPage' element={<MyPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
