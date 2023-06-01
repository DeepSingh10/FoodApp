import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {

  let data = useCart()

  // let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options); 
 let dispatch = useDispatchCart();

  // const handleClick = () => {
  //   if (!localStorage.getItem("authToken")) {
  //     navigate("/login")
  //   }
  // }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img})
        //console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,  })
   // console.log(data)
  }
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }} >
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "140px", objecfit: "fill" }}></img>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <p className="card-text">{props.foodDesc}</p> */}
            <div className="container w-100">
              <select className='m-2 h-100 w-20 bg-success rounded' style={{ select: "#FF0000" }}  onChange={(e)=> setQty(e.target.value) }>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>
              <select className='m-2 h-100 w-20 bg-success rounded' style={{select: "#FF0000" }} ref={priceRef} onChange={(e)=> setSize(e.target.value) }>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline ms-2 w-20 h-100 fs-5"> ₹{finalPrice}/-</div>
            </div>
          </div>
          <hr>
          </hr>
          <button className={`btn btn-danger mx-5 justify-center mb-2`} onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
