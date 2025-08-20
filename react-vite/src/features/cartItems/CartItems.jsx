import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCartItems, updateCartItemThunk, deleteCartItemThunk } from '../../redux/cartItems';
import { fetchProducts } from '../../redux/products';
import './CartItems.css';

export default function CartItems() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => Object.values(state.cart));
  const products = useSelector((state) => state.products.allProducts);
  const cartState = useSelector((state) => state.cart);
  console.log('Cart state:', cartState);

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!cartItems || !cartItems.length) return <p>Your cart is empty.</p>;

  const handleIncreaseQuantity = (itemId, currentQuantity) => {
    dispatch(updateCartItemThunk(itemId, currentQuantity + 1));
  };

  const handleDecreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateCartItemThunk(itemId, currentQuantity - 1));
    } else {
      dispatch(deleteCartItemThunk(itemId));
    }
  };

  const handleEmptyCart = () => {
    if (window.confirm("Are you sure you want to empty your cart?")) {
      cartItems.forEach(item => {
        dispatch(deleteCartItemThunk(item.id));
      });
    }
  };

  const calculateItemTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.product_id);
      return total + (product?.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div>
      <div className="cart-header">
        <h2>Your Cart</h2>
        {cartItems.length > 0 && (
          <button onClick={handleEmptyCart} className="empty-cart-btn">
            Empty Cart
          </button>
        )}
      </div>
      
      {cartItems.map(item => {
        const product = products.find(p => p.id === item.product_id);
        return (
          <div key={item.id} className="cart-item">
            <img 
              src={product?.image_url} 
              alt={product?.title || "Product image"}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{product?.title}</h3>
              <p className="cart-item-price">${product?.price}</p>

              <div className="cart-item-quantity-controls">
                <span className="cart-item-quantity">Quantity: {item.quantity}</span>
                <div className="quantity-buttons">
                  <button onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>-</button>
                  <button onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>+</button>
                </div>
              </div>
              <p className="cart-item-total">Total: ${calculateItemTotal(product?.price, item.quantity)}</p>
            </div>
          </div>
        );
      })}
      
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Cart Total: ${calculateCartTotal()}</h3>
        </div>
      </div>
    </div>
  );
}