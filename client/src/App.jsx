import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './scss/index.scss';
import MainPage from "./pages/MainPage/MainPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;