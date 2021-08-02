import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from '../features/notifications/notificationsSlice'
import postsSlice from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
    notifications: notificationsSlice
  }
})
