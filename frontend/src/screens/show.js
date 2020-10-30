import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getImage} from '../actions/formAction';
function Show(props){
    const ProductImage = useSelector(state=> state.formGetImage); 
    console.log(ProductImage)
    const {loading,image} = ProductImage;
    const dispatch = useDispatch();
    console.log(props)
    useEffect(()=>{
        dispatch(getImage())
    })
   

console.log(image)
if(!image){
   var z = <div>loading....</div>
}else{
    
    if(!image.length){
        z = <div>not Image</div>
  
    }else{
        z =    <div style={{display:"flex"}}>
        {
       image.map((pro,index)=>{
            return <div key={index} >
                <td><img src={pro.image} height="100px" width="100px" /></td>
            </div>
        })
    }
        </div>
    }
}

    return <>
    <div>
        {
           z
            
           
        } 
        

    </div>
    </>
}
export default Show;