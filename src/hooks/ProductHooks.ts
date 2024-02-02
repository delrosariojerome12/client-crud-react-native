import {useAppDispatch} from "../store/store";
import {getAllProducts} from "../store/actions/productActions";

export const useProduct = () => {
  const dispatch = useAppDispatch();
  const initProduct = () => {
    dispatch(getAllProducts());
  };

  return {initProduct};
};
