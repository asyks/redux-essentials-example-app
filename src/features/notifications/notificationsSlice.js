import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { client } from '../../api/client'

const fetchNotifications = createAsyncThunk(
'notifications/fetchNotifications',
  async (_, {getState}) => {
    const allNotifications = await selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.notifications
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(action.payload)
      state.sort((a, b) => b.date.localCompare(a.date))
    }
  }
})

export default notificationsSlice.reducer

const selectAllNotifications = state => state.notifications
