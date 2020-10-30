import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_SHOP_REQUEST,
  PRODUCT_SHOP_SUCCESS,
  PRODUCT_SHOP_FAIL,
} from "../constants/productConstants";
import axios from "axios";
import Axios from "axios";

// const searchBrand = (value) => {
//   return {
//     type: "SEARCH_BRAND",
//     payload: value,
//   };
// };
const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = ""
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      "/api/products?category=" +
        category +
        "&searchKeyword=" +
        searchKeyword +
        "&sortOrder=" +
        sortOrder
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// shop product shows 
const shopProducts = () => async (dispatch, getState) => {
  console.log("Hi")
  try {
    // dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/products/shop", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: PRODUCT_SHOP_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_SHOP_FAIL, payload: error.message });
  }
}




const updateProduct = (product) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    var id = product.id
    console.log(product)
const { data } = await Axios.put(
  "/api/products/" + id,
  product,
  {
    headers: {
      Authorization: "Bearer " + userInfo.token,
    },
  }
);
dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      // dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
   catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};
const saveProduct = (product) => async (dispatch, getState) => {
  // console.log(product)
  const bodyFormData = new FormData();
  var image = product.image,
   brand = product.brand,
   category = product.category,
   stock = product.countInStock,
   description = product.description,
   name = product.name,
   price = product.price;
   console.log({image,brand,stock,description,name,price})
    bodyFormData.append('image', image);
    bodyFormData.append('name',name);
    bodyFormData.append('price',price);
    bodyFormData.append('brand',brand);
    bodyFormData.append('category',category);
    bodyFormData.append('description',description);
    // bodyFormData.append('countInStock',stock);
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    console.log(!product._id)
    if (!product._id) {
      const { data } = await Axios.post("/api/products", bodyFormData, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete("/api/products/" + productId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listProducts,
  shopProducts,
  detailsProduct,
  saveProduct,
  deleteProdcut,
  saveProductReview,
  updateProduct
};
