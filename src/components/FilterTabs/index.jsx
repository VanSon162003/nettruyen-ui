import styles from "./FilterTabs.module.scss";

const FilterTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "all", label: "Tất cả" },
        { id: "completed", label: "Hoàn thành" },
        { id: "ongoing", label: "Đang tiến hành" },
    ];

    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tab} ${
                        activeTab === tab.id ? styles.active : ""
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default FilterTabs;
