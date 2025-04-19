import { NextRequest } from "next/server";
import http from "http";
import net from "net";
import tls from "tls";
import { URL } from "url";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required as query param" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let targetUrl: URL;
    try {
      targetUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch (err) {
      return new Response(JSON.stringify({ error: `Invalid URL provided ${err}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hostname = targetUrl.hostname;
    const port = targetUrl.port || (targetUrl.protocol === "https:" ? "443" : "80");
    const isHttps = targetUrl.protocol === "https:";

    // Extract client IP or fallback
    const clientIp =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for") ||
      "127.0.0.1";


      console.log('Setting headers:', {
        'X-Proxy-Response': 'true',
        'X-Forwarded-For': clientIp,
        'X-Masked-IP': clientIp
      });

    // ---- HTTPS via CONNECT ---- //
    if (isHttps) {
      return await new Promise<Response>((resolve) => {
        const proxySocket = net.connect(1080, "127.0.0.1", () => {
          const connectRequest =
            `CONNECT ${hostname}:${port} HTTP/1.1\r\n` +
            `Host: ${hostname}:${port}\r\n` +
            `User-Agent: curl/8.10.1\r\n` +
            `Proxy-Connection: Keep-Alive\r\n` +
            `Authorization: ${process.env.PROXY_SECRET_KEY || "Bearer secret"}\r\n\r\n`;

          proxySocket.write(connectRequest);
        });

        proxySocket.setTimeout(10000);

        proxySocket.once("error", (err) => {
          return resolve(
            new Response(JSON.stringify({ error: "Proxy connection error", message: err.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            })
          );
        });

        proxySocket.once("timeout", () => {
          proxySocket.destroy();
          return resolve(
            new Response(JSON.stringify({ error: "Proxy timed out" }), {
              status: 504,
              headers: { "Content-Type": "application/json" },
            })
          );
        });

        let responseBuffer = Buffer.alloc(0);

        proxySocket.on("data", (chunk) => {
          responseBuffer = Buffer.concat([responseBuffer, chunk]);

          if (responseBuffer.includes(Buffer.from("\r\n\r\n"))) {
            const responseText = responseBuffer.toString("utf8");
            const [statusLine] = responseText.split("\r\n");
            if (!statusLine.includes("200")) {
              proxySocket.destroy();
              return resolve(
                new Response(JSON.stringify({ error: "CONNECT failed", message: statusLine }), {
                  status: 502,
                  headers: { "Content-Type": "application/json" },
                })
              );
            }

            // Tunnel is established. Proceed with TLS.
            const tlsSocket = tls.connect(
              {
                socket: proxySocket,
                servername: hostname,
                rejectUnauthorized: false,
              },
              () => {
                const request =
                  `GET ${targetUrl.pathname}${targetUrl.search} HTTP/1.1\r\n` +
                  `Host: ${hostname}\r\n` +
                  `User-Agent: curl/8.10.1\r\n` +
                  `Connection: close\r\n` +
                  `X-Forwarded-For: ${clientIp}\r\n` +
                  `X-Masked-IP: ${clientIp}\r\n\r\n`;

                tlsSocket.write(request);
              }
            );

            const chunks: Buffer[] = [];

            tlsSocket.on("data", (chunk) => chunks.push(chunk));
            tlsSocket.on("end", () => {
              const fullResponse = Buffer.concat(chunks);
              const separator = fullResponse.indexOf(Buffer.from("\r\n\r\n"));
              const rawHeaders = fullResponse.slice(0, separator).toString();
              const body = fullResponse.slice(separator + 4);

              const headers = new Headers();
              rawHeaders.split("\r\n").forEach((line) => {
                const [key, ...rest] = line.split(": ");
                if (key && rest.length) {
                  headers.set(key, rest.join(": "));
                }
              });
              headers.set("X-Proxy-Response", "true");
              headers.set("X-Forwarded-For", clientIp);
              headers.set("X-Masked-IP", clientIp);     

              const statusMatch = rawHeaders.match(/HTTP\/1\.[01] (\d+)/);
              const statusCode = statusMatch ? parseInt(statusMatch[1]) : 200;

              resolve(
                new Response(body, {
                  status: statusCode,
                  headers,
                })
              );
            });
          }
        });
      });
    }

    // ---- HTTP Fallback (no CONNECT needed) ---- //
    return await new Promise<Response>((resolve) => {
      const proxyRequest = http.request(
        {
          hostname: "127.0.0.1",
          port: 1080,
          method: "GET",
          path: targetUrl.toString(),
          headers: {
            Host: `${hostname}:${port}`,
            "User-Agent": "curl/8.10.1",
            "Proxy-Connection": "Keep-Alive",
            Authorization: process.env.PROXY_SECRET_KEY || "Bearer secret",
            "X-Forwarded-For": clientIp,
            "X-Masked-IP": clientIp,
          },
          timeout: 10000,
        },
        (proxyResponse) => {
          const chunks: Buffer[] = [];

          proxyResponse.on("data", (chunk) => {
            chunks.push(Buffer.from(chunk));
          });

          proxyResponse.on("end", () => {
            const responseBody = Buffer.concat(chunks);
            const responseHeaders = new Headers();

            Object.entries(proxyResponse.headers).forEach(([key, value]) => {
              if (value) {
                responseHeaders.set(key, Array.isArray(value) ? value.join(", ") : value);
              }
            });

            responseHeaders.set("X-Proxy-Response", "true");
            responseHeaders.set("X-Forwarded-For", clientIp);
            responseHeaders.set("X-Masked-IP", clientIp);

            resolve(
              new Response(responseBody, {
                status: proxyResponse.statusCode || 500,
                headers: responseHeaders,
              })
            );
          });
        }
      );

      proxyRequest.on("error", (err) => {
        resolve(
          new Response(JSON.stringify({ error: "Proxy error", message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      });

      proxyRequest.on("timeout", () => {
        proxyRequest.destroy();
        resolve(
          new Response(JSON.stringify({ error: "Proxy timed out" }), {
            status: 504,
            headers: { "Content-Type": "application/json" },
          })
        );
      });

      proxyRequest.end();
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
