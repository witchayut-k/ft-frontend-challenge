// components/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { MapPin } from "lucide-react";

interface ModalProps {
  suggestions: any[];
  isOpen: boolean;
  onClose: () => void;
  onSelected: (city: any) => void;
}

const SuggestModal: React.FC<ModalProps> = ({ isOpen, onClose, onSelected, suggestions }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleCitySelected = (city: any) => {
    console.log(city)
    onSelected(city);
    onClose();
  }

  // if (!suggestions.length) return null

  return (
    <>
      <div ref={modalRef}
        className={`${isOpen ? "" : "hidden"
          }`} >

        {/* Backdrop */}
        < div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

        {/* Modal content */}
        <div className="absolute  w-full overflow-y-auto rounded-lg">
          <ul className="bg-white rounded-lg shadow-lg ml-4 mr-4 ">
            {suggestions.map((item, index) => (
              <li key={index} className="flex px-4 pt-3 hover:bg-gray-100 cursor-pointer text-black "
                onClick={() => handleCitySelected(item)}>
                <span className='mt-1'>
                  <MapPin size={16} />
                </span>
                <div className='ml-2 flex-grow border-b border-gray-200 pb-2 mr-2az    0o9tf5rc     ; loiyiioooooooooooooooooooooooooooooooopoopppp0p0pppppppppppppppppppppppppppppppppppp xd4e3wcse3cwswrcazy6'>
                  <div >{item.name}</div>
                  <small>{item.place}</small>
                </div>
              </li>
            ))}

            {
              isOpen && suggestions.length === 0 &&
              <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black ">
                <span>No results found</span>
              </li>
            }
          </ul>
        </div>
      </div >

    </>
  );
};

export default SuggestModal;
