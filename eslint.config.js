import { eslint } from '@zeroqs/eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default eslint({
  stylistic: true,
  typescript: true,
  solid: true,
  plugins: [eslintPluginPrettierRecommended]
});
