import React from 'react';
import { Container } from '@mui/material'
import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import CreatorOrTag from './components/CreatorAndTags/CreatorOTTag';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Home/>} />
                    <Route path='/posts' exact element={<Home />} />
                    <Route path='/posts/search' exact element={<Home />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path={'/creators/:name'} element={<CreatorOrTag />} />
                    <Route path={'/tags/:name'} element={<CreatorOrTag />} />
                    <Route path="/auth" exact element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}
export default App;