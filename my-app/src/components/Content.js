import React, { Component } from 'react'
import css from './css/Content.module.css';
import {savedPosts} from "../posts.json";
import PostItem from './PostItem';
import Loader from './Loader';

export class Content extends Component {
    constructor(props) {
      super(props)

      this.state = {
        isLoaded: false,
        posts: [],
      }
    }


    componentDidMount() {
      setTimeout(()=>{
        this.setState({
          isLoaded: true,
          posts: savedPosts
        })
    }, 2000)
    }

    handleSearch = (event) => {
      const name = event.target.value.toLowerCase()
      console.log(name)
      const filteredPosts = savedPosts.filter(post => {
        return post.name.toLowerCase().includes(name)
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
            <label htmlFor='searchInput'>Search: </label>
            <input
              id='searchInput'
              name='searchInput'
              placeholder='By Author'
              type='search' 
              onChange={this.handleSearch}
            />
            <h4>posts found: {this.state.posts.length}</h4>
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