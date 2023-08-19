import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(queryParams.get("page"));
  const [searchStr, setSearchStr] = useState(queryParams.get("search_bar"));

  return (
    <div className="m-3">
      <Form>
        <InputGroup>
          <Form.Control
            name="search_bar"
            value={searchStr}
            type="search"
            onChange={(event) => setSearchStr(event.target.value)}
          />
          <Button href={`/search?search_bar=${searchStr}`}>Search</Button>
        </InputGroup>
      </Form>
    </div>
  );
}
