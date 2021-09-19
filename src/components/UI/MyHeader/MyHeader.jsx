import React from "react";
import './MyHeader.css'

const MyHeader = ({options, filter, setFilter}) => {
    return (
        <header className='myHeader'>
            <div className='headerOptions'>
                {options.map(option => 
                    <p className='headerOption'>{option}</p> 
                )}
            </div>
            <div className="headerSearch">
                <input value={filter.query}
                onChange={e=> setFilter({...filter, query: e.target.value})}
                placeholder='Поиск...' />
            </div>
        </header>
    )
}

export default MyHeader;