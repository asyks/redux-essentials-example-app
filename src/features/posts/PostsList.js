import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { fetchPosts, selectAllPosts, selectError, selectStatus } from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(selectStatus)
  const error = useSelector(selectError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
      console.log("fetch")
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date}/>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <ReactionButtons post={post}/>
      </article>
    ))
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
