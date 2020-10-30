import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {ImageUpload, getImage} from '../actions/formAction';
import Show from './show';
function Image(){
    const [image,setImage] = useState(null);
   
    
   
    
    
const dispatch = useDispatch();

    
    
const heandleImage = (e)=>{

    var image = e.target.files[0];
    setImage(image)
}
const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(ImageUpload(image))
}

    return <>
    <h1>Image is uploaded!!!</h1>
    <form onSubmit={handleSubmit}>
        <input type="file" onChange={heandleImage } />
        <input type="submit" />
    </form>
    <div>
    <Show />
        

    </div>
    </>
}
export default Image;