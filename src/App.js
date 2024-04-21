import { useState, useEffect, Fragment } from "react";
import { Route, Router, Routes} from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";
import AlbumView from "./Components/AlbumView";
import ArtistView from "./Components/ArtistView";
import Spinner from "./Spinner";
import { createResource as fetchData } from './helper';
import { useEffect, useState, Suspense } from 'react';



function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  const API_URL = 'https://itunes.apple.com/search?term='

useEffect(() => {
    if (searchTerm) {
        setData(fetchData(searchTerm))
    }
}, [searchTerm])

  
  const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
  }

  const renderGallery = () => {
    if(data){
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
}


  return (
    <div>
    {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        {message}
                        {renderGallery()}
                        <Gallery data={data} />
                    </Fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

