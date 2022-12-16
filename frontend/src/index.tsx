import * as ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export * from './runtime';
export * from './apis';
export * from './models';
import GetObjectsFromApi from './pages/objects';

import { DefaultConfig, Configuration } from './runtime';
import MenuNavbar from './pages/components/menu';
import HomeSite from './pages/home';
import CreatePortByApi from './pages/createObject';
import EditObjectByApi from './pages/editObject';
import GetObjectInfoFromApi from './pages/objectInfo';

DefaultConfig.config = new Configuration( { basePath: 'http://127.0.0.1:8000' } );

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <div>
        <MenuNavbar />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeSite />} />
                <Route path="object" element={<GetObjectsFromApi />} />
                <Route path="createObject" element={<CreatePortByApi />} />
                <Route path="editObject" element={<EditObjectByApi />} />
                <Route path="getObject" element={<GetObjectInfoFromApi />}/>
            </Routes>
        </BrowserRouter>
    </div>
);