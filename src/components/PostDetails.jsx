import style from './PostDetails.module.css'

import { Link } from 'react-router-dom'

import iconUser from '../pages/assets/person.svg'

export function PostDetails({post}) {
    return (
        <div className={style.post}>
            <div className={style.image}>
                <div className={style.user}>
                    <img src={iconUser} alt="" className={style.icon_user}/>
                    {post.createdBy}
                </div>
                <img src={post.image} alt={post.title} className={style.imagePost}/>
            </div>
            <div className={style.bottom}>
                <div className={style.details}>
                    <span className={style.title}>{post.title}</span>
                    <span className={style.body}>{post.body}</span>
                    <div className={style.tags}>     
                        {post.tagArray.map((tag) => (
                            <span key={tag}># {tag}</span>
                        ))}
                    </div>
                </div>
                 <div className={style.more_details}>
                    <Link to={`posts/${post.id}`}>
                        <button className='button_secondary'>Ver mais</button>
                    </Link>
                 </div>
                </div>
        </div>
    )
}