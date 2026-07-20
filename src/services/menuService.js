

export async function getCategories() {

  const token = localStorage.getItem("token")

  const response = await fetch("http://localhost:3000/api/shop/categories", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const responseJson = await response.json()

  return responseJson
}

export async function getProductsByCategoryId(categoryId) {
    const token = localStorage.getItem("token")

    const response = await fetch("http://localhost:3000/api/shop/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ categoryId: categoryId })
    })

    const responseJson = await response.json()

    return responseJson
}