import {
    Search,
    Home,
    Clock,
    List,
    Star,
    Eye,
    Calendar,
    Users,
} from "lucide-react";
import styles from "./Navigation.module.scss";

const Navigation = () => {
    const navItems = [
        { icon: Home, label: "HOME", active: true },
        { icon: Calendar, label: "HOT" },
        { icon: Clock, label: "THEO DÕI" },
        { icon: List, label: "LỊCH SỬ" },
        { icon: Star, label: "THỂ LOẠI" },
        { icon: List, label: "XẾP HẠNG" },
        { icon: Search, label: "TÌM TRUYỆN" },
        { icon: Eye, label: "CON GÁI" },
        { icon: Users, label: "CON TRAI" },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.navList}>
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={index}
                                className={`${styles.navItem} ${
                                    item.active ? styles.active : ""
                                }`}
                            >
                                <Icon />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
