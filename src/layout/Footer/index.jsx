import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Logo và mô tả */}
                    <div className={styles.section}>
                        <div className={styles.logo}>
                            <span className={styles.logoBlue}>Net</span>
                            <span className={styles.logoPink}>Truyen</span>
                        </div>
                        <p className={styles.description}>
                            Nền tảng đọc truyện tranh online hàng đầu Việt Nam
                            với hàng nghìn bộ truyện hay, cập nhật liên tục.
                        </p>
                        <div className={styles.social}>
                            <a href="#" className={styles.socialLink}>
                                <Facebook className={styles.socialIcon} />
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Twitter className={styles.socialIcon} />
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Instagram className={styles.socialIcon} />
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Youtube className={styles.socialIcon} />
                            </a>
                        </div>
                    </div>

                    {/* Liên kết nhanh */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Liên kết nhanh</h3>
                        <ul className={styles.linkList}>
                            <li>
                                <a href="/">Trang chủ</a>
                            </li>
                            <li>
                                <a href="/genres">Thể loại</a>
                            </li>
                            <li>
                                <a href="/top">Bảng xếp hạng</a>
                            </li>
                            <li>
                                <a href="/new">Truyện mới</a>
                            </li>
                            <li>
                                <a href="/completed">Hoàn thành</a>
                            </li>
                        </ul>
                    </div>

                    {/* Thể loại phổ biến */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            Thể loại phổ biến
                        </h3>
                        <ul className={styles.linkList}>
                            <li>
                                <a href="/genre/action">Hành động</a>
                            </li>
                            <li>
                                <a href="/genre/romance">Lãng mạn</a>
                            </li>
                            <li>
                                <a href="/genre/comedy">Hài hước</a>
                            </li>
                            <li>
                                <a href="/genre/drama">Drama</a>
                            </li>
                            <li>
                                <a href="/genre/fantasy">Viễn tưởng</a>
                            </li>
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Liên hệ</h3>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <Mail className={styles.contactIcon} />
                                <span>contact@nettruyen.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone className={styles.contactIcon} />
                                <span>+84 123 456 789</span>
                            </div>
                            <div className={styles.contactItem}>
                                <MapPin className={styles.contactIcon} />
                                <span>Hà Nội, Việt Nam</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        <p>&copy; 2024 NetTruyen. Tất cả quyền được bảo lưu.</p>
                    </div>
                    <div className={styles.policies}>
                        <a href="/privacy">Chính sách bảo mật</a>
                        <a href="/terms">Điều khoản sử dụng</a>
                        <a href="/dmca">DMCA</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
