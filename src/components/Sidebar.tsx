"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button onClick={onClose} className="mb-4 p-2">
        <X size={24} />
      </button>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/" onClick={onClose} className="block hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/settings" onClick={onClose} className="block hover:text-gray-300">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
