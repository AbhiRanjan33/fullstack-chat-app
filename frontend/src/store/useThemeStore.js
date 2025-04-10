import { create } from "zustand";
import React from "react"; // This import is unnecessary here and can be removed

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee", // Initial state
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme }); // Update the state
    },
}));