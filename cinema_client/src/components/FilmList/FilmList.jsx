import React from "react";
import FilmItem from "../FilmItem/FilmItem";
import './FilmList.css'


const FilmList = ({films}) => {
    if (!films.length){
        return (
            <div className='filmsNotFound'>
                <p className='pSelect'>Таких фильмов нет(</p>
                <img src='/images/favicon.png' alt='Не загрузилось' style={{width:'150px'}}/>
            </div>
        )
    }    
    return (
        <div className='filmList'>            
        {
        films.map((film)=>
            <FilmItem film={film} key={film.id}/>)  
        }
        </div>  
    )
}


export default FilmList;