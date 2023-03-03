import style from './Login.module.css'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

import iconEmail from '../assets/envelope.svg'
import iconPass from '../assets/key.svg'
import iconError from '../assets/x.svg'

export default function Login() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [error, setError] = useState('')

    const {logIn, loading, error: authError} = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setError('')
        const user = {
            email,
            pass
        }

        const res = await logIn(user)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div>
            <form onSubmit={handleSubmit} className={style.form}>
                <h3>Entre na sua conta Miniblog.</h3>
                <div className={style.field}>
                    <img src={iconEmail} alt="Icone de email" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="email"
                        name='email'
                        placeholder='Digite seu e-mail'
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required/>
                    </label>
                </div>
                {error && 
                    <span className={style.error} title='Informe a mesma senha em ambos os campos'>
                        <img src={iconError} alt="" className={style.icon_error} />
                        {error}
                    </span>
                }
                {!loading ? (
                        <button className='button_primary'>Entrar</button>
                    ) : (
                        <button className='button_primary' disabled>Entrar</button>
                    )
                }
                <Link to='/register' className='text-center'>
                    <span className='button_text'>Criar sua conta</span>
                </Link>
            </form>
        </div>
    )
}

