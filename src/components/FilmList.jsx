import React from "react";
import FilmItem from "./FilmItem/FilmItem";


const FilmList = ({films}) => {
    if (!films.length){
        return (
            <h1 style={{textAlign:'center'}}>Posts were not found</h1>
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