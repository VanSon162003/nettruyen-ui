import styles from "./GenreSidebar.module.scss";

const GenreSidebar = () => {
    const mockGenres = [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
        { id: 3, name: "Anime" },
        { id: 4, name: "Chuyển Sinh" },
        { id: 5, name: "Comedy" },
        { id: 6, name: "Comic" },
        { id: 7, name: "Cooking" },
        { id: 8, name: "Cổ Đại" },
        { id: 9, name: "Doujinshi" },
        { id: 10, name: "Drama" },
        { id: 11, name: "Đam Mỹ" },
        { id: 12, name: "Fantasy" },
        { id: 13, name: "Gender Bender" },
        { id: 14, name: "Historical" },
        { id: 15, name: "Horror" },
        { id: 16, name: "Live action" },
        { id: 17, name: "Manga" },
        { id: 18, name: "Manhua" },
        { id: 19, name: "Manhwa" },
        { id: 20, name: "Martial Arts" },
        { id: 21, name: "Mecha" },
        { id: 22, name: "Mystery" },
        { id: 23, name: "Ngôn Tình" },
        { id: 24, name: "Psychological" },
    ];

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Thể loại</h3>
            <div className={styles.container}>
                <div className={styles.all}>Tất cả</div>
                <div className={styles.genreList}>
                    {mockGenres.map((genre) => (
                        <button key={genre.id} className={styles.genreBtn}>
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenreSidebar;
