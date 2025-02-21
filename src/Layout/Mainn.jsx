import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Mainn = () => {
    return (
        <div className='max-w-5xl mx-auto'>
        <Header></Header>
        <Outlet></Outlet>
        </div>
    );
};

export default Mainn;