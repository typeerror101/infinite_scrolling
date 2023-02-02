import React, {useState, useRef, useCallback} from 'react';
import useBookSearch from './useBookSearch';
import './App.css'; 

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return 
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    }) 
    if (node) observer.current.observe(node)
  }, [loading, hasMore]) 

  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
  }

  function animation(){
    if(loading){
      return(
      <div class="loadingio-spinner-pulse-hhp2ti51u89">
          <div class="ldio-5a220u1vixl">
      <div></div><div></div><div></div>
      </div></div>
      )
    } else return
  }
   
  return (
    <>
    <h1>Open Library Infinite Scroll Search</h1>
      <input className='search' type="text" value={query} onChange={handleSearch} placeholder="Search Book Name"/>
      <div className='results'>
      {books.map((book, index) => {
          if(books.length === index + 1){
            return <div ref={lastBookElementRef} key={book}>{book}</div>
          } else {
            return <div key={book}>{book}</div>
          }
      })}
      </div>
      <div className='loading'>{loading && animation()}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}
