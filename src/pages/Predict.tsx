// src/pages/Predict.tsx

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { mcpApi } from "../lib/mcpAPI";
import { useAuth } from "../contexts/AuthContext";

const Predict: React.FC = () => {
  const { state } = useAuth();
  const [form, setForm] = useState({
    service_id: "svc-01",
    metric_name: "cpu_usage",
    timestamp: new Date().toISOString(),
    service_type: "web",
    runtime_env: "prod",
    time_slot: "peak",
    weight: 1.0,
    expected_users: 100,
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        service_id: form.service_id,
        metric_name: form.metric_name,
        context: {
          context_id: uuidv4(),
          timestamp: form.timestamp,
          service_type: form.service_type,
          runtime_env: form.runtime_env,
          time_slot: form.time_slot,
          weight: parseFloat(form.weight.toString()),
          expected_users: parseInt(form.expected_users.toString(), 10),
        },
      };
      const res = await mcpApi.predictWithContext(payload, state.token!);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Prediction failed");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">컨텍스트 기반 예측</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="service_id" value={form.service_id} onChange={handleChange} placeholder="Service ID" className="w-full border px-3 py-2 rounded" />
        <input name="metric_name" value={form.metric_name} onChange={handleChange} placeholder="Metric Name" className="w-full border px-3 py-2 rounded" />
        <input name="timestamp" type="datetime-local" value={form.timestamp.slice(0,16)} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <select name="service_type" value={form.service_type} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="web">web</option>
          <option value="api">api</option>
          <option value="db">db</option>
        </select>
        <select name="runtime_env" value={form.runtime_env} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="dev">dev</option>
          <option value="prod">prod</option>
        </select>
        <select name="time_slot" value={form.time_slot} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="peak">peak</option>
          <option value="normal">normal</option>
          <option value="low">low</option>
          <option value="weekend">weekend</option>
        </select>
        <input name="weight" type="number" step="0.1" value={form.weight} onChange={handleChange} placeholder="Weight" className="w-full border px-3 py-2 rounded" />
        <input name="expected_users" type="number" value={form.expected_users} onChange={handleChange} placeholder="예상 사용자 수" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">예측 실행</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <pre className="bg-gray-100 mt-4 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Predict;
