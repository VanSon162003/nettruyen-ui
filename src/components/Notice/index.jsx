import styles from "./Notice.module.scss";

const Notice = () => {
    return (
        <div className={styles.notice}>
            <div className={styles.content}>
                <div className={styles.icon}>ⓘ</div>
                <p className={styles.message}>
                    🔴 NetTruyen có đặt quảng cáo để phát triển tính năng mới.
                    Xin lỗi vì trải nghiệm không thoải mái này!
                </p>
            </div>
        </div>
    );
};

export default Notice;
