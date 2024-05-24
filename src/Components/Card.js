import React,{useState,useRef,useEffect} from 'react';
import { useDispatchCart, useCart } from './ContextReducer'


export default function Card(props){
  let dispatch = useDispatchCart();
  let data=useCart()
  let options = props.options;
  let priceOptions = Object.keys(options);
 // let foodItems=props.foodItems
 const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else if(food.size !== size){
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })
        return;
      }
      return; 
      //await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })
 
    }
    await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })
    console.log(data);
    }
    useEffect(() => {
      setSize(priceRef.current.value)
    }, [])  
    let finalPrice = qty * parseInt(options[size]);

  return (
    
       <div>
        <div className="card mt-3" style={{"width":"18rem","maxHeight":"360px"}}>
           <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }}/>
           <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            <div className='container w-100'>
           <select className="m-2 h-100 rounded" style={{"backgroundColor":'#53b56e'}} onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6),(e,i)=>{
            return(
            <option key={i+1} value={i+1}>{i+1}</option>
            )
            })}
            </select>
            <select className="m-2 h-100 rounded" style={{"backgroundColor":'#53b56e'}} ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
             {priceOptions.map((i) => {
              return <option key={i} value={i}>{i}</option>
              })}
            </select>
           <div className='d-inline h-100 fs-5'>
           ₹{finalPrice}/-
           </div>
         </div>
      
  <hr>
  </hr>
  <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
</div>
</div>
</div>
  );
}
