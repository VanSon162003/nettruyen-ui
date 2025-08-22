import { Search, Users } from "lucide-react";
import { useState } from "react";
import styles from "./Header.module.scss";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__content}>
                    {/* Logo */}
                    <div className={styles.header__logo}>
                        <span className={styles["logo-blue"]}>Net</span>
                        <span className={styles["logo-pink"]}>Truyen</span>
                    </div>

                    {/* Search */}
                    <div className={styles.header__search}>
                        <input
                            type="text"
                            placeholder="Tìm truyện..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className={styles["search-icon"]} />
                    </div>

                    {/* Actions */}
                    <div className={styles.header__actions}>
                        <button className={styles.btn}>💡</button>
                        <button className={styles.btn}>💬</button>
                        <div className={styles.account}>
                            <Users className={styles.icon} />
                            <span>Tài khoản</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
