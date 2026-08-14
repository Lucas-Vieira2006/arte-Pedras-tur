import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Rebaixado pra warning: a regra sinaliza o padrão "checar auth/buscar dado
      // uma vez ao montar o componente" (useEffect(() => { setEstado(...) }, []))
      // como erro, mas esse é o padrão idiomático usado em AuthContext.jsx e
      // Admin.jsx pra inicialização — não uma cascata de renders real.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
