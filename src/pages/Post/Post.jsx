import style from './Post.module.css'

import {useParams} from 'react-router-dom'

export function Post() {
    const {id} = useParams()

    return (
        <>
            <h6>id: {id}</h6>
        </>
    )
}