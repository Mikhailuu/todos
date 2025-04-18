import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/node_modules", "**/dist", "**/build"]), {
    extends: fixupConfigRules(compat.extends(
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    )),

    plugins: {
        react: fixupPluginRules(react),
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "src/"],
            },
        },
    },

    rules: {
        indent: ["error", 2],
        "prettier/prettier": "error",
        "linebreak-style": [0, "unix"],
        quotes: ["error", "single"],
        semi: ["error", "never"],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": 0,

        "import/no-unresolved": [2, {
            caseSensitive: false,
        }],

        "react/jsx-filename-extension": [1, {
            extensions: [".js", ".jsx"],
        }],

        "import/order": [2, {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            "newlines-between": "always",
        }],
        "prettier/prettier": "error"
    },
}]);