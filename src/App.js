import React, {useState, useRef, useCallback} from 'react';
import useBookSearch from './useBookSearch';
import './App.css'; 

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    console.log(node)
  })
  
  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
  }
   
  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)

  return (
    <>
      <input type="text" value={query} onChange={handleSearch}/>
      {books.map(book => {
          return <div key={book}>{book}</div>
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}
