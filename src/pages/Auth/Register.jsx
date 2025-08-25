"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.scss";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = "Tên người dùng không được để trống";
        } else if (formData.username.length < 3) {
            newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự";
        }

        if (!formData.email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Register data:", formData);
            // Handle successful registration here
        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <Link to="/" className={styles.backButton}>
                            <ArrowLeft className={styles.backIcon} />
                            <span>Về trang chủ</span>
                        </Link>

                        <div className={styles.logo}>
                            <span className={styles.logoBlue}>Net</span>
                            <span className={styles.logoPink}>Truyen</span>
                        </div>

                        <h1 className={styles.title}>Đăng ký</h1>
                        <p className={styles.subtitle}>
                            Tạo tài khoản mới để khám phá thế giới truyện tranh
                            tuyệt vời.
                        </p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                Tên người dùng
                            </label>
                            <div className={styles.inputWrapper}>
                                <User className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`${styles.input} ${
                                        errors.username ? styles.inputError : ""
                                    }`}
                                    placeholder="Nhập tên người dùng"
                                />
                            </div>
                            {errors.username && (
                                <span className={styles.error}>
                                    {errors.username}
                                </span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email</label>
                            <div className={styles.inputWrapper}>
                                <Mail className={styles.inputIcon} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`${styles.input} ${
                                        errors.email ? styles.inputError : ""
                                    }`}
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                            {errors.email && (
                                <span className={styles.error}>
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Mật khẩu</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`${styles.input} ${
                                        errors.password ? styles.inputError : ""
                                    }`}
                                    placeholder="Nhập mật khẩu"
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className={styles.error}>
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                Xác nhận mật khẩu
                            </label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} />
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`${styles.input} ${
                                        errors.confirmPassword
                                            ? styles.inputError
                                            : ""
                                    }`}
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span className={styles.error}>
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>

                        <div className={styles.formOptions}>
                            <label
                                className={`${styles.checkbox} ${styles.termsCheckbox}`}
                            >
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                />
                                <span className={styles.checkmark}></span>
                                Tôi đồng ý với{" "}
                                <Link to="/terms" className={styles.termsLink}>
                                    Điều khoản sử dụng
                                </Link>{" "}
                                và{" "}
                                <Link
                                    to="/privacy"
                                    className={styles.termsLink}
                                >
                                    Chính sách bảo mật
                                </Link>
                            </label>
                            {errors.agreeTerms && (
                                <span className={styles.error}>
                                    {errors.agreeTerms}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`${styles.submitButton} ${
                                loading ? styles.loading : ""
                            }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Đang tạo tài khoản...
                                </>
                            ) : (
                                "Đăng ký"
                            )}
                        </button>
                    </form>

                    <div className={styles.authFooter}>
                        <p>
                            Đã có tài khoản?{" "}
                            <Link to="/login" className={styles.authLink}>
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
