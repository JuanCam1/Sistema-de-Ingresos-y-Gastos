import { NextApiRequest, NextApiResponse } from "next";

export default function docsHandler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Prueba Técnica API - Swagger UI</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui.css">
        <style>
          html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }
          body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            SwaggerUIBundle({
              url: '/api/swagger.json',
              dom_id: '#swagger-ui',
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
              ],
              layout: 'BaseLayout',
              deepLinking: true,
              queryConfigEnabled: true
            });
          };
        </script>
      </body>
    </html>
  `);
}
