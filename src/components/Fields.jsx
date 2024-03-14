import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";

const Fields = () => {
  const { api } = useSelector((state) => state.inputs);
  const { charge } = useSelector((state) => state.chargeAmount)
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown toggle
  const [checkedItems, setCheckedItems] = useState({}); // State to track checked items

  useEffect(() => {
    console.log("Checked APIs:", Object.keys(checkedItems).filter(key => checkedItems[key]));
    
  }, [checkedItems]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [value]: checked,
    }));
  };

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggles the dropdown state
  };

  // Initialize checkedItems when the component mounts
  useEffect(() => {
    const initialCheckedItems = {};
    api.forEach((apiItem) => {
      initialCheckedItems[apiItem] = true;
    });
    setCheckedItems(initialCheckedItems);
  }, [api]);

  return (
    <div className="w-96 m-auto p-5 grid">
      <button
        onClick={toggleDropdown}
        className="justify-self-center text-white m-auto hover:bg-black focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-gray-400 dark:focus:ring-black"
        type="button"
      >
        <span>Select API's</span> <IoIosArrowDown size={20}/>
      </button>

      <div
        className={`-z-10 ${
          isOpen ? "block" : "hidden"
        } justify-self-center w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
          {api.map((apiItem, index) => (
            <li key={index}>
              <div className="flex items-center">
                <input
                  id={`checkbox-item-${index}`}
                  type="checkbox"
                  value={apiItem}
                  checked={checkedItems[apiItem] || false} // Use checkedItems state if available, otherwise default to false
                  onChange={handleCheckboxChange}
                  // className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label htmlFor={`checkbox-item-${index}`} className="ml-2">
                  {apiItem}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Fields;
