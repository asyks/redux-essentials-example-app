import React from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { selectAllNotifications, allNotificationsRead } from './notificationsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const NotificationsList = () => {
  const dispatch = useDispatch()

  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  React.useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || { 
      name: 'Unknown User'
    }

    const notificationClasname = classnames('notification', {
      new: notification.isNew
    })

    return (
      <div key={notification.id} className={notificationClasname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
