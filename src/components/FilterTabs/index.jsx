"use client";
import styles from "./FilterTabs.module.scss";

const FilterTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "all", label: "Tất cả", count: "12.5K" },
        { id: "manga", label: "Manga", count: "4.2K" },
        { id: "manhwa", label: "Manhwa", count: "3.8K" },
        { id: "manhua", label: "Manhua", count: "2.1K" },
        { id: "comic", label: "Comic", count: "1.9K" },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${
                            activeTab === tab.id ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className={styles.label}>{tab.label}</span>
                        <span className={styles.count}>{tab.count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterTabs;
