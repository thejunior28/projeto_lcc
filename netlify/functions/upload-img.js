// netlify/functions/upload-img.js
export const handler = async (event) => {
  // 1. Proteção (apenas POST)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { imageBase64, name } = JSON.parse(event.body);
    const PINATA_JWT = process.env.PINATA_JWT; // Pega do ambiente do Netlify

    if (!imageBase64 || !PINATA_JWT) {
      throw new Error("Imagem ou Chave Pinata faltando.");
    }

    // 2. Converte Base64 para Blob (necessário para o Pinata)
    // Remove o cabeçalho "data:image/png;base64," para pegar só os dados
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    
    // Cria o FormData manualmente (limitação do ambiente serverless sem bibliotecas extras)
    const boundary = "----WebKitFormBoundary" + Math.random().toString(16);
    let body = `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="file"; filename="${name}"\r\n`;
    body += `Content-Type: image/png\r\n\r\n`; // Assume PNG/JPG
    
    // Combina o cabeçalho e o buffer da imagem
    const payload = Buffer.concat([
      Buffer.from(body, "utf-8"),
      buffer,
      Buffer.from(`\r\n--${boundary}--`, "utf-8"),
    ]);

    // 3. Envia para o Pinata
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Erro Pinata: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};