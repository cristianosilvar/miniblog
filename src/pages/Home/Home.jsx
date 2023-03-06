import style from './About.module.css'

import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react'

import { useAuthValue } from '../../context/AuthContext'

//
import imageNoPosts from '../assets/update.svg'


export default function Home() {

    const [query, setQuery] = useState('')
    const [posts, setPosts] = useState([])

    const {user} = useAuthValue()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className={style.home}>
            <form onSubmit={handleSubmit} className={style.search_form}>
                <input 
                type="text"
                placeholder='Pesquise por tags'
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
                <button className='button_primary'>Pesquisar</button>
            </form>
            {posts && posts.length === 0 &&
                <div className={style.no_posts}>
                    <img src={imageNoPosts} alt="" />
                    {user &&
                        <>
                            <h3 className='text-center'>Não há postagens ainda</h3>
                            <Link to='/posts/create'>
                                <button className='button_secondary'>Crie uma postagem</button>
                            </Link>
                        </>
                    }
                    {!user &&
                        <>
                            <h3 className='text-center'>
                                Não há postagens ainda, <br></br> 
                                faça login ou crie uma conta para postar
                            </h3>
                            <Link to='/login'>
                                <button className='button_secondary'>Comece já</button>
                            </Link>
                        </>
                    }
                </div>
            }
        </div>
    )
}