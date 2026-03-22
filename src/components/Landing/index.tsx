"use client";

import styles from "./style.module.scss";
import Scene from "./Scene";

export default function Landing() {
    return (
      <section className={styles.landing}>
          <Scene />
          <h1>Hi! I&#39;m Saurow, a designer specializing in Interactive Experiences</h1>
      </section>  
    );
}