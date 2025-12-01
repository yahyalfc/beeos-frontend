import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js core configs
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:security/recommended-legacy",
    "plugin:sonarjs/recommended-legacy"
  ),

  // Import plugin configuration
  ...compat.plugins("import"),

  {
    // Parser options for TypeScript
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // Custom rules
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

      // React specific rules
      "react/prop-types": "off", // TypeScript handles this
      "react/react-in-jsx-scope": "off", // Next.js handles this
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "never",
        },
      ],
      "react/self-closing-comp": "error",
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: ["function-declaration", "arrow-function"],
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-pascal-case": "error",
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],
      "react/no-array-index-key": "warn",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      // Import/Export rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
        },
      ],
      "import/no-duplicates": "error",
      "import/no-cycle": "off",
      "import/no-self-import": "error",
      "import/no-relative-packages": "error",
      "import/no-relative-parent-imports": "off", // Can be enabled based on project structure
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/no-anonymous-default-export": [
        "error",
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: true, // For React.memo, etc.
          allowLiteral: false,
          allowObject: false,
        },
      ],

      // General code quality rules
      "no-console": [
        "warn",
        {
          allow: ["warn", "error", "info"],
        },
      ],
      "no-debugger": "error",
      "no-alert": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "WithStatement",
          message: "With statements are not allowed.",
        },
        {
          selector: "ForInStatement",
          message:
            "for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries} instead.",
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "prefer-destructuring": [
        "error",
        {
          array: true,
          object: true,
        },
      ],
      "no-nested-ternary": "error",
      "max-depth": ["error", 3],
      "max-lines": [
        "warn",
        {
          max: 1500,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-lines-per-function": [
        "warn",
        {
          max: 1000,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      complexity: ["warn", 450],

      // Accessibility rules
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],

      // Security rules (via eslint-plugin-security)
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",

      // Code cleanliness (via eslint-plugin-sonarjs)
      "sonarjs/cognitive-complexity": ["error", 25],
      "sonarjs/no-duplicate-string": ["error", { threshold: 3 }],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/no-nested-functions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/interactive-supports-focus": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",

      // Performance considerations
      "react/jsx-no-bind": [
        "warn",
        {
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
        },
      ],
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  },

  // Overrides for specific file patterns
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "max-lines-per-function": "off",
      "max-lines": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  {
    files: ["next.config.js", "tailwind.config.js", "postcss.config.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
  // Next.js App Router specific overrides
  {
    files: [
      "**/app/**/page.tsx",
      "**/app/**/page.ts",
      "**/app/**/layout.tsx",
      "**/app/**/layout.ts",
      "**/app/**/loading.tsx",
      "**/app/**/loading.ts",
      "**/app/**/error.tsx",
      "**/app/**/error.ts",
      "**/app/**/not-found.tsx",
      "**/app/**/not-found.ts",
      "**/app/**/template.tsx",
      "**/app/**/template.ts",
      "**/app/**/default.tsx",
      "**/app/**/default.ts",
      "**/app/**/route.ts",
      "**/app/**/route.tsx",
      "**/app/**/opengraph-image.tsx",
      "**/app/**/twitter-image.tsx",
      "**/app/**/icon.tsx",
      "**/app/**/apple-icon.tsx",
      "**/app/**/sitemap.ts",
      "**/app/**/sitemap.tsx",
      "**/app/**/robots.ts",
      "**/app/**/robots.tsx",
    ],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "import/no-anonymous-default-export": "off",
      "max-lines-per-function": "off", // Page components can be longer
    },
  },
  // Next.js Pages Router specific overrides (if using pages directory)
  {
    files: [
      "**/pages/**/*.tsx",
      "**/pages/**/*.ts",
      "**/pages/api/**/*.ts",
      "**/pages/api/**/*.tsx",
    ],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "import/no-anonymous-default-export": "off",
      "max-lines-per-function": "off",
    },
  },
];

export default eslintConfig;
