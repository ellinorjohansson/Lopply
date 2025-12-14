import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Prevent unused variables while ignoring intentional `_` placeholders
      eqeqeq: "error", // Enforce strict equality checks (=== and !==)
      curly: "error", // Require braces for all control structures for clarity
      "default-case": "error", // Ensure switch statements have a default case to handle unexpected values
      "no-implicit-globals": "error", // Prevent global variable declarations to avoid conflicts
      "no-var": "error", // Enforce `let` or `const` instead of `var` for block scoping
      "prefer-const": "error", // Prefer `const` for variables that are not reassigned
      "no-lone-blocks": "error", // Disallow unnecessary nested blocks
      "no-multi-spaces": "error", // Disallow multiple spaces for cleaner formatting
      semi: ["error", "always"], // Enforce semicolons at the end of statements
      quotes: ["error", "double", { avoidEscape: true }], // Use single quotes unless escaping
      camelcase: ["error", { properties: "never" }], // Enforce camelCase for variable and function names
      "keyword-spacing": ["error", { before: true, after: true }], // Enforce consistent spacing before/after keywords
    },
  },

  eslintConfigPrettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
