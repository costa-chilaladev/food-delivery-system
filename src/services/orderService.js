export async function getDeliveryZones() {
  const response = await fetch("http://localhost:3000/api/users/delivery_zones");
  if (!response.ok) {
    throw new Error("Failed to fetch delivery zones");
  }

  const data = await response.json();
  return data.data;
}