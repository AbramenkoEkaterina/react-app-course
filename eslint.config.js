import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';          // ← импорт плагина
import prettierConfig from 'eslint-config-prettier';    // ← отключает конфликты

export default tseslint.config(
  // Глобальные игноры (можно добавить больше)
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.js', '**/*.d.ts'],
  },

  // Базовые рекомендации JS
  js.configs.recommended,

  // TypeScript (все рекомендуемые правила)
  ...tseslint.configs.recommended,

  // React Hooks
  reactHooks.configs.flat.recommended,

  // React Refresh (для Vite)
  reactRefresh.configs.vite,

  // Отключаем правила ESLint, которые конфликтуют с Prettier
  prettierConfig,

  // Включаем Prettier как плагин ESLint
  {
    plugins: {
      prettier,
    },
    rules: {
      // Prettier как ошибка (код не соответствует Prettier → ошибка)
      'prettier/prettier': 'error',

      // Дополнительные правила (можно добавить свои)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  }
);