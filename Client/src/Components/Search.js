import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BookGrid from "./BookGrid";
import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";

export default function () {
  return (
    <div className="container">
      <SearchBar />
      <BookGrid />
    </div>
  );
}
