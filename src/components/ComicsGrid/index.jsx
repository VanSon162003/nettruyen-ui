import ComicCard from "../ComicCard";
import styles from "./ComicsGrid.module.scss";

const ComicsGrid = ({ comics }) => {
    return (
        <div className={styles.grid}>
            {comics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
            ))}
        </div>
    );
};

export default ComicsGrid;
