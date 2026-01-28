import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice, loading, error } = useSelector(
    (state) => state.cart
  );

  const add = (product) => {
    dispatch(addToCart(product));
  };

  const remove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const update = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity }));
    } else {
      remove(productId);
    }
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return {
    items,
    totalQuantity,
    totalPrice,
    loading,
    error,
    add,
    remove,
    update,
    clear,
  };
};

export default useCart;
