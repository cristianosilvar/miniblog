import style from './Search.module.css'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

export function Search() {
    const query = useQuery()
    const search = query.get('q')


    return (
        <div>
            {search}
        </div>
    )
}