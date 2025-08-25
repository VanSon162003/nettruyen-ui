"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.scss";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Login data:", formData);
            // Handle successful login here
        } catch (error) {
            console.error("Login error:", error);
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

                        <h1 className={styles.title}>Đăng nhập</h1>
                        <p className={styles.subtitle}>
                            Chào mừng bạn trở lại! Đăng nhập để tiếp tục đọc
                            truyện yêu thích.
                        </p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
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

                        <div className={styles.formOptions}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <span className={styles.checkmark}></span>
                                Ghi nhớ đăng nhập
                            </label>

                            <Link
                                to="/forgot-password"
                                className={styles.forgotLink}
                            >
                                Quên mật khẩu?
                            </Link>
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
                                    Đang đăng nhập...
                                </>
                            ) : (
                                "Đăng nhập"
                            )}
                        </button>
                    </form>

                    <div className={styles.authFooter}>
                        <p>
                            Chưa có tài khoản?{" "}
                            <Link to="/register" className={styles.authLink}>
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
