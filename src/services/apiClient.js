

export async function login(userInfo) {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password
      })
    })

    const data = await response.json()

    return data
  }

  catch (error) {
    return {
      onSuccess: false,
      message: "Não foi possível conectar ao servidor. Tente novamente.",
    };
  }
}

export async function registerUser(userInfo) {
  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        phoneNumber: userInfo.phone_number,
        whatsappPhoneNumber: userInfo.whatsapp_phone_number,
        delivery_zone: userInfo.delivery_zone,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        onSuccess: false,
        message: data?.message || "Não foi possível concluir o cadastro.",
      };
    }

    return data;
  } catch (error) {
    return {
      onSuccess: false,
      message: "Não foi possível conectar ao servidor. Tente novamente.",
    };
  }
}

export async function getDeliveryZones() {
  const response = await fetch("http://localhost:3000/api/users/delivery_zones");
  if (!response.ok) {
    throw new Error("Failed to fetch delivery zones");
  }

  const data = await response.json();
  return data.data;
}

export async function getUserInfo() {

  const token = localStorage.getItem("token")

  const response = await fetch("http://localhost:3000/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  return data
}