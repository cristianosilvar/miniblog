import style from './Header.module.css'

import { NavLink, Link } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContext'

export default function NavBar() {
    const {user} = useAuthValue()
    const {logOut} = useAuthentication()

    return (
        <header className={style.header}>
            <Link to='/'>    
                <h1 className={style.logo}>
                    Mini<span>Blog</span>
                </h1>
            </Link>
            <nav className={style.nav}>
                <NavLink to='/' className={style.link}>Home</NavLink>
                <div className={style.divider}></div>
                {user &&
                <>                        
                    <NavLink to='/posts/create' className={style.link}>Novo</NavLink>
                    <div className={style.divider}></div>
                    <NavLink to='/dashboard' className={style.link}>Dashboard</NavLink>
                    <div className={style.divider}></div>
                </>
                }
                <NavLink to='/about' className={style.link}>Sobre</NavLink>
            </nav>
            <nav className={style.nav}>
            {!user ? (
                <Link to='/login'>
                    <button className='button_primary'>Login</button> 
                </Link> ) : (
                    <span  className='button_text' onClick={logOut}>Logado</span>
                )
            }
            </nav>
        </header>
    )
}