"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Navigation from "../../components/Navigation";
import Notice from "../../components/Notice";
import FilterTabs from "../../components/FilterTabs";
import SortOptions from "../../components/SortOptions";
import ComicsGrid from "../../components/ComicsGrid";
import GenreSidebar from "../../components/GenreSidebar";
import { useSearchParams } from "react-router-dom";
import styles from "./Home.module.scss";
import comicsService from "../../service/comicsService";

const Home = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [comics, setComics] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
    });
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const pageFromUrl = Number.parseInt(searchParams.get("page")) || 1;
        fetchComics(pageFromUrl, false);
    }, []);

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        genreId: "",
        authorId: "",
        limit: 10,
    });

    const fetchComics = useCallback(
        async (page = 1, isPageChange = false, customFilters = null) => {
            try {
                if (isPageChange) {
                    setPageLoading(true);
                } else {
                    setLoading(true);
                }
                setError(null);

                const currentFilters = customFilters || filters;

                const requestParams = {
                    page: page,
                    limit: currentFilters.limit,
                    ...(currentFilters.search && {
                        search: currentFilters.search,
                    }),
                    ...(currentFilters.status && {
                        status: currentFilters.status,
                    }),
                    ...(currentFilters.genreId && {
                        genreId: currentFilters.genreId,
                    }),
                    ...(currentFilters.authorId && {
                        authorId: currentFilters.authorId,
                    }),
                };

                const result = await comicsService.getAll(requestParams);

                if (result.success) {
                    const transformedComics = result.data.comics.map(
                        (comic) => ({
                            id: comic.id,
                            name: comic.name,
                            slug: comic.slug,
                            thumbnail: comic.thumbnail,
                            status: comic.status || "Đang cập nhật",
                            views: comic.views,
                            ratings: comic.ratings,
                            latestChapter: comic?.chapters[0]?.name,
                            timeAgo: new Date(
                                comic.updatedAt
                            ).toLocaleDateString("vi-VN"),
                            genres: comic.genres.map((genre) => genre.name),
                            originalUrl: comic.originalUrl,
                            crawlStatus: comic.crawlStatus,
                        })
                    );

                    setComics(transformedComics);
                    setPagination(result.data.pagination);

                    if (isPageChange) {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }
                } else {
                    setError(result.message || "Không thể tải dữ liệu truyện");
                }
            } catch (err) {
                setError("Đã xảy ra lỗi khi tải dữ liệu");
                console.error("Error fetching comics:", err);
            } finally {
                setLoading(false);
                setPageLoading(false);
            }
        },
        [filters]
    );

    useEffect(() => {
        fetchComics(1, false);
    }, []);

    const handlePageChange = useCallback(
        (page) => {
            if (
                page >= 1 &&
                page <= pagination.totalPages &&
                page !== pagination.currentPage &&
                !pageLoading
            ) {
                setSearchParams({
                    page: page.toString(),
                });
                fetchComics(page, true);
            }
        },
        [
            pagination.currentPage,
            pagination.totalPages,
            pageLoading,
            fetchComics,
            setSearchParams,
        ]
    );

    const generatePageNumbers = useCallback(() => {
        const pages = [];
        const { currentPage, totalPages } = pagination;

        if (totalPages <= 1) return [];

        if (currentPage > 3) {
            pages.push(1);
            if (currentPage > 4) {
                pages.push("...");
            }
        }

        for (
            let i = Math.max(1, currentPage - 2);
            i <= Math.min(totalPages, currentPage + 2);
            i++
        ) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                pages.push("...");
            }
            pages.push(totalPages);
        }

        return pages;
    }, [pagination]);

    const handleRetry = useCallback(() => {
        fetchComics(pagination.currentPage, false);
    }, [fetchComics, pagination.currentPage]);

    return (
        <div className={styles.wrapper}>
            <Header />
            <Navigation />

            <div className={styles.container}>
                <Notice />

                <div className={styles.breadcrumb}>
                    <span className={styles.active}>Trang chủ</span>
                    <span className={styles.separator}>›</span>
                    <span>Thể loại</span>
                </div>

                <div className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.box}>
                            <h1 className={styles.title}>
                                Tất cả thể loại truyện tranh
                            </h1>

                            <FilterTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            <SortOptions />
                        </div>

                        {loading && (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                                <p>Đang tải dữ liệu...</p>
                            </div>
                        )}

                        {error && !loading && (
                            <div className={styles.error}>
                                <p>{error}</p>
                                <button onClick={handleRetry}>Thử lại</button>
                            </div>
                        )}

                        {!loading && !error && (
                            <div className={styles.contentWrapper}>
                                {pageLoading && (
                                    <div className={styles.pageLoadingOverlay}>
                                        <div
                                            className={
                                                styles.pageLoadingSpinner
                                            }
                                        ></div>
                                        <p>
                                            Đang tải trang{" "}
                                            {pagination.currentPage}...
                                        </p>
                                    </div>
                                )}

                                <ComicsGrid comics={comics} />

                                {generatePageNumbers().length > 0 && (
                                    <div
                                        className={`${styles.pagination} ${
                                            pageLoading ? styles.disabled : ""
                                        }`}
                                    >
                                        <button
                                            className={`${styles.page} ${
                                                styles.navButton
                                            } ${
                                                pagination.currentPage === 1 ||
                                                pageLoading
                                                    ? styles.disabled
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.currentPage - 1
                                                )
                                            }
                                            disabled={
                                                pagination.currentPage === 1 ||
                                                pageLoading
                                            }
                                        >
                                            ‹ Trước
                                        </button>

                                        {generatePageNumbers().map(
                                            (page, index) => (
                                                <button
                                                    key={index}
                                                    className={`${
                                                        styles.page
                                                    } ${
                                                        page ===
                                                        pagination.currentPage
                                                            ? styles.pageActive
                                                            : ""
                                                    } ${
                                                        page === "..."
                                                            ? styles.ellipsis
                                                            : ""
                                                    } ${
                                                        pageLoading
                                                            ? styles.disabled
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        typeof page ===
                                                            "number" &&
                                                        handlePageChange(page)
                                                    }
                                                    disabled={
                                                        page === "..." ||
                                                        pageLoading
                                                    }
                                                >
                                                    {page}
                                                </button>
                                            )
                                        )}

                                        <button
                                            className={`${styles.page} ${
                                                styles.navButton
                                            } ${
                                                pagination.currentPage ===
                                                    pagination.totalPages ||
                                                pageLoading
                                                    ? styles.disabled
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.currentPage + 1
                                                )
                                            }
                                            disabled={
                                                pagination.currentPage ===
                                                    pagination.totalPages ||
                                                pageLoading
                                            }
                                        >
                                            Sau ›
                                        </button>
                                    </div>
                                )}

                                <div className={styles.paginationInfo}>
                                    <p>
                                        Trang {pagination.currentPage} /{" "}
                                        {pagination.totalPages}(
                                        {pagination.totalItems} truyện)
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <aside className={styles.sidebar}>
                        <GenreSidebar />
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
