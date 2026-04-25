async function test() {
  try {
    const res = await fetch('http://localhost:1337/api/products');
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.log('Fetch Error:', err.message);
  }
}

test();
