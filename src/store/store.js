import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import verticalReducer from "../features/vertical/verticalSlice";
import searchReducer from "../features/search/searchSlice";
import userReducer from "../features/users/userSlice";
import userTableReducer from "../features/users/userTableSlice";
import getUserReducer from "../features/users/getUserSlice";
import verticalSearchReducer from "../features/search/verticalSearchSlice";
import modifyVerticalReducer from "../features/vertical/modifyVerticalSlice";
import departmentTableReducer from "../features/vertical/departmentTableSlice";
import courseTableReducer from "../features/vertical/courseTableSlice";
import subjectTableReducer from "../features/vertical/subjectTableSlice";
import getDepartmentReducer from "../features/vertical/getDepartmentSlice";
import getCourseReducer from "../features/vertical/getCourseSlice";
import getSubjectReducer from "../features/vertical/getSubjectSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    vertical: verticalReducer,
    search: searchReducer,
    users: userReducer,
    userTable: userTableReducer,
    getUser: getUserReducer,
    verticalSearch: verticalSearchReducer,
    modifyVertical: modifyVerticalReducer,
    departmentTable: departmentTableReducer,
    courseTable: courseTableReducer,
    subjectTable: subjectTableReducer,
    getDepartment: getDepartmentReducer,
    getCourse: getCourseReducer,
    getSubject: getSubjectReducer,
  },
});

export default store;
