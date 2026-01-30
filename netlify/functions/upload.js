// netlify/functions/upload.js
exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    let data;
    try {
      data = JSON.parse(event.body);
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: "O corpo da requisição não é um JSON válido." }) };
    }

    const PINATA_JWT = process.env.PINATA_JWT;

    if (!PINATA_JWT) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "A chave PINATA_JWT não foi configurada no Netlify." }) 
      };
    }

    // Tenta enviar para o Pinata
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify(data),
    });

    // Se o Pinata recusar (Erro 4xx ou 5xx)
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro do Pinata:", errorText);
        
        // Tenta ler se o erro é um JSON ou Texto puro
        try {
            const errorObj = JSON.parse(errorText);
            return { statusCode: response.status, body: JSON.stringify({ error: errorObj }) };
        } catch {
            return { statusCode: response.status, body: JSON.stringify({ error: errorText }) };
        }
    }

    // Sucesso!
    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };

  } catch (error) {
    console.error("Erro Interno:", error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message || "Erro desconhecido no servidor." }) 
    };
  }
};