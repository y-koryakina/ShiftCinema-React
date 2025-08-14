import React from 'react';
import './App.css'
import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import MovieSch from './components/MovieSch/MovieSch.jsx';
import UserData from './components/UserData/UserData.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ROUTES} from "./config/routes.js";


const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main">
                    <Routes>
                        <Route path={ROUTES.HOME} element={<MovieList />} />
                        <Route path={ROUTES.MOVIE_DETAIL_TEMPLATE} element={<MovieDetail />} />
                        <Route path={ROUTES.SEANCE_TEMPLATE} element={<MovieSch />} />
                        <Route path={ROUTES.DATA_FORM} element={<UserData />} />
                    </Routes>
                </main>
            </div>
        </Router>
);
}

export default App;
