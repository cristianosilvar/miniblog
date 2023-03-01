import style from './Header.module.css'

import { NavLink, Link } from 'react-router-dom'

export default function NavBar() {
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
                <NavLink to='/new' className={style.link}>Novo</NavLink>
                <div className={style.divider}></div>
                <NavLink to='/dashboard' className={style.link}>Dashboard</NavLink>
                <div className={style.divider}></div>
                <NavLink to='/about' className={style.link}>Sobre</NavLink>
            </nav>
            <nav className={style.nav}>
                <Link to='/login' className={style.button_login}>Login</Link>
            </nav>
        </header>
    )
}