import React, { Component } from 'react'
import css from './css/Content.module.css';
import PostItem from './PostItem';
import Loader from './Loader';
import axios from 'axios';
import API_KEY from '../secrets';

export class Content extends Component {
    constructor(props) {
      super(props)

      this.state = {
        isLoaded: false,
        posts: [],
        savedPosts: []
      }
    }


    componentDidMount() {
      this.fetchImages();
    }

    async fetchImages() {
      const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100`);
      const fetchedPosts = response.data.hits;
      console.log(response.data)
      this.setState({
        isLoaded: true,
        posts: fetchedPosts,
        savedPosts: fetchedPosts
      })
    }

    handleSearch = (event) => {
      const name = event.target.value.toLowerCase()
      console.log(name)
      const filteredPosts = this.state.savedPosts.filter(post => {
        return post.user.toLowerCase().includes(name)
      })

      this.setState({
        posts: filteredPosts
      })
    }


  render() {
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
                onChange={this.handleSearch}
              />
              <h4>posts found: {this.state.posts.length}</h4>
            </form>
        </div>

       
        <div className={css.SearchResults}>
              {/* <PostItem savedPosts={savedPosts} /> */}
              {
                this.state.isLoaded ? <PostItem savedPosts={this.state.posts} />
                : <Loader />
              }
          
        </div>


      </div>
    )
  }
}

export default Content