"use client";

import React, { useState } from "react";

export default function AdminClient() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") {
      alert("Please enter some text.");
      return;
    }
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: text }),
    });
    const data = await res.json();
    setResponse(data.result || JSON.stringify(data));
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    location.href = "/login"; // ログアウト後に再読み込みして再判定
  };

  return (
    <>
      <form className="m-10 mb-2 flex flex-col gap-2" onSubmit={handleSubmit}>
        <textarea
          className="border-2 border-gray-300 p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="write instruction to create a new article"
        />
        <button className="min-w-30 m-auto btn btn-primary" type="submit">
          Send
        </button>
      </form>

      <div className="m-10 mt-2 flex flex-col">
        {response && (
          <div>
            <strong>レスポンス:</strong>
            <pre>{response}</pre>
          </div>
        )}
        <button className="min-w-30 m-auto btn btn-accent" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
