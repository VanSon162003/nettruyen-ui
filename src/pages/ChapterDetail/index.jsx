"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ChapterDetail.module.scss";

import chaptersService from "../../service/chaptersService";

const ChapterDetail = () => {
    const { comicSlug, chapterId } = useParams();

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [chapter, setChapter] = useState({});

    useEffect(() => {
        (async () => {
            const result = await chaptersService.getBySlug(chapterId);

            setChapter({
                chapterImages: result?.data?.chapter?.content
                    ? JSON.parse(result.data.chapter.content)
                    : [],
                chapterInfo: {
                    title: result?.data?.chapter?.comic?.name,
                    chapter: result?.data?.chapter?.name,
                    totalPages: JSON.parse(
                        result?.data?.chapter?.content || JSON.stringify([])
                    ).length,
                },
                navigation: [result.data.navigation],
            });
        })();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowControls(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showControls]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < chapter?.chapterImages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevChapter = () => {
        const prevChapter = chapter.navigation[0].next;

        if (prevChapter) {
            window.location.href = `/comic/${comicSlug}/chapter/${prevChapter.id}`;
        }
    };

    const handleNextChapter = () => {
        const nextChapter = chapter.navigation[0].prev;

        if (nextChapter) {
            window.location.href = `/comic/${comicSlug}/chapter/${nextChapter.id}`;
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleKeyPress = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                handlePrevPage();
                break;
            case "ArrowRight":
                handleNextPage();
                break;
            case "f":
            case "F":
                toggleFullscreen();
                break;
            case "Escape":
                navigate(-1);
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [currentPage]);

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
                <p>Đang tải chương...</p>
            </div>
        );
    }

    return (
        <div
            className={styles.chapterDetail}
            onMouseMove={() => setShowControls(true)}
        >
            {/* Header Controls */}
            <div
                className={`${styles.header} ${
                    showControls ? styles.visible : ""
                }`}
            >
                <div className={styles.headerContent}>
                    <button
                        className={styles.backBtn}
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M19 12H5M12 19l-7-7 7-7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Quay lại
                    </button>

                    <div className={styles.chapterInfo}>
                        <h1>{chapter?.chapterInfo.title}</h1>
                        <p>{chapter?.chapterInfo.chapter}</p>
                    </div>

                    <div className={styles.headerActions}>
                        <button
                            className={styles.fullscreenBtn}
                            onClick={toggleFullscreen}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    {chapter.chapterImages.map((image, index) => {
                        return (
                            <div key={index} className={styles.pageWrapper}>
                                <img
                                    src={`${
                                        import.meta.env.VITE_BASE_URL
                                    }${image}`}
                                    alt={`Trang ${index + 1}`}
                                    className={styles.pageImage}
                                    loading="lazy"
                                />
                                <div className={styles.pageNumber}>
                                    {index + 1} / {chapter.chapterImages.length}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Controls */}
            <div
                className={`${styles.bottomControls} ${
                    showControls ? styles.visible : ""
                }`}
            >
                <div className={styles.controlsContent}>
                    <button
                        className={styles.chapterBtn}
                        onClick={handlePrevChapter}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Chương trước
                    </button>

                    <div className={styles.pageControls}>
                        {chapter?.navigation[0].next && (
                            <button
                                className={styles.pageBtn}
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15 18l-6-6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        )}

                        <span className={styles.pageInfo}>
                            {currentPage} / {chapter.chapterImages.length}
                        </span>

                        <button
                            className={styles.pageBtn}
                            onClick={handleNextPage}
                            disabled={
                                currentPage === chapter.chapterImages.length
                            }
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M9 18l6-6-6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {chapter.navigation[0].prev && (
                        <button
                            className={styles.chapterBtn}
                            onClick={handleNextChapter}
                        >
                            Chương sau
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Reading Instructions */}
            <div className={styles.instructions}>
                <p>
                    Sử dụng phím mũi tên ← → để chuyển trang, F để toàn màn
                    hình, ESC để thoát
                </p>
            </div>
        </div>
    );
};

export default ChapterDetail;
