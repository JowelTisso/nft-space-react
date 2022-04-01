import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { PRODUCT_DATA } from "../../utils/Constant";
import { reducer } from "../reducer/filter/filterReducerHelper";

const FilterContext = createContext({ state: {}, dispatch: () => {} });

const FilterProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const defaultData = {
    productData: [],
    settings: {
      sort: "",
      filter: {
        includeOutOfStock: false,
        fastDeliveryOnly: false,
      },
      priceRange: 4000,
      rating: "",
      category: {
        Art: false,
        Collectibles: false,
        Wearable: false,
        Equipment: false,
        Entities: false,
      },
    },
  };

  const [state, dispatch] = useReducer(reducer, defaultData);

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
