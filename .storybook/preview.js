import '../src/styles/globals.css';
import './storybook-overrides.css';

// Restore cursor — globals.css sets cursor:none for the portfolio's custom cursor,
// which isn't rendered in Storybook.
if (typeof document !== 'undefined' && !document.getElementById('sb-cursor-fix')) {
  const s = document.createElement('style');
  s.id = 'sb-cursor-fix';
  s.textContent = 'html, a, button, [role="button"] { cursor: auto !important; }';
  document.head.appendChild(s);
}

// ─── Theme toolbar ────────────────────────────────────────────────────────────
// A dedicated globalType is the officially recommended way to sync a CSS-class
// based dark mode with Storybook. It gives a reliable sun/moon toggle that
// re-renders the decorator on every change — unlike the backgrounds switcher.
export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun',  title: 'Light' },
        { value: 'dark',  icon: 'moon', title: 'Dark'  },
      ],
      dynamicTitle: true,
    },
  },
};

const withThemeClass = (StoryFn, context) => {
  const isDark = (context.globals.theme ?? 'light') === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  return StoryFn();
};

// ─── Preview config ───────────────────────────────────────────────────────────
/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [withThemeClass],
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Design System', ['Tokens', 'Typography', 'Logo', 'Layout'], 'UI', 'Layout', ['Container', 'Navbar', 'Footer'], '*'],
      },
    },
    docs: {
      autodocs: 'tag',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile  — 375px',  styles: { width: '375px',  height: '812px'  } },
        sm:     { name: 'sm      — 640px',  styles: { width: '640px',  height: '900px'  } },
        md:     { name: 'md      — 768px',  styles: { width: '768px',  height: '1024px' } },
        lg:     { name: 'lg      — 1024px', styles: { width: '1024px', height: '768px'  } },
        xl:     { name: 'xl      — 1280px', styles: { width: '1280px', height: '900px'  } },
        full:   { name: 'Full    — 1440px', styles: { width: '1440px', height: '900px'  } },
      },
      defaultViewport: 'responsive',
    },
  },
};

export default preview;
