"use client";

import React, { useState } from "react";

export default function AdminClient() {
  const [language, setLanguage] = useState("english");
  const [response, setResponse] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.result || JSON.stringify(data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Generation error:", err);
    } finally {
      setIsSent(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <form className="m-10 mb-2 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="m-auto">
          <input
            id="english"
            type="radio"
            name="language"
            value="english"
            checked={language === "english"}
            onChange={() => setLanguage("english")}
          />
          <label htmlFor="english">English</label>
        </div>
        {/* <div className="m-auto">
          <input
            id="japanese"
            type="radio"
            name="language"
            value="japanese"
            checked={language === "japanese"}
            onChange={() => setLanguage("japanese")}
          />
          <label htmlFor="japanese">Japanese</label>
        </div> */}
        <button className="min-w-30 m-auto btn btn-primary" type="submit" disabled={isSent}>
          {isSent ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && (
        <div className="m-10 mt-2 flex flex-col">
          <div className="alert alert-error">
            <span>Error: {error}</span>
          </div>
        </div>
      )}

      <div className="m-10 mt-2 flex flex-col">
        {response && (
          <div className="container mx-auto px-4">
            <strong>Response:</strong>
            <code className="text-wrap">{response}</code>
          </div>
        )}
        <button className="min-w-30 m-auto btn btn-accent" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
