

export async function getCategories() {

  const token = localStorage.getItem("token")

  const response = await fetch("http://localhost:3000/api/products/categories", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const responseJson = await response.json()

  return responseJson
}