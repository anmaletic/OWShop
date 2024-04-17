import { Product } from "../interfaces/product";
import placeholderImage from "../assets/placeholderImage.svg";

interface Props {
  product: Product | null;
  key: number;
  onClick: (item: Product) => void;
}

const ProductCard = ({ product, key, onClick }: Props) => {
  return (
    <>
      {product ? (
        <div className="card h-100 fade-in" key={key}>
          <img
            className="card-img-top"
            alt="Product Image"
            src={product.image}
          />
          <div className="card-body border-top bg-light">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Price: {product.price} €</p>
          </div>
          <div className="card-footer text-end">
            <button
              className="btn btn-secondary"
              onClick={() => onClick(product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        <div className="card h-100 fade-in" key={key}>
          <img
            className="card-img-top"
            alt="Product Image"
            src={placeholderImage}
          />
          <div className="card-body border-top bg-light">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-8"></span>
            </p>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-8"></span>
            </p>
          </div>
          <div className="card-footer text-end">
            <button className="btn btn-secondary disabled placeholder col 6">
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
