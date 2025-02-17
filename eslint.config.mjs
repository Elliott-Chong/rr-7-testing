import blitzPlugin from "@blitz/eslint-plugin";
import { jsFileExtensions } from "@blitz/eslint-plugin/dist/configs/javascript.js";
import { getNamingConventionRule, tsFileExtensions } from "@blitz/eslint-plugin/dist/configs/typescript.js";

export default [
  {
<<<<<<< HEAD
    ignores: ["**/dist", "**/node_modules", "**/build", "**/+types"],
=======
    ignores: ["**", "**/dist", "**/node_modules", "**/.wrangler", "**/bolt/build"],
>>>>>>> nice
  },
  ...blitzPlugin.configs.recommended(),
  {
    rules: {
      "@blitz/catch-error-name": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-empty-object-type": "off",
<<<<<<< HEAD
      "@blitz/comment-syntax": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
=======
>>>>>>> nice
    },
  },
  {
    files: ["**/*.tsx"],
    rules: {
      ...getNamingConventionRule({}, true),
      "@typescript-eslint/naming-convention": "off",
      "@eslint/consistent-return": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    files: [...tsFileExtensions, ...jsFileExtensions, "**/*.tsx"],
    ignores: ["functions/*"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../"],
<<<<<<< HEAD
              message: `Relative imports are not allowed. Please use '@/' instead.`,
=======
              message: `Relative imports are not allowed. Please use '~/' instead.`,
>>>>>>> nice
            },
          ],
        },
      ],
    },
  },
];
