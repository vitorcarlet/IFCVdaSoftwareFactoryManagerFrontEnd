import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        VoidFunction: "readonly",
        RequestInit: "readonly",
        Dict: "readonly",
        RequestInfo: "readonly",
        JSX: "readonly",
        React: "readonly",
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      "eslint:recommended": pluginJs,
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      prettier: prettier,
    },

    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
          destructuredArrayIgnorePattern: "^_",
        },
      ],

      "no-console": ["warn", { allow: ["warn", "error"] }],

      "import/no-webpack-loader-syntax": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-children-prop": "off",
      "no-unused-expressions": "off",
      "no-use-before-define": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/jsx-key": "off",
      "no-undef": "warn",
      camelcase: "off",
      eqeqeq: "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-empty-function": "error",
    },
  },
];
