import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './scss/index.scss';
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import GraphPage from "./pages/GraphPage";
import DescriptionPage from "./pages/DescriptionPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/graph" element={<GraphPage />} />
                    <Route path="/publication/[id]" element={<DescriptionPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;