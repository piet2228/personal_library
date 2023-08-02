import { useState } from "react"
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate} from "react-router-dom";

export default function SearchBar({onSubmit}){
  const [searchStr, setSearchStr] = useState("");
  const navigate = useNavigate()
  return (
/*     <Form onSubmit={() => {
      navigate({
        pathname: "/",
        search: 
          `?${createSearchParams({search: searchStr})}`
      })
    }}> */
    <Form>
      <input 
        name="search_bar" 
        value={searchStr} 
        onChange={(event) => setSearchStr(event.target.value)}
        />
      <button>Search</button>
    </Form>
  );
}