# 🚀 React + Vite + TypeScript + Vitest Starter

A modern and minimal React app starter powered by **Vite**, written in **TypeScript**, and preconfigured with **Tailwind CSS**, **Prettier**, **Vitest**, and useful aliases for clean project structure.

## ✨ Features

- ⚡ **Vite** – lightning-fast development environment
- 🧑‍💻 **TypeScript** – strong typing and developer tooling
- 🎨 **Tailwind CSS** – utility-first styling framework
- 🎯 **Vitest** – blazing-fast unit testing with jsdom
- 💅 **Prettier** – consistent code formatting
- 🔗 **Alias Support** – import paths using `@/` shorthand
- 🧪 **Testing Library** – built-in React testing utilities

## 📦 Getting Started

```bash
pnpm install
pnpm run dev       # Start development server
pnpm run test      # Run unit tests
pnpm run test:ui   # Open Vitest UI test runner
```

## 📁 Project Structure

```
my-app/
├── src/
│   ├── App.tsx           # Main App component
│   ├── index.css         # Main App component
│   └── main.tsx          # Entry point
├── tests/                # Global test setup and test files
│   └── setup.ts          # Vitest + Testing Library setup
├── vite.config.ts        # Vite config with alias support
├── vitest.config.ts      # Vitest configuration
├── tsconfig.json         # TypeScript configuration with path aliases
├── .prettierrc           # Prettier configuration
└── package.json
```

## 🎨 Tailwind CSS Setup

- Tailwind is fully configured and ready to use.
- Utility classes are available out of the box.
- Add styles in any component using className, like:

```tsx
<div className="p-4 bg-blue-500 text-white rounded-lg">Hello Tailwind</div>
```

- Add your project's custom design tokens in `index.css` like:

```css
@theme {
  --color-custom: #ccc;
}
```

## 🧪 Testing Setup

- Uses **Vitest** with `jsdom` for browser-like testing.
- Includes **@testing-library/react** and **@testing-library/jest-dom** for declarative testing.
- Configured with global setup in `tests/setup.ts`.

## 🔧 Custom Aliases

Import components like this:

```ts
import MyComponent from '@/components/MyComponent';
```

Configured in both `vite.config.ts` and `tsconfig.json`.

## 🧼 Code Formatting

Prettier ensures consistent code style. Format code with:

```bash
pnpm prettier --write .
```

## 📘 VSCode Tips

- Install **Vitest Snippets** extension for fast test scaffolding.
- Use format-on-save with Prettier for automatic code cleanup.
- Tailwind IntelliSense extension is highly recommended for class suggestions.

## 🛠️ Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:ui": "vitest --ui"
}
```

---

## 🪪 License

MIT
