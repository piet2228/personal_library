import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BookGrid from "./BookGrid";

export default function () {
  return (
    <div className="container">
      <SearchBar />
      <BookGrid />
    </div>
  );
}
