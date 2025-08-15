module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['@nuxt/eslint-config', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
