import { useState, useRef, useEffect } from 'react';

const FilterDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const dropdownButtonRef = useRef(null);
  const [coursesFilter, setCoursesFilter] = useState('');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      dropdownButtonRef.current &&
      !dropdownButtonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        ref={dropdownButtonRef}
        className="absolute top-[25px] left-12 text-white bg-[#881c1d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleDropdown}
      >
        {selectedGender ? selectedGender : 'Filter'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdown"
          ref={dropdownRef}
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Gender
              </a>
              <ul className="pl-4">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleGenderSelect('Female')}
                  >
                    Female
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleGenderSelect('Male')}
                  >
                    Male
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleGenderSelect('Other')}
                  >
                    Other
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Course
              </a>
              <input
                type="text"
                className="px-4 py-2 border-t border-gray-100 w-full focus:outline-none focus:border-blue-300"
                placeholder="Type here..."
                value={coursesFilter}
                onChange={(e) => setCoursesFilter(e.target.value)}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
