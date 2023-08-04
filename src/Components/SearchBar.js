import { useState } from "react"
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

export default function SearchBar(){
  const [queryParams] = useSearchParams();

  const [pageNum, setPageNum] = useState(queryParams.get("page"));
  const [searchStr, setSearchStr] = useState(queryParams.get("search_bar"));

  return (

    <Form>
      <input 
        name="search_bar" 
        value={searchStr}
        type="search"
        onChange={(event) => setSearchStr(event.target.value)}
        />
      <button>Search</button>


    </Form>
  );
}