import {FORM_DATA_SUCCESS,FORM_DATA_FAILED,FORM_DATA_REQUIEST,FORM_DATA_IMAGE,FORM_DATA_IMAGE_SUCCESS} from '../constants/form';
import Axios from 'axios';
import Cookie from 'js-cookie';
const formSign = (email, password) => async (dispatch) => {

    try {
      const { data } = await Axios.post("/api/users/signin", { email, password });
      // console.log(data);
      Cookie.set('userInfo', JSON.stringify(data));
      dispatch({type:FORM_DATA_SUCCESS,payload:data})
    } catch (error) {
      dispatch({ type: FORM_DATA_FAILED, payload: error.message });
    }
  }
  const ImageUpload = (image) => async (dispatch) => {
    // console.log(image)
    const newForm = new FormData();
    newForm.append('image',image);
    try {
        const { data } = await Axios.post("api/products/zain", newForm);
      // Cookie.set('userInfo', JSON.stringify(data));
      dispatch({type:FORM_DATA_IMAGE_SUCCESS,payload:data.data})
    } catch (error) {
      dispatch({ type: FORM_DATA_FAILED, payload: error.message });
    }
  }
  const getImage = () => async (dispatch) => {
    try {
        const { data } = await Axios.get("api/products");
      console.log(data);
      Cookie.set('userInfo', JSON.stringify(data));
      dispatch({type:FORM_DATA_IMAGE_SUCCESS, payload:data})
    } catch (error) {
      dispatch({ type: FORM_DATA_FAILED, payload: error.message });
    }
  }

export {formSign,ImageUpload,getImage}