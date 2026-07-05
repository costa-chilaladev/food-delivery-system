import angola from "/src/data/angola.json";

export function getCities() {
  return angola;
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
        province: userInfo.province,
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
