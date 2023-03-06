import style from './CreatePost.module.css'

import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useInsertDocument} from '../../hooks/useInsertDocument'
import {useAuthValue} from '../../context/AuthContext'

import iconError from '../assets/x.svg'

export function CreatePost() {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')

    const navigate = useNavigate()

    const {user} = useAuthValue()

    const {insertDocument, response} = useInsertDocument('posts')

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')

        try {
            new URL(image)
        } catch (error) {
            setFormError('A imagem precisa ser uma URL')
        }

        const tagArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

        if (!title || !image || !body || !tagArray) {
            setFormError('Por favor, preencha todos os campos')
        }

        if (formError) return

        insertDocument({
            title,
            image, 
            body, 
            tagArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        navigate('/')
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
                    autoComplete='off'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label className={style.label}>
                    <span>URL de Imagem</span>
                    <input 
                    type="text"
                    name='image'
                    required
                    autoComplete='off'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}  />
                </label>
                <label className={style.label}>
                    <span>Conteúdo</span>
                    <textarea 
                    type="text" 
                    name='body'
                    required
                    autoComplete='off'
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
                    autoComplete='off'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}  />
                </label>
                {!response.loading ? (
                    <button className='button_primary'>Postar</button>
                ) : (
                    <button className='button_primary' disabled>Postar</button>
                )}
                {response.error &&
                    <span className={style.error}>
                        <img src={iconError} alt="" className={style.icon_error} />
                        {response.error}
                    </span>
                }
                {formError &&
                    <span className={style.error}>
                        <img src={iconError} alt="" className={style.icon_error} />
                        {formError}
                    </span>
                }
            </form>
        </div>
    )
}