import React, { useState } from "react";
import Header from "../../layout/Header";
import Navigation from "../../components/Navigation";
import Notice from "../../components/Notice";
import FilterTabs from "../../components/FilterTabs";
import SortOptions from "../../components/SortOptions";
import ComicsGrid from "../../components/ComicsGrid";
import GenreSidebar from "../../components/GenreSidebar";
import styles from "./Home.module.scss";

const mockComics = [
    {
        id: 1,
        name: "Tôi Đã Trở Thành Mẹ Của Nhân Vật Phản Diện",
        slug: "toi-da-tro-thanh-me-cua-nhan-vat-phan-dien",
        thumbnail: "/api/placeholder/200/280",
        status: "Đang tiến hành",
        views: 1250000,
        ratings: 4.8,
        latestChapter: "Chapter 83.7",
        timeAgo: "46 phút trước",
        genres: ["Drama", "Fantasy", "Manhwa"],
    },
    {
        id: 2,
        name: "Triều Hoán Ác Ma, Ta Đã Là Thần Uyên",
        slug: "trieu-hoan-ac-ma-ta-da-la-than-uyen",
        thumbnail: "/api/placeholder/200/280",
        status: "Đang tiến hành",
        views: 980000,
        ratings: 4.7,
        latestChapter: "Chapter 29",
        timeAgo: "6 ngày trước",
        genres: ["Action", "Fantasy", "Manhwa"],
    },
    {
        id: 3,
        name: "Seijo ja nakatta no de, Oukyuu de nonbiri Gohan wo...",
        slug: "seijo-ja-nakatta-no-de-oukyuu-de-nonbiri-gohan-wo",
        thumbnail: "/api/placeholder/200/280",
        status: "Đang tiến hành",
        views: 750000,
        ratings: 4.6,
        latestChapter: "Chapter 24",
        timeAgo: "1 giờ trước",
        genres: ["Comedy", "Fantasy", "Manga"],
    },
    {
        id: 4,
        name: "Công Hồi Ký Lần",
        slug: "cong-hoi-ky-lan",
        thumbnail: "/api/placeholder/200/280",
        status: "Đang tiến hành",
        views: 650000,
        ratings: 4.5,
        latestChapter: "Chapter 17",
        timeAgo: "3 giờ trước",
        genres: ["Action", "Martial Arts", "Manhua"],
    },
];

const Home = () => {
    const [activeTab, setActiveTab] = useState("all");

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

                        <ComicsGrid comics={mockComics} />

                        <div className={styles.pagination}>
                            <button className={styles.pageActive}>1</button>
                            <button className={styles.page}>2</button>
                            <button className={styles.page}>3</button>
                            <button className={styles.page}>...</button>
                        </div>
                    </div>

                    <aside className={styles.sidebar}>
                        <GenreSidebar />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Home;
