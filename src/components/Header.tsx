"use client";

import { useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import SuggestModal from "./SuggestModal";

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const cityList = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

    const handleFocus = () => {
        setIsFocused(true);
        setSuggestions(cityList); // Replace with your city suggestion logic
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <div className="flex items-center justify-between p-4 bg-gray-800 ">
                {/* Hamburger Button */}
                <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={24} />
                </button>

                {/* Search Bar */}
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                {/* Search Button */}
                <button className="p-2">
                    <Search size={24} />
                </button>
            </div>

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Sugguest Modal Component */}
            <SuggestModal isVisible={isFocused} suggestions={suggestions} />
        </div>
    );
}
