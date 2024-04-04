// components/TestDbComponent.js
import React, { useEffect, useState } from "react";

function TestDbComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/test");
      const data = await response.json();
      console.log(data);
    }

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <h1>Database Connection Test</h1>
      {data ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default TestDbComponent;
