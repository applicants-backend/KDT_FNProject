import axios from "axios"
import { WorkState,URLstate } from "../../Store/Store"
import { useState } from "react"

export default function WorkSearch () {
    const {URL} = URLstate(state=>state)
    const {setWorkList} = WorkState(state=>state)

    const [keyword, setKeyword] = useState<String>()

    const SearchWork = async () => {
        const SearchRes = await axios.post(`${URL}/work/search`,keyword)
        const Search = SearchRes.data
        setWorkList(Search)
    }

    return (
        <form name="SearchForm">
            <input onChange={(e)=>{setKeyword(e.target.value)}}/>
            <button type="button" onClick={(e)=>SearchWork()}>검색</button>
        </form>
    )
}