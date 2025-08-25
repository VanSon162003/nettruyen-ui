"use client";

import { Search, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Logo */}
                    <Link to="/" className={styles.logo}>
                        <span className={styles.logoBlue}>Net</span>
                        <span className={styles.logoPink}>Truyen</span>
                    </Link>

                    {/* Search */}
                    <div className={styles.search}>
                        <input
                            type="text"
                            placeholder="Tìm truyện..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className={styles.searchIcon} />
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button className={styles.btn}>💡</button>
                        <button className={styles.btn}>💬</button>
                        <Link to="/login" className={styles.account}>
                            <Users className={styles.icon} />
                            <span>Đăng nhập</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
