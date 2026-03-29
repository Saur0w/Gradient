"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Saurow</div>
            <nav className={styles.nav}>
                <Link href="/">Work</Link>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
            </nav>
        </header>
    );
}