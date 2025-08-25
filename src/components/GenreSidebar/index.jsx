import { TrendingUp, Users, Calendar } from "lucide-react";
import styles from "./GenreSidebar.module.scss";

import genresService from "../../service/genresService";
import { useEffect, useState } from "react";
import comicsService from "../../service/comicsService";

const GenreSidebar = () => {
    // const trendingComics = [
    //     { name: "Solo Leveling", views: "2.5M", trend: "+15%" },
    //     { name: "Tower of God", views: "1.8M", trend: "+12%" },
    //     { name: "The Beginning After The End", views: "1.2M", trend: "+8%" },
    // ];

    const [genres, setGenres] = useState([]);
    const [trendingComics, setTrendingComics] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await genresService.getAll();
            setGenres(result.data.splice(0, 11).map((item) => item.name));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await comicsService.getPopular();
            result.data.forEach((item) => {
                setTrendingComics((prev) => {
                    return [
                        ...prev,
                        {
                            name: item.name,
                            views: item.views,
                            trend: `${item.ratings} *`,
                        },
                    ];
                });
            });
        })();
    }, []);

    return (
        <div className={styles.sidebar}>
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <TrendingUp size={18} />
                    Thể loại phổ biến
                </h3>
                <div className={styles.genres}>
                    {genres.map((genre, index) => (
                        <button key={index} className={styles.genreTag}>
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <Users size={18} />
                    Trending hôm nay
                </h3>
                <div className={styles.trendingList}>
                    {trendingComics.map((comic, index) => (
                        <div key={index} className={styles.trendingItem}>
                            <div className={styles.rank}>{index + 1}</div>
                            <div className={styles.info}>
                                <div className={styles.name}>{comic.name}</div>
                                <div className={styles.views}>
                                    {comic.views} lượt xem
                                </div>
                            </div>
                            <div className={styles.trend}>{comic.trend}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <Calendar size={18} />
                    Lịch cập nhật
                </h3>
                <div className={styles.schedule}>
                    <div className={styles.day}>
                        <span className={styles.dayName}>Hôm nay</span>
                        <span className={styles.count}>12 truyện</span>
                    </div>
                    <div className={styles.day}>
                        <span className={styles.dayName}>Ngày mai</span>
                        <span className={styles.count}>8 truyện</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenreSidebar;
