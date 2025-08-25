("use client");

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Eye,
    Star,
    Heart,
    Share2,
    BookOpen,
    Calendar,
    User,
    Tag,
    ChevronRight,
    Clock,
} from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import styles from "./ComicDetail.module.scss";

import comicsService from "../../service/comicsService";

const ComicDetail = () => {
    const { slug } = useParams();
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("info");
    const [isLiked, setIsLiked] = useState(false);

    console.log(comic);

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchComic = async () => {
            setLoading(true);

            const mockComic = {
                id: 1,
                name: "One Piece",
                slug: "one-piece",
                thumbnail: "/one-piece-manga-cover.png",
                description:
                    "Monkey D. Luffy là một cậu bé có khả năng co giãn như cao su sau khi vô tình ăn phải trái ác quỷ. Cùng với băng hải tặc Mũ Rơm do mình làm thuyền trưởng, Luffy khám phá Grand Line để tìm kiếm kho báu huyền thoại được gọi là 'One Piece' nhằm trở thành Vua Hải Tặc kế tiếp.",
                author: "Eiichiro Oda",
                status: "Đang cập nhật",
                views: 15420000,
                ratings: 4.9,
                total: 1095,
                genres: [
                    "Hành động",
                    "Phiêu lưu",
                    "Hài hước",
                    "Shounen",
                    "Siêu nhiên",
                ],
                publishedDate: "1997-07-22",
                updatedAt: "2024-01-15",
                chapters: [
                    {
                        id: 1095,
                        name: "Chương 1095: Thế giới mà Vegapunk muốn",
                        publishedAt: "2024-01-15",
                    },
                    {
                        id: 1094,
                        name: "Chương 1094: Thánh Jay Garcia Saturn",
                        publishedAt: "2024-01-08",
                    },
                    {
                        id: 1093,
                        name: "Chương 1093: Luffy vs Kizaru",
                        publishedAt: "2024-01-01",
                    },
                    {
                        id: 1092,
                        name: "Chương 1092: Kuma và Bonney",
                        publishedAt: "2023-12-25",
                    },
                    {
                        id: 1091,
                        name: "Chương 1091: Sentomaru",
                        updatedAt: "2023-12-18",
                    },
                ],
            };
            // Simulate API call
            const result = await comicsService.getBySlug(slug);

            setComic(result.data);

            setLoading(false);
        };

        fetchComic();
    }, [slug]);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: comic.name,
                text: comic.content,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Đã sao chép link vào clipboard!");
        }
    };

    if (loading) {
        return (
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải thông tin truyện...</p>
                </div>
            </div>
        );
    }

    if (!comic) {
        return (
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.error}>
                    <h2>Không tìm thấy truyện</h2>
                    <Link to="/" className={styles.backHome}>
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <Header />

            <div className={styles.container}>
                <div className={styles.breadcrumb}>
                    <Link to="/">Trang chủ</Link>
                    <ChevronRight className={styles.separator} />
                    <span className={styles.active}>{comic.name}</span>
                </div>

                <div className={styles.comicHeader}>
                    <div className={styles.thumbnail}>
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}${
                                comic?.thumbnail
                            }`}
                            alt={comic.name}
                        />
                        <div className={styles.actions}>
                            <button
                                className={`${styles.actionBtn} ${
                                    isLiked ? styles.liked : ""
                                }`}
                                onClick={handleLike}
                            >
                                <Heart className={styles.actionIcon} />
                                {isLiked ? "Đã thích" : "Yêu thích"}
                            </button>
                            <button
                                className={styles.actionBtn}
                                onClick={handleShare}
                            >
                                <Share2 className={styles.actionIcon} />
                                Chia sẻ
                            </button>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <h1 className={styles.title}>{comic.name}</h1>

                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <Eye className={styles.statIcon} />
                                <span>
                                    {comic.views.toLocaleString()} lượt xem
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <Star className={styles.statIcon} />
                                <span>
                                    {comic.ratings}/5 (
                                    {Math.floor(comic.views / 5)} đánh giá)
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <BookOpen className={styles.statIcon} />
                                <span>{comic.chapters.length} chương</span>
                            </div>
                        </div>

                        <div className={styles.metadata}>
                            <div className={styles.metaItem}>
                                <User className={styles.metaIcon} />
                                <span>
                                    <strong>Tác giả:</strong>{" "}
                                    {comic.authors.map((author) => author.name)}
                                </span>
                            </div>
                            <div className={styles.metaItem}>
                                <Calendar className={styles.metaIcon} />
                                <span>
                                    <strong>Xuất bản:</strong>{" "}
                                    {new Date(comic.createdAt).getFullYear()}
                                </span>
                            </div>
                            <div className={styles.metaItem}>
                                <Clock className={styles.metaIcon} />
                                <span>
                                    <strong>Cập nhật:</strong>{" "}
                                    {new Date(
                                        comic.updatedAt
                                    ).toLocaleDateString("vi-VN")}
                                </span>
                            </div>
                            <div className={styles.metaItem}>
                                <Tag className={styles.metaIcon} />
                                <span>
                                    <strong>Trạng thái:</strong>{" "}
                                    {comic.status
                                        ? comic.status
                                        : "Đang cập nhật"}
                                </span>
                            </div>
                        </div>

                        <div className={styles.genres}>
                            {comic.genres.map((genre, index) => (
                                <span key={index} className={styles.genre}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className={styles.readButtons}>
                            <Link
                                to={`/comic/${comic.slug}/chapter/${
                                    comic.chapters.at(-1).id
                                }`}
                                className={styles.readBtn}
                            >
                                <BookOpen className={styles.readIcon} />
                                Đọc từ đầu
                            </Link>
                            <Link
                                to={`/comic/${comic.slug}/chapter/${comic.chapters[0].id}`}
                                className={styles.readBtnSecondary}
                            >
                                Đọc chương mới nhất
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${
                                activeTab === "info" ? styles.active : ""
                            }`}
                            onClick={() => setActiveTab("info")}
                        >
                            Thông tin
                        </button>
                        <button
                            className={`${styles.tab} ${
                                activeTab === "chapters" ? styles.active : ""
                            }`}
                            onClick={() => setActiveTab("chapters")}
                        >
                            Danh sách chương ({comic.chapters.length})
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === "info" && (
                            <div className={styles.description}>
                                <h3>Nội dung</h3>
                                <p>{comic.content}</p>
                            </div>
                        )}

                        {activeTab === "chapters" && (
                            <div className={styles.chapterList}>
                                <div className={styles.chapterHeader}>
                                    <h3>Danh sách chương</h3>
                                    <span className={styles.chapterCount}>
                                        {comic.chapters.length} chương mới nhất
                                    </span>
                                </div>

                                <div className={styles.chapters}>
                                    {comic.chapters.map((chapter) => (
                                        <Link
                                            key={chapter.id}
                                            to={`/comic/${comic.slug}/chapter/${chapter.id}`}
                                            className={styles.chapterItem}
                                        >
                                            <div className={styles.chapterInfo}>
                                                <span
                                                    className={
                                                        styles.chapterName
                                                    }
                                                >
                                                    {chapter.name}
                                                </span>
                                                <span
                                                    className={
                                                        styles.chapterDate
                                                    }
                                                >
                                                    {new Date(
                                                        chapter.updatedAt
                                                    ).toLocaleDateString(
                                                        "vi-VN"
                                                    )}
                                                </span>
                                            </div>
                                            <ChevronRight
                                                className={styles.chapterArrow}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ComicDetail;
