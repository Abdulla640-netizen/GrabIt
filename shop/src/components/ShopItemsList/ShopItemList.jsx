import Shopltem from '../Shopltem/Shopltem'
import './ShopItemList.css'
 function ShopItemsList (props){
   console.log(props.products)
   return <div className='products'>
      {props.products.map(product=><Shopltem product={product} key={product.id}> </Shopltem>)}
      </div>

 }


export default ShopItemsList