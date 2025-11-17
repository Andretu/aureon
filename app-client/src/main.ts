const btn = document.getElementById('ping');
const out = document.getElementById('out');
btn?.addEventListener('click', async () => {
  out!.textContent = 'Contacting backend...';
  try {
    const res = await fetch('http://localhost:4000/api/hello');
    const data = await res.json();
    out!.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    out!.textContent = 'Error: ' + err;
  }
});
