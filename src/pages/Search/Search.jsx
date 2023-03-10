import style from './Search.module.css'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { Link } from 'react-router-dom'

import {PostDetails} from '../../components/PostDetails'

import notSearch from '../assets/search_image.svg'

export function Search() {
    const query = useQuery()
    const search = query.get('q')

    const {documents: posts} = useFetchDocuments('posts', search)

    return (
        <div className={style.search}>
            {posts && posts.length === 0 &&
                <div className={style.no_posts}>
                <img src={notSearch} alt="" />
                <h3 className='text-center'>Não há resultados para sua busca</h3>
                <Link to='/'>
                    <button className='button_secondary'>Voltar</button>
                </Link>
            </div>
            }
            {posts && 
                posts.map((post) => (
                    <PostDetails 
                    key={post.id}
                    post={post}></PostDetails>
                ))
            }
        </div>
    )
}