// @ts-check
// Docusaurus site configuration

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open CMS',
  tagline: 'Enterprise Card Management System',
  favicon: 'img/favicon.png',

  // 🔹 GitHub Pages base config for repo: uneebae/opencms-api-docs
  url: 'https://uneebae.github.io',      // GitHub Pages main URL
  baseUrl: '/opencms-api-docs/',         // REPO name with / at both ends

  organizationName: 'uneebae',           // GitHub username
  projectName: 'opencms-api-docs',       // Repo name
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
          editUrl:
            'https://github.com/uneebae/opencms-api-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  // ⭐ Scalar plugin – API Specifications page
  plugins: [
    [
      '@scalar/docusaurus',
      {
        id: 'openCMS',
        label: 'API Specifications',
        route: '/api-specifications',
        showNavLink: false, // navbar manually set below

        configuration: {
          // ❗ IMPORTANT: no leading slash
          // static/openapi/OpenCMS-3.3.yml   ->  /opencms-api-docs/openapi/OpenCMS-3.3.yml
          url: 'openapi/OpenCMS-3.3.yml',

          layout: 'modern',
          theme: 'default',
          darkMode: true,

          // basic clean UX
          defaultOpenAllTags: false,
          hideModels: false,
          hideTestRequestButton: false,
          hideSearch: false,
          hideDarkModeToggle: false,

          customCss: '',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/OpenCMS.png',

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
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
          label: 'Overview',
        },
        {
          // Scalar API UI
          to: '/api-specifications',
          position: 'left',
          label: 'API Specifications',
        },
        {
          type: 'doc',
          docId: 'backOffice',
          position: 'left',
          label: 'Back Office',
        },
        {
          href: 'https://github.com/uneebae/opencms-api-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs'},
            {label: 'API Reference', to: '/api-specifications'},
            {label: 'Developer Workflow', to: '/docs/developerWorkflow'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Back Office', to: '/docs/backOffice'},
            {label: 'Data Types', to: '/docs/dataTypeRef'},
            {label: 'Response Codes', to: '/docs/response'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Privacy Policy', href: 'https://paysyslabs.com/privacy'},
            {label: 'Terms of Service', href: 'https://paysyslabs.com/terms'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paysys Labs. All rights reserved.`,
    },

    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;

