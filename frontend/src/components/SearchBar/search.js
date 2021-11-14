const SearchBar = () => (
    <form>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search book</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search book by title"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;