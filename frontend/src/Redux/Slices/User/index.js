import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    name: "Dhrumti panchal",
    email: "dhrumitpanchal@gmail.com",
    about: "sleeping",
    createdAt: "24-7-2004",
    profilePic: "",
  },
  reducers: {
    setUser: (state, action) => (state.user = action.payload),
    updateUser: (state, action) => {
      console.log(state, action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = UserSlice.actions;
export default UserSlice.reducer;
