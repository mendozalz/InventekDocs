import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://github.com/mendozalz',
  integrations: [starlight({
    title: 'Documentación y Prototipos',
    logo: {
      src: './src/assets/logotipo_inventek.svg'
    },
    social: {
      github: 'https://github.com/mendozalz'
    },
    sidebar: [{
      label: '[home] Home',
      link: '/'
    },/*  {
      label: '[list] Caracteristicas',
      link: '/features/'
    }, */ {
      label: '[box] Prototipos',
      autogenerate: {
        directory: 'prototipos'
      }
    }, {
      label: '[book] Referencias',
      autogenerate: {
        directory: 'reference'
      }
    }],
    components: {
      ThemeProvider: './src/components/ThemeProvider.astro',
      ThemeSelect: './src/components/ThemeSelect.astro',
      SiteTitle: './src/components/SiteTitle.astro',
      Sidebar: './src/components/Sidebar.astro',
      Pagination: './src/components/Pagination.astro',
      Hero: './src/components/Hero.astro',
    },
    customCss: [
      '@fontsource-variable/space-grotesk/index.css',
      '@fontsource/space-mono/400.css',
      '@fontsource/space-mono/700.css',
      './src/styles/theme.css'
    ],
    expressiveCode: {
      themes: ['github-dark']
    },
    pagination: false,
    lastUpdated: false
  })],
  output: "static"
});