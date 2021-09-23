import React from "react";
import MySelect from "../UI/MySelect/MySelect";
import './FilmFilter.css'

const FilmFilter = ({filter, setFilter}) => {

    return(
        <div className="filterFilm">
            <div className="filmSearch">
                <input className='filterInput'
                value={filter.query}
                onChange={e=> setFilter({...filter, query: e.target.value})}
                placeholder='Поиск...' />
            </div>
            <MySelect
            value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort:selectedSort})}
                defaultValue="Сортировка по"
                options={[
                {value: 'title', name:'По названию'},
                {value: 'rate', name:'По рейтингу'},
                ]}
            />
    </div>
    )
}



export default FilmFilter;