import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { PRODUCT_DATA } from "../../utils/Constant";
import { filterReducer } from "../reducer/filter/FilterReducer";

const FilterContext = createContext({ state: {}, dispatch: () => {} });

const FilterProvider = ({ children }) => {
  const { state, dispatch } = filterReducer();
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    try {
      const { status, data } = await axios.get("/api/products");
      if (status === 200) {
        setProducts(data.products);
        dispatch({ type: PRODUCT_DATA, payload: data.products });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <FilterContext.Provider
      value={{ filterState: state, filterDispatch: dispatch, products }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
