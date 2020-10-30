import { FORM_DATA_FAILED,FORM_DATA_REQUIEST,FORM_DATA_SUCCESS,FORM_DATA_IMAGE, FORM_DATA_IMAGE_SUCCESS } from "../constants/form";

function FormSigninReducer(state = {}, action) {
  switch (action.type) {
    case FORM_DATA_REQUIEST:
      return { loading: true };
    case FORM_DATA_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case FORM_DATA_FAILED:
      return { loading: false, error: action.payload };
    // case USER_LOGOUT:
    //   return {};
    default: return state;
  }
}
function FormGetImageReducer(state = {}, action) {
  switch (action.type) {
    case FORM_DATA_REQUIEST:
      return { loading: true };
    case FORM_DATA_FAILED:
      return { loading: false, error: action.payload };
    case FORM_DATA_IMAGE_SUCCESS:
      console.log([...action.payload]  )
      return { loading: false, image: [...action.payload] };
    // case USER_LOGOUT:
    //   return {};
    default: return state;
  }
}
function FormImageReducer(state = {}, action) {
  switch (action.type) {
    case FORM_DATA_REQUIEST:
      return { loading: true };
    case FORM_DATA_FAILED:
      return { loading: false, error: action.payload };
    case FORM_DATA_IMAGE:
      console.log([action.payload])
      return { loading: false, data: [...action.payload] };
    // case USER_LOGOUT:
    //   return {};
    default: return state;
  }
}
export {
    FormSigninReducer,FormImageReducer,FormGetImageReducer
}