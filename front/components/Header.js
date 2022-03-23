import React from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "./Search";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;