import { useState } from "react"

export default function SearchBar({onSubmit}){
  const [searchStr, setSearchStr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    alert(`${searchStr}`);
  }
  return (
    <>
      <input 
        name="search_bar" 
        value={searchStr} 
        onChange={(event) => setSearchStr(event.target.value)}
        />
      <button onClick={onSubmit}>Submit</button>
    </>
  )
}