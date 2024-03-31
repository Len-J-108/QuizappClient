import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonOne from "./elements/buttonOne.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import cl from './styles/forms.module.scss';
import toast from 'react-hot-toast';
import {URL} from './utils/url.js';

const RegisterPage = () => {

  let navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().min(3, 'username must be at least 3 characters long').max(16, 'username has a max-length of 16 characters').trim().required('jojojojo'),
    email: yup.string().trim().email("please enter a valid email").matches(/@[^.]*\./, "please enter a valid email").required("please enter yout email"),
    pw: yup.string().min(8, 'password must be at least 8 characters long').trim().required('please enter a password'),
  })

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(validationSchema),
  })

  const registerUser = async (data) => {
    try {
      await axios.post(URL, data);
      toast.success("Erfolgreich registriert!");
      navigate("/login");
    } catch (err) {
      console.error(err.message);
      toast.warning(err.message);
    }
  };

  return (
    <div className={cl.formCard}>
    <h2 className={cl.formCardHeading}>Register</h2>
    <form onSubmit={handleSubmit(registerUser)} className={cl.formCardForm}>
      <label htmlFor="username" className={cl.formCardLabel}>username:</label>
      <input 
        className={cl.formCardInput}
        type="text" 
        id="username" 
        {...register("username")}/>
      <p className={cl.error}>{errors?.username?.message}</p>
      <label htmlFor="email" className={cl.formCardLabel}>email:</label>
      <input 
        className={cl.formCardInput}
        type="text" 
        id="email" 
        {...register("email")}/>
      <p className={cl.error}>{errors?.email?.message}</p>
      <label htmlFor="password" className={cl.formCardLabel}>password:</label>
      <input 
        className={cl.formCardInput}
        type="password" 
        id="password" 
        {...register("pw")}/>
        <p className={errors.pw ? cl.error : ''}>{errors?.pw?.message}</p>
      <ButtonOne name="register"/>
    </form>
    </div>
  );
};

export default RegisterPage;
