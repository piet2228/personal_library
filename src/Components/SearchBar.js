import { useState } from "react"
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

export default function SearchBar({totalItems}){
  const [queryParams] = useSearchParams();

  const [pageNum, setPageNum] = useState(queryParams.get("page"));
  const [searchStr, setSearchStr] = useState(queryParams.get("search_bar"));


  const navigate = useNavigate()
  return (

    <Form>
      <input 
        name="search_bar" 
        value={searchStr}
        type="search"
        onChange={(event) => setSearchStr(event.target.value)}
        />
      <button>Search</button>
     
      <input
        name="page"
        type="number"
        value={pageNum}
        onChange={(event) => setPageNum(event.target.value)}
        min="1"
        style={{width: "5rem"}}
        />        
      <button>Page Number:</button>

    </Form>
  );
}