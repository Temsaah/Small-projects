async function fetchData() {
  const data = await fetch("data.json");
  const res = await data.json();

  console.log(res);
}

fetchData();
