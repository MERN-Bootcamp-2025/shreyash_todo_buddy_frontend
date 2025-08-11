import classNames from "classnames"
import { useState } from "react"

interface SearchProps {
    className: string,
    placeholder?: string;
    onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ className, placeholder = "Search...", onSearch, ...rest }) => {
    const [searchTerm, setSearchTerm] = useState('');


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
    }

    const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (onSearch) {
                onSearch(searchTerm);
            }
        }
    }

    const finalClassNames = classNames("text-sm rounded h-10 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500", "bg-[url(/public/icons/searchIcon/searchIcon.svg)] bg-no-repeat  bg-center bg-left bg-position-[0.5rem]", className)
    return (
        <div className="relative w-full">
            <input type="text"
                placeholder={placeholder}
                className={finalClassNames}
                {...rest}
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleEnterKey} />
        </div>
    )
}
export default SearchBar