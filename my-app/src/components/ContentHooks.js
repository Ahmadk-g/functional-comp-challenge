import React, {useState, useEffect} from 'react'
import css from './css/Content.module.css';
import {savedPosts} from "../posts.json";
import PostItem from './PostItem';
import Loader from './Loader';


function ContentHooks() {

  const [isLoaded, setIsLoaded] = useState (false);
  const [fetchedPosts, setFetchedPosts] = useState ([]);

  useEffect(() => {
      setTimeout(() => {
        setIsLoaded(true);
        setFetchedPosts(savedPosts);
      }, 2000);
  }, []);

  const handleSearch = (e) => {
    const name = e.target.value.toLowerCase()
    const filteredPosts = savedPosts.filter(post => {
      return post.name.toLowerCase().includes(name)
    })

    setFetchedPosts(filteredPosts)
  }

  return (
    <div>
      <div className={css.TitleBar}>
          <h1>My Photos</h1>
          <form>
            <label htmlFor='searchInput'>Search: </label>
            <input
              id='searchInput'
              name='searchInput'
              placeholder='By Author'
              type='search' 
              onChange={(e) => {handleSearch(e)}}
            />
            <h4>posts found: {fetchedPosts.length}</h4>
          </form>
      </div>

     
      <div className={css.SearchResults}>
            {/* <PostItem savedPosts={savedPosts} /> */}
            {
              isLoaded ? <PostItem savedPosts={fetchedPosts} />
              : <Loader />
            }
        
      </div>


    </div>
  )
}

export default ContentHooks