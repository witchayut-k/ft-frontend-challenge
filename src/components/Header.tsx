"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import SuggestDialog from "./SuggestDialog";
import { getCitySuggestions } from "@/core/services/weatherService";
import { useDebounce } from "react-use";
import useCities from "@/core/hooks/useCities";

interface HeaderProps {
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { addCity } = useCities();
  const router = useRouter();

  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  useDebounce(
    () => {
      const q = query.trim();
      setDebouncedQuery(q);
    },
    500,
    [query]
  );

  useEffect(() => {
    if (debouncedQuery) {
      getCitySuggestions(debouncedQuery).then(
        (res: MapboxGeocodingResponse) => {
          const newSuggestions = res.features.map(
            (feature: MapboxSuggestCity) => ({
              id: feature.id,
              name:
                feature.properties?.feature_type == "postcode"
                  ? feature.properties?.place_formatted
                  : feature.properties?.name,
              place: feature.properties?.place_formatted,
              countryCode: feature.properties?.context.country.country_code,
              latitude: feature.properties?.coordinates.latitude,
              longitude: feature.properties?.coordinates.longitude,
            })
          );

          setSuggestions(newSuggestions);
          setIsSuggestOpen(true);
        }
      );
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
    setQuery("");
    addCity(city);
    setIsSuggestOpen(false);
    router.push(`/`);

    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 100);
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between border border-gray-100 bg-white py-4 mx-4 mt-4 relative z-20 rounded-lg shadow-md">
        {/* Hamburger Button */}
        <button onClick={() => toggleSidebar(true)} className="lg:hidden ml-4">
          <Menu size={24} color="black" />
        </button>

        {/* Search Bar */}
        <input
          type="search"
          placeholder="Search City or Zipcode"
          value={query}
          className="w-full p-2 mx-2 focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => handleSearchFocus()}
        />
      </div>

      {/* Sugguest Modal Component */}
      <SuggestDialog
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
        suggestions={suggestions}
        onSelected={handleCitySelected}
      />
    </>
  );
};

export default Header;
