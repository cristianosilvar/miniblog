import style from './Register.module.css'

import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useAuthentication} from '../../hooks/useAuthentication'

//
import iconPerson from '../assets/person.svg'
import iconEmail from '../assets/envelope.svg'
import iconPass from '../assets/key.svg'
import iconError from '../assets/x.svg'

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')

    const {createUser, error: authError, loading} = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setError('')
        const user = {
            name,
            email,
            pass
        }

        if (pass !== confirmPass) {
            setError('As senhas não coincidem')
            return
        }

        const res = await createUser(user)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div>
            <form onSubmit={handleSubmit} className={style.form}>
                <h3>Cria sua conta Miniblog.</h3>
                <div className={style.field}>
                    <img src={iconPerson} alt="Icone de usuário" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="text"
                        name='name'
                        placeholder='Digite seu usuário'
                        required
                        autoComplete='off'
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
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
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div className={style.field}>
                    <img src={iconPass} alt="Icone de senha" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="password"
                        name='password'
                        placeholder='Digite sua senha'
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}/>
                    </label>
                </div>
                <div className={style.field}>
                    <img src={iconPass} alt="Icone de senha" className={style.icon}/>
                    <label className={style.label}>
                        <input 
                        type="password"
                        name='confirmPassword'
                        placeholder='Confirme a senha'
                        required
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}/>
                    </label>
                </div>
                {error && 
                    <span className={style.error} title='Informe a mesma senha em ambos os campos'>
                        <img src={iconError} alt="" className={style.icon_error} />
                        {error}
                    </span>
                }
                {loading &&
                    <button className='button_primary' title='Por favor, aguarde o carregamento' disabled>Criar conta</button>
                }
                {!loading &&
                    <button className='button_primary'>Criar conta</button>
                }
                <Link to='/login' className='text-center'>
                    <span className='button_text'>Entrar na sua conta</span>
                </Link>
            </form>
        </div>
    )
}