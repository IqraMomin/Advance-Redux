import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const products = [
    {title:'Test',price:6,description:'This is a first product - amazing!'},
    {title:'Test1',price:12,description:'This is a Second product - amazing!'},
    {title:'Test2',price:20,description:'This is a Third product - amazing!'},
    {title:'Test3',price:50,description:'This is a Forth product - amazing!'},
    
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(ele=>{
          return <ProductItem
          title={ele.title}
          price={ele.price}
          description={ele.description}
          />
        })}
        
      </ul>
    </section>
  );
};

export default Products;
