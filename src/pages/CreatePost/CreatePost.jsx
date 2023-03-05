import style from './CreatePost.module.css'

import { useState } from 'react'
import {useNavegation} from 'react-router-dom'
import {useInsertDocument} from '../../hooks/useInsertDocument'
import {useAuthValue} from '../../context/AuthContext'

import iconError from '../assets/x.svg'

export function CreatePost() {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')

    const {user} = useAuthValue()

    const [insertDocument, response] = useInsertDocument('posts')

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')

        insertDocument({
            title,
            image, 
            body, 
            tags,
            uid: user.uid,
            createdBy: user.displayName
        })

    }

    return (
        <div>
            <h1 className='text-center'>Novo post</h1>
            <form onSubmit={handleSubmit} className={style.form}>
                <label className={style.label} >
                    <span>Título</span>
                    <input 
                    type="text"
                    name='title'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label className={style.label}>
                    <span>URL de Imagem</span>
                    <input 
                    type="text"
                    name='image'
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}  />
                </label>
                <label className={style.label}>
                    <span>Conteúdo</span>
                    <textarea 
                    type="text" 
                    name='body'
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}>

                    </textarea>
                </label>
                <label className={style.label}>
                    <span>Tags</span>
                    <input 
                    type="text" 
                    name='tags'
                    required
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}  />
                </label>
                {!response.loading ? (
                    <button className='button_primary'>Postar</button>
                ) : (
                    <button className='button_primary' disabled>Postar</button>
                )}
                {response.error &&
                    <span className={style.error} title='Informe a mesma senha em ambos os campos'>
                        <img src={iconError} alt="" className={style.icon_error} />
                        {response.error}
                    </span>
                }
            </form>
        </div>
    )
}