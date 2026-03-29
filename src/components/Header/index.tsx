"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Saurow</div>
            <nav className={styles.nav}>
                <div className={styles.about}><p>About</p></div>
                <Link href="/contact">Contact</Link>
            </nav>
        </header>
    );
}