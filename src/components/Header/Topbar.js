import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'

export default function Topbar() {
    const [currentTime, setCurrentTime] = useState("")

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(dayjs().format("dddd MMMM D YYYY , hh:mm:ss A "))
        });
    }, [])
    return (
        <header>
            <div className="container-fluid bg-primary py-1">
                <div className="row">
                    <div className="col">
                        <p className="text-center text-white mb-0">{currentTime}</p>
                    </div>
                </div>
            </div>
        </header> 
    )
}
