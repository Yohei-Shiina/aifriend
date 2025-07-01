"use client";

import React, { useState } from "react";

export default function AdminPage() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: text }),
    });
    const data = await res.json();
    console.log(data);

    setResponse(data.result || JSON.stringify(data));
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="type "
        />
        <button type="submit" style={{ width: "100%" }}>
          送信
        </button>
      </form>
      {response && (
        <div style={{ marginTop: 16, background: "#f0f0f0", padding: 8 }}>
          <strong>レスポンス:</strong>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}
