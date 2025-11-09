// src/pages/Signup.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../lib/authAPI";
import { useAuth } from "../contexts/AuthContext";

const Signup: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    github_repo_url: "",
    primary_usage_time: "",
    expected_users: 0,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.signup(formData);
      const res = await authApi.login(formData.email, formData.password);
      login(res.access_token, formData.email);
      navigate("/predict");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="이메일" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="password" type="password" required placeholder="비밀번호" value={formData.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="github_repo_url" type="url" required placeholder="GitHub Repo URL" value={formData.github_repo_url} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="primary_usage_time" required placeholder="주 사용 시간대" value={formData.primary_usage_time} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="expected_users" type="number" required placeholder="예상 사용자 수" value={formData.expected_users} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
