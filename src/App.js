import React, { useState, useMemo } from 'react';
import FilmList from './components/FilmList';
import MyHeader from './components/UI/MyHeader/MyHeader';
import './styles/app.css'

function App() {
  const [films, setFilms] = useState([
    {id:1, title:'Spiderman', description:'Description', genre:'Action'},
    {id:2, title:'Inception', description:'Description', genre:'Thriller'},
    {id:3, title:'Interstellar', description:'Description', genre:'Drama'},
  ])

  const [filter, setFilter] = useState({query: ''})

  const filteredFilms = useMemo(()=>{
    return films.filter(film => film.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, films])

  
  return (
    <div className="App">
      <MyHeader filter={filter} setFilter={setFilter} options={['Расписание фильмов','Расписание кинотеатров','Будущие премьеры']} /> 
      <FilmList films={filteredFilms}/>      
    </div>
  );
}

export default App;
