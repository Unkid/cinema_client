import React from "react";
import MyButton from "./UI/MyButton/MyButton";

const FilmItem = (props) => {
    return (
        <div className='filmItem'>
            <div className='filmHeader'>
                <p>{props.film.title}</p>
            </div>
            <div className="filmContent">
                <img src="/images/1.jpg" style={{width: '200px' }} alt='alternate text'/>
                <p>{props.film.genre}</p>                
                <p>{props.film.description}</p>             
            </div>
            <div className='filmBtns'>
                <MyButton>Расписание и билеты</MyButton>
            </div>
        </div>
    )

}


export default FilmItem;