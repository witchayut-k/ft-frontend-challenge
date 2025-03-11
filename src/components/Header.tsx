"use client";

import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import SuggestModal from "./SuggestModal";
import { getCitySuggestions, getTemperatureByLocation } from "@/services/weatherService";
import { get } from "http";

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSuggestOpen, setIsSuggestOpen] = useState(false);
    
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            const q = query.trim();
            setDebouncedQuery(q);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            getCitySuggestions(debouncedQuery).then((res) => {

                console.log('res', res)

                const newSuggestions = res.map((feature: any) => ({
                    name: feature.properties?.name,
                    place: feature.properties?.place_formatted,
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                    id: feature.id,
                }));

                console.log('newSuggestions', newSuggestions)

                setSuggestions(newSuggestions);
                setIsSuggestOpen(true);
            });
        } else {
            setSuggestions([]);
            setIsSuggestOpen(false);
        }
    }, [debouncedQuery]);

    const handleSearchFocus = () => {
        if (query) {
            setIsSuggestOpen(true);
        }
    };

    const handleCitySelected = (city: any) => {
        console.log('handleCitySelected', city)

        getTemperatureByLocation(city.latitude, city.longitude).then((res) => {
            console.log('res', res)
        });

        setIsSuggestOpen(false);
    };

    return (
        <div className="relative bg-white">
            {/* Navbar */}
            <div className="flex items-center justify-between  bg-white p-4 relative z-10 m-4 rounded-lg shadow-md">
                {/* Hamburger Button */}
                <button onClick={() => setIsSidebarOpen(true)} >
                    <Menu size={24} color="black" />
                </button>

                {/* Search Bar */}
                <input
                    type="search"
                    placeholder="Search City or Zipcode"
                    value={query}
                    className="w-full p-2 ml-2 mr-2  focus:outline-none "
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => handleSearchFocus()}
                />

                {/* Search Button */}
                <button>
                    <Search size={24} color="black" />
                </button>
            </div>

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Sugguest Modal Component */}
            <SuggestModal isOpen={isSuggestOpen} 
                onClose={() => setIsSuggestOpen(false)} suggestions={suggestions} 
                onSelected={handleCitySelected}  
                />
        </div>
    );
}
