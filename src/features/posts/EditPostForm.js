import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'


export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(state =>
    state.posts.find(post => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChange = e => setTitle(e.target.value)
  const onContentChange = e => setContent(e.target.value)

  const onSavePostClick = () => {
    if (title && content) {
      dispatch(postUpdated({id: postId, title, content}))
      history.push(`/posts/${postId}`)
    }
  }
  
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitlie">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePostClick}>Save Post</button>
      </form>
    </section>
  )
}
