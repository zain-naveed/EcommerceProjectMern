import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {formSign} from '../actions/formAction';
function Form(props){

var [email,setEmail] = useState('');
var [password,setPassowrd] = useState('');
const dispatch = useDispatch();
const fordata = useSelector(state=>state.form)
const {userInfo}  = fordata;
const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
console.log(redirect);
console.log(userInfo)
useEffect(()=>{
if(userInfo){
    props.history.push(redirect)
}
 return ()=>{

}
},[userInfo])

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(formSign(email,password));
    }
    return <>
     <form onSubmit={handleSubmit}>
         <input type="email" placeholder="Enter Email" required onChange={e=> setEmail(e.target.value)}  />
         <input type="password" placeholder="Enter password" onChange={(e)=> setPassowrd(e.target.value)} />
         <button type="submit">submit</button>
     </form>
    </>
}
export default Form;