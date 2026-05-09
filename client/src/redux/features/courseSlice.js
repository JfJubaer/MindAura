import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  categories: [],
  featuredCourses: [],
  selectedCourse: null,
  filters: {
    category: 'All',
    search: '',
    sortBy: 'latest',
  },
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setFeaturedCourses: (state, action) => {
      state.featuredCourses = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { 
  setCourses, 
  setCategories, 
  setFeaturedCourses, 
  setSelectedCourse, 
  setFilters, 
  clearFilters 
} = courseSlice.actions;

export default courseSlice.reducer;
