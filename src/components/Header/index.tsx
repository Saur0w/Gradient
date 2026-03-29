"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";

export default function Header() {
    const { theme, setTheme } = useTheme();

    // next-themes renders on server without knowing the theme — this prevents
    // a hydration mismatch on the icon
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Saurow</div>

            <nav className={styles.nav}>
                <Link href="/">Work</Link>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
            </nav>

            <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                {mounted && (theme === "dark" ? <SunIcon /> : <MoonIcon />)}
            </button>
        </header>
    );
}


function SunIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2"  x2="12" y2="4"  />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2"  y1="12" x2="4"  y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
    );
}