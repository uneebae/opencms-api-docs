// @ts-check
// Docusaurus site configuration

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open CMS - Paysyslabs',
  tagline: 'Seamless Fintech Integration',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  // ✅ GitHub Pages URL
  url: 'https://uneebae.github.io',

  // ✅ This MUST match repo name exactly
  baseUrl: '/opencms-api-docs/',

  // ✅ GitHub org/user and repo
  organizationName: 'uneebae',
  projectName: 'opencms-api-docs',

  // recommended
  deploymentBranch: 'gh-pages',

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
          editUrl:
            'https://github.com/uneebae/opencms-api-docs/tree/main/',
        },

        // BLOG DISABLED
        blog: true,

        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      logo: {
        alt: 'Open CMS Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },

        // ❌ FIXED BROKEN LINK
        // Old: /apispeicification (wrong + doesn’t exist)
        // New: /docs/api-spec  (you can change this later)
        {
          to: '/docs/api-spec',
          label: 'API Specification',
          position: 'left',
        },

        {
          href: 'https://github.com/uneebae/opencms-api-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      copyright: `
        Copyright © ${new Date().getFullYear()}
        © 2025 Paysys Labs. All rights reserved.
      `,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
