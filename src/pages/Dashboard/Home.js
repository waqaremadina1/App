import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='text-center'>
            <h1 className=" py-3">Home of Dashboard</h1>
            <Link to="/" className='btn btn-info' style={{fontWeight: 'bolder'}} >Home</Link> <br /> <br />
           <div className='container'>
            <div className="row">
                <div className="col">
                <p className="text-dark" style={{fontWeight: 'bolder'}}>
The Event Management App Dashboard is a sleek, user-friendly interface designed to streamline task management. <br />
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Built with React, it provides a responsive and visually appealing platform for organizing daily tasks and
long-term projects.</p>
                </div>
            </div>
           </div>
        </div>
    )
}
