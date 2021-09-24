import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const usersAdapter = createEntityAdapter()

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get('/fakeApi/users')
  return response.users
})

const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      usersAdapter.setAll(state, action.payload)
    }
  }
})

export default usersSlice.reducer

export const selectAllUsers = state => state.users

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(state => state.users)
