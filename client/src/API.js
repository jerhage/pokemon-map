const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
  const res = await fetch(`${API_URL}/api/logs`);
  return res.json();
}

export async function postLogEntry(entry) {
  const res = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return res.json();
}
