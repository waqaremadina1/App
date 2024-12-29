import React from 'react'

export default function NoPage(props) {

    const {text} = props

  return (
    <div className='py-5'>
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1 className='text-center text-white'>{text ? text : 'Error 404'}</h1>
                <h1 className='text-center text-white'>{text ? text : 'Page Not Found'}</h1>
                
            </div>
        </div>
    </div>
    </div>
  )
}
