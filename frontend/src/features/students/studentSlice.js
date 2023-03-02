import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import studentService from './studentService'

const initialState = {
    students: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getStudents = createAsyncThunk(
    'students/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await studentService.getStudents(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

export const createStudent = createAsyncThunk(
  'students/create',
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await studentService.createStudent(studentData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, thunkAPI) => {
    try {
      if(thunkAPI.getState().auth.user){
        const token = thunkAPI.getState().auth.user.token
        return await studentService.deleteStudent(id, token)

    }
    else{
        console.log("User Gone deleteGoal")
    }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const editStudent = createAsyncThunk(
  'students/edit',
  async (id, studentData, thunkAPI) => {
    try {
      if(thunkAPI.getState().auth.user){
        const token = thunkAPI.getState().auth.user.token
        return await studentService.deleteStudent(id, studentData, token)
    }
    else{
        console.log("User Gone editgoal")
    }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(createStudent.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createStudent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.students.push(action.payload)
          })
          .addCase(createStudent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getStudents.pending, (state) => {
              state.isLoading = true
          })
          .addCase(getStudents.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.students = action.payload
          })
          .addCase(getStudents.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })
          .addCase(deleteStudent.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteStudent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.students = state.students.filter(
              (student) => student._id !== action.payload.id
            )
          })
          .addCase(editStudent.pending, (state) => {
            state.isLoading = true
          })
          .addCase(editStudent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.students.push(action.payload)
          })
          .addCase(editStudent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const {reset} = studentSlice.actions
export default studentSlice.reducer