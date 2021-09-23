import React, { useState, useMemo } from 'react';
import FilmFilter from './components/FilmFilter/FilmFilter';
import FilmList from './components/FilmList/FilmList';
import MyCalendar from './components/UI/MyCalendar/MyCalendar';
import MyHeader from './components/UI/MyHeader/MyHeader';
import MySelect from './components/UI/MySelect/MySelect';
import './styles/app.css'

function App() {
  const [films, setFilms] = useState([
    {id:1, title:'Человек-паук: Вдали от дома', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus dignissim tristique. Sed ac sollicitudin quam. Sed consectetur vitae tortor ac condimentum. Cras ac sodales odio. Quisque mi purus, vulputate', genre:'Action', rate:7.3},
    {id:2, title:'Начало', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus dignissim tristique. Sed ac sollicitudin quam. Sed consectetur vitae tortor ac condimentum. Cras ac sodales odio. Quisque mi purus, vulputate', genre:'Thriller', rate:8.7},
    {id:3, title:'Интерстеллар', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus dignissim tristique. Sed ac sollicitudin quam. Sed consectetur vitae tortor ac condimentum. Cras ac sodales odio. Quisque mi purus, vulputate', genre:'Drama', rate: 8.6},
    {id:4, title:'Джентельмены', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus dignissim tristique. Sed ac sollicitudin quam. Sed consectetur vitae tortor ac condimentum. Cras ac sodales odio. Quisque mi purus, vulputate', genre:'Drama', rate: 8.5},
    {id:5, title:'Большой Куш', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus dignissim tristique. Sed ac sollicitudin quam. Sed consectetur vitae tortor ac condimentum. Cras ac sodales odio. Quisque mi purus, vulputate', genre:'Drama', rate: 8.5},
  ])

  const [filter, setFilter] = useState({sort:'', query: ''})

  const currentDate = new Date()
  const [date, setDate] = useState(currentDate.getDate())
  const dayArray = Array(8).fill(0).map((a, index) => a = currentDate.getDate()+index)

  const sortedFilms = useMemo(() => {
    
    if(filter.sort) {
      return filter.sort==='title'? [...films].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
      : [...films].sort((a,b) => b[filter.sort]-a[filter.sort])
    }
    return films

  }, [filter.sort, films])


  const filteredFilms = useMemo(()=>{
    return sortedFilms.filter(film => film.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedFilms])

  
  return (
    <div className="App">
      <MyHeader filter={filter} setFilter={setFilter} options={['Расписание фильмов','Расписание кинотеатров','Будущие премьеры']} /> 
      <MyCalendar dayArray={dayArray} date={date} currentDate={currentDate} setDate={setDate}/>
      <FilmFilter filter={filter} setFilter={setFilter}/>       
      <FilmList films={filteredFilms}/>      
    </div>    
  );
}

export default App;
