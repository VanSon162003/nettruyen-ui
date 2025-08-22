import styles from "./SortOptions.module.scss";

const SortOptions = () => {
    const sortOptions = [
        { id: "newest", label: "Ngày cập nhật", active: true },
        { id: "new", label: "Truyện mới" },
        { id: "week", label: "Top tuần" },
        { id: "day", label: "Top ngày" },
        { id: "all", label: "Top all" },
        { id: "month", label: "Top tháng" },
        { id: "chapters", label: "Số chapter" },
        { id: "follow", label: "Top Follow" },
        { id: "favorite", label: "Theo dõi" },
        { id: "rating", label: "Đánh luận" },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Sắp xếp theo:</div>
            <div className={styles.options}>
                {sortOptions.map((option) => (
                    <button
                        key={option.id}
                        className={`${styles.button} ${
                            option.active ? styles.active : ""
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SortOptions;
