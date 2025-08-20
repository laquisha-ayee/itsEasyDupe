import { useSelector } from 'react-redux';

export default function CartItems() {
  const cartItems = useSelector((state) => state.cart.items);

  if (!cartItems.length) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          {item.name} – ${item.price} × {item.quantity}
        </div>
      ))}
    </div>
  );
}