// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open CMS',
  tagline: 'Enterprise Card Management System',
  favicon: 'img/favicon.png',

  url: 'https://uneebae.github.io',    // GitHub Pages main URL
  baseUrl: '/opencms-api-docs/',       // REPO NAME

  organizationName: 'uneebae',         // GitHub username
  projectName: 'opencms-api-docs',     // Repo name
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    [
      '@scalar/docusaurus',
      {
        id: 'openCMS',
        label: 'API Specifications',
        route: '/api-specifications',
        showNavLink: false,

        configuration: {
          // ❗ CRITICAL FIX → No leading slash
          url: 'openapi/OpenCMS-3.3.yml',

          layout: 'modern',
          theme: 'default',
          darkMode: true,
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      logo: {
        alt: 'Open CMS Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/api-specifications',
          position: 'left',
          label: 'API Specifications',
        },
      ],
    },

    footer: {
      style: 'dark',
    },

    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
