import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import globalStylesUrl from './styles/global.css'
import cssResetUrl from './styles/reset.css'
import fontsUrl from './styles/font.css'

import favIconUrl from '../public/favicon.ico';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "aplusk.dev | Home",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  { rel: 'stylesheet', href: fontsUrl },
  { rel: 'stylesheet', href: cssResetUrl },
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'icon', href: favIconUrl }
]

export async function loader() {
  return json({
    ENV: {
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en" data-theme="light">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
