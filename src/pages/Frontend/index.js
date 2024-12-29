import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Home/Hero'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


import Add from './Add/Add'

import NoPage from '../../components/NoPage'
import Read from './Read/Read'
import Edit from './Edit/Edit'

export default function Frontend() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route index element={<Hero />} />
                    <Route path='/read' element={<Read />} />
                    <Route path='/add' element={<Add />} />
                    <Route path='/edit' element={<Edit />} />
                    
                    
                   
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
