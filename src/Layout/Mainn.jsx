import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Mainn = () => {
    return (
        <div>
            <Header></Header>
        <Outlet></Outlet>
        </div>
    );
};

export default Mainn;