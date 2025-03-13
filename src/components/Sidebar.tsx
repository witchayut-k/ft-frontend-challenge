import { useRef, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar(props: Props) {
  const { isOpen, onClose } = props;
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
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

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 shadow-lg transform transition-transform z-30 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-1 p-1 lg:hidden">
          <X size={24} />
        </button>

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <h2 className="text-xl font-bold">Weather App</h2>
          </li>
          <li>
            <Link
              href="/"
              onClick={onClose}
              className="block hover:text-slate-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              onClick={onClose}
              className="block hover:text-slate-300"
            >
              Settings
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
