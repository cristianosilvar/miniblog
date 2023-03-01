import style from './Register.module.css'

import { Link } from 'react-router-dom'

import {useState, useEffect} from 'react'

//
import iconPerson from '../assets/person.svg'
import iconEmail from '../assets/envelope.svg'
import iconPass from '../assets/key.svg'

export default function Register() {
    return (
        <div>
            <form className={style.form}>
                <h3>Cria sua conta Miniblog.</h3>
                <div className={style.field}>
                    <img src={iconPerson} alt="Icone de usuário" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="text"
                        name='name'
                        placeholder='Digite seu usuário'
                        required
                        autoComplete='off'/>
                    </label>
                </div>
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
                <div className={style.field}>
                    <img src={iconPass} alt="Icone de senha" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="password"
                        name='confirmPassword'
                        placeholder='Confirme a senha'
                        required/>
                    </label>
                </div>
                <button className='button_primary'>Criar conta</button>
                <Link to='/login' className='text-center'>
                    <span className='button_text'>Entrar na sua conta</span>
                </Link>
            </form>
        </div>
    )
}