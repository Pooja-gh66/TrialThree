import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import { Home } from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import Add from './pages/Add';

function App(){
  return(
    <BrowserRouter basename='/Visitors-Records-Main'>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      {/* <Route path='/add' element={<Add />}/> */}
      <Route path='/add' element={<Add />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);