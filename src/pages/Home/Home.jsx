import style from './Home.module.css'

import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react'
import {useFetchDocuments} from '../../hooks/useFetchDocuments'

import { useAuthValue } from '../../context/AuthContext'

//
import imageNoPosts from '../assets/update.svg'
import { PostDetails } from '../../components/PostDetails'


export default function Home() {

    const [query, setQuery] = useState('')
    const {documents: posts, loading} = useFetchDocuments('posts')
    const navigate = useNavigate()

    const {user} = useAuthValue()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(query) {
            return navigate(`/search?q=${query}` )
        }
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

            {loading &&
                <p>Carregando...</p>
            }
            {posts && 
                posts.map((post) => (
                    <PostDetails 
                    key={post.id}
                    post={post}></PostDetails>
                ))
            }

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