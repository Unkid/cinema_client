import React from "react";
import './MyCalendar.css'

const MyCalendar = ({dayArray, date, currentDate, setDate}) => {

    const months = ['Январь', 'Февраль', 'Март','Апрель','Май','Июнь',
                    'Июль','Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]

    return(
        <div className='myCalendar'>
            <p>{months[currentDate.getMonth()]}</p>
            <div className='datesBtns'>
                {dayArray.map(day => 
                <button 
                    className={day===date ? 'date current':'date'}
                    onClick={e => setDate(Number(e.target.textContent))}
                    key={day}>
                    {day}
                </button>)}
            </div>              
        </div>
    )
}



export default MyCalendar;