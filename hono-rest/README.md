# hono
## hono-rest

### プロジェクト作成
```zsh
npm create cloudflare
Need to install the following packages:
create-cloudflare@2.50.4
Ok to proceed? (y) y


> npx
> create-cloudflare


──────────────────────────────────────────────────────────────────────────────────────────────────────────
👋 Welcome to create-cloudflare v2.50.4!
🧡 Let's get started.
📊 Cloudflare collects telemetry about your usage of Create-Cloudflare.

Learn more at: https://github.com/cloudflare/workers-sdk/blob/main/packages/create-cloudflare/telemetry.md
──────────────────────────────────────────────────────────────────────────────────────────────────────────

╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./hono-rest
│
├ What would you like to start with?
│ category Hello World example
│
├ Which template would you like to use?
│ type Worker only
│
├ Which language do you want to use?
│ lang TypeScript
│
├ Copying template files
│ files copied to project directory
│
├ Updating name in `package.json`
│ updated `package.json`
│
├ Installing dependencies
│ installed via `npm install`
│
╰ Application created

╭ Configuring your application for Cloudflare Step 2 of 3
│
├ Installing wrangler A command line tool for building Cloudflare Workers
│ installed via `npm install wrangler --save-dev`
│
├ Retrieving current workerd compatibility date
│ compatibility date 2025-07-19
│
├ Generating types for your application
│ generated to `./worker-configuration.d.ts` via `npm run cf-typegen`
│
├ You're in an existing git repository. Do you want to use git for version control?
│ yes git
│
╰ Application configured

╭ Deploy with Cloudflare Step 3 of 3
│
├ Do you want to deploy your application?
│ no deploy via `npm run deploy`
│
╰ Done

────────────────────────────────────────────────────────────
🎉  SUCCESS  Application created successfully!

💻 Continue Developing
Change directories: cd hono-rest
Start dev server: npm run start
Deploy: npm run deploy

📖 Explore Documentation
https://developers.cloudflare.com/workers

🐛 Report an Issue
https://github.com/cloudflare/workers-sdk/issues/new/choose

💬 Join our Community
https://discord.cloudflare.com
────────────────────────────────────────────────────────────
```

### DB作成
```zsh
npx wrangler d1 create hono-rest

 ⛅️ wrangler 4.25.0
───────────────────
✅ Successfully created DB 'hono-rest' in region APAC
Created your new D1 database.

{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "hono-rest",
      "database_id": "585a079c-3a1b-4e87-8fcc-6903a7cf1baa"
    }
  ]
}
```

### テーブルの作成
```zsh
npx wrangler d1 execute hono-rest --local --file=./schema.sql

 ⛅️ wrangler 4.25.0
───────────────────
🌀 Executing on local database hono-rest (585a079c-3a1b-4e87-8fcc-6903a7cf1baa) from .wrangler/state/v3/d1:
🌀 To execute on your remote database, add a --remote flag to your wrangler command.
🚣 3 commands executed successfully.
```

### テーブル参照
```zsh
npx wrangler d1 execute hono-rest --local --command='SELECT * from TODOS'

 ⛅️ wrangler 4.25.0
───────────────────
🌀 Executing on local database hono-rest (585a079c-3a1b-4e87-8fcc-6903a7cf1baa) from .wrangler/state/v3/d1:
🌀 To execute on your remote database, add a --remote flag to your wrangler command.
🚣 1 command executed successfully.
┌────┬─────────┬───────────────┐
│ id │ title   │ content       │
├────┼─────────┼───────────────┤
│ 1  │ タスク1 │ タスク1です。 │
├────┼─────────┼───────────────┤
│ 2  │ タスク2 │ タスク2です。 │
├────┼─────────┼───────────────┤
│ 3  │ タスク3 │ タスク3です。 │
└────┴─────────┴───────────────┘

```

### CloudFlareのDBへクエリ実行
```zsh
npx wrangler d1 execute hono-rest --remote --file=./schema.sql
```

### デプロイの実行
```zsh
npm run deploy
```
