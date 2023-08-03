import { useState } from "react"
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

export default function SearchBar({onSubmit}){
  const [queryParams] = useSearchParams();

  const [pageNum, setPageNum] = useState(queryParams.get("page"));
  const [searchStr, setSearchStr] = useState(queryParams.get("search_bar"));


  const navigate = useNavigate()
  return (
/*     <Form onSubmit={() => {
      navigate({
        pathname: "/",
        search: 
          `?${createSearchParams({search: searchStr})}`
      })
    }}> */
    <Form className="flexbox-row">
      <input 
        name="search_bar" 
        value={searchStr} 
        onChange={(event) => setSearchStr(event.target.value)}
        />
      <input
        type="text"
        readOnly
        value="Page Number:"
        style={{width:"8rem"}}
      />
      <input
        name="page"
        type="number"
        value={pageNum}
        onChange={(event) => setPageNum(event.target.value)}
        min="1"
        style={{width: "5rem"}}
        />        
      <button>Search</button>

    </Form>
  );
}