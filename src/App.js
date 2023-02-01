import React, {useState} from 'react';
import useBookSearch from './useBookSearch';
import './App.css'; 

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
  }
  
  useBookSearch(query, pageNumber)
  return (
    <>
      <input type="text" onChange={handleSearch}/>
      <div>Title</div>  
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Loading...</div>
      <div>Error</div>
    </>
  );
}
