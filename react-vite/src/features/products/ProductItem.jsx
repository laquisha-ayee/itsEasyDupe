import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProductThunk } from '../../redux/products';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id));
    }
  };

  return (
    <div className="product-item">
      <h3>{product.title}</h3>
      <img
        src={product.image_url}
        alt={product.title || "Product image"}

      />
      <p>{product.description}</p>
      <p>${product.price}</p>

      <div className="product-actions">
        <Link to={`/products/${product.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => handleDelete(product.id)}>Delete</button>
      </div>
    </div>
  );
}