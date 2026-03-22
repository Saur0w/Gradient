// Landing.tsx
"use client";
import { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Scene from "./Scene";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Landing() {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!headingRef.current) return;

        const split = new SplitText(headingRef.current, { type: "words,chars" });

        gsap.from(split.chars, {
            opacity: 0,
            yPercent: 60,
            rotateX: -40,
            stagger: .0018,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3,
        });

        return () => split.revert();
    }, []);

    return (
        <section className={styles.landing}>
            <Scene />
            <div className={styles.content}>
                <h1 className={styles.heading} ref={headingRef}>
                    Hi, I&#39;m Saurow a designer and developer
                    focused on crafting immersive web experiences.
                    I blend motion, shaders, and modern tools
                    to create visuals that feel alive and interactive.
                </h1>
            </div>
        </section>
    );
}