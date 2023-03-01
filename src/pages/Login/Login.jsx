import style from './Login.module.css'

import { Link } from 'react-router-dom'

import iconEmail from '../assets/envelope.svg'
import iconPass from '../assets/key.svg'

export default function Login() {
    return (
        <div>
            <form className={style.form}>
                <h3>Entre na sua conta Miniblog.</h3>
                <div className={style.field}>
                    <img src={iconEmail} alt="Icone de email" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="email"
                        name='email'
                        placeholder='Digite seu e-mail'
                        autoComplete='off'
                        required/>
                    </label>
                </div>
                <div className={style.field}>
                    <img src={iconPass} alt="Icone de senha" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="password"
                        name='password'
                        placeholder='Digite sua senha'
                        required/>
                    </label>
                </div>
                <button className='button_primary'>Entrar</button>
                <Link to='/register' className='text-center'>
                    <span className='button_text'>Criar sua conta</span>
                </Link>
            </form>
        </div>
    )
}

