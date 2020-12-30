/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import Link from "next/link";
import React from "react";

const IndexPage = (props) => {
  const [word, setWord] = React.useState("");
  const [meaning, setMeaning] = React.useState("");

  const handleSubmit = React.useCallback(async () => {
    const body = {
      content: { word, meaning },
    };

    const res = await fetch("http://localhost:3000/api/word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const word = await res.json();
    }
  }, [word, meaning]);

  const disabled = React.useMemo(
    () => word.length === 0 || meaning.length === 0,
    [word, meaning]
  );

  return (
    <div sx={{ height: `calc(100vh - 60px)` }}>
      <div
        sx={{
          variant: "containers.page",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        単語：
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        意味：
        <input
          type="text"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={disabled}>
          登録
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
