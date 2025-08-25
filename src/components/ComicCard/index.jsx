import { Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ComicCard.module.scss";

const ComicCard = ({ comic }) => {
    return (
        <Link to={`/comic/${comic.slug}`} className={styles.card}>
            <div className={styles.thumbnailWrapper}>
                <img
                    src={`${import.meta.env.VITE_BASE_URL}${comic?.thumbnail}`}
                    alt={comic.name}
                    className={styles.thumbnail}
                />
                <div className={styles.status}>{comic.status}</div>
                <div className={styles.overlayInfo}>
                    <div className={styles.views}>
                        <Eye className={styles.icon} />
                        <span>{comic.views.toLocaleString()}</span>
                    </div>
                    <div className={styles.ratings}>
                        <Star className={styles.star} />
                        <span>{comic.ratings}</span>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{comic.name}</h3>

                <div className={styles.genres}>
                    {comic.genres.slice(0, 3).map((genre, index) => (
                        <span key={index} className={styles.genre}>
                            {genre}
                        </span>
                    ))}
                </div>

                <div className={styles.footer}>
                    <span className={styles.chapter}>
                        {comic.latestChapter}
                    </span>
                    <span className={styles.timeAgo}>{comic.timeAgo}</span>
                </div>
            </div>
        </Link>
    );
};

export default ComicCard;
