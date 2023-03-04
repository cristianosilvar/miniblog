import style from './CreatePost.module.css'

import {useNavegation} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useState } from 'react'

import iconError from '../assets/x.svg'

export function CreatePost() {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h2>Novo post</h2>
            <form onSubmit={handleSubmit}>
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
                {formError &&
                    <span className={style.error} title='Informe a mesma senha em ambos os campos'>
                        <img src={iconError} alt="" className={style.icon_error} />
                        {formError}
                    </span>
                }
            </form>
        </div>
    )
}