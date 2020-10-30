import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [brand, setBrand] = useState("Yamha");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortBrand = (e) => {
    console.log(e)
    // setSortOrder(e.target.value);
    var category = e;
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
console.log(brand)
  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      <div className="container-fuild px-5">
        <div className="row">
          <div className="col-md-2">
            <h1 className="text-success">Brand Categories</h1>
            <hr />
            <ul className="categories">
              <li>
                <button
                  className="btn btn-outline-none text-info my-3"
                  type="button"
                  name="Honda"
                  value="Honda"
                
                >
                  <h3>Honda</h3>
                </button>
              </li>

              <li>
                <button
                  className="btn btn-outline-none text-info my-3"
                  type="button"
                  name="Suzuki"
                  value="Suzuki"
                >
                  <h3>Suzuki</h3>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-outline-none text-info my-3 "
                  type="button"
                  name="Yamaha"
                  value="Yamaha"
                >
                  <h3>Yamaha</h3>
                </button>
              </li>
            </ul>
          </div>
          <div className="col-md-10">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <ul className="products">
                {products.map((product) => (
                  <li key={product._id}>
                    <div className="product">
                      <Link to={"/product/" + product._id}>
                        <img
                          className="product-image"
                          src={product.image}
                          alt="product"
                        />
                      </Link>
                      <div className="product-name">
                        <Link to={"/product/" + product._id}>
                          {product.name}
                        </Link>
                      </div>
                      <div className="product-brand">{product.brand}</div>
                      <div className="product-price">{product.price}</div>
                      <div className="product-rating">
                        <Rating
                          value={product.rating}
                          text={product.numReviews + " reviews"}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeScreen;
