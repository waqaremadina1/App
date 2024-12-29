import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer>
            <div className="container-fluid bg-dark py-2">
                <div className="row">
                    <div className="col">
                        <p className="text-center text-white mb-0">&copy; {year}. <a className='text-white text-decoration-none' href="https://waqarjs.web.app" target='_blank'>Waqar-Codes.</a> All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
