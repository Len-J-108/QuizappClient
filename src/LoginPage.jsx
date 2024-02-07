import {  useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from './axios.js';
import GameContext from "./context/GameContext.jsx";
import toast from 'react-hot-toast';
import ButtonOne from "./elements/buttonOne.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import cl from './styles/forms.module.scss';

const LoginPage = () => {

  let navigate = useNavigate();
  const {setResult, setAllCorrect, setIsLoggedIn} = useContext(GameContext); 

  const validationSchema = yup.object().shape({
    username: yup.string().min(3, 'username must be at least 3 characters long').max(16, 'username has a max-length of 16 characters').trim().required('jojojojo'),
    pw: yup.string().min(8, 'password must be at least 8 characters long').trim().required('please enter a password')
  })
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  

  const signIn = async (data) => {
    try {
      await API.post("http://localhost:5000/users/login", data)
        .then((response) => { 
          const data = response.data;
          if (data.login) {
            toast.success(data.login + " " + data.username);
          }
        })
        reset();
        setIsLoggedIn(true); 
        setResult("current"); 
        setAllCorrect(false);
        navigate("/game");
      } catch (error) {
            reset();
            toast.error(error.response.data);
    }
  };
  
  return (
    <div className={cl.formCard}>
    <h2 className={cl.formCardHeading}>Login</h2>
    <form onSubmit={handleSubmit(signIn)} className={cl.formCardForm}>
      <label htmlFor="username" className={cl.formCardLabel}>username:</label>
      <input 
        className={cl.formCardInput}
        type="text" 
        id="username" 
        {...register("username")}/>
      <p className={cl.error}>{errors?.username?.message}</p>
      <label htmlFor="password" className={cl.formCardLabel}>password:</label>
      <input 
        className={cl.formCardInput}
        type="password" 
        id="password" 
        {...register("pw")}/>
        <p className={errors.pw ? cl.error : ''}>{errors?.pw?.message}</p>
      <ButtonOne name="sign in"/>
    </form>
    </div>
  );
};

export default LoginPage;
