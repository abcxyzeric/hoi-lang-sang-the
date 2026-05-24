# Hanh Lang Sang The Worker

Worker nay phuc vu workshop HTML da dich va proxy `/api/*` ve workshop goc.

Deploy sau khi dang nhap Cloudflare:

```powershell
npx wrangler login
npx wrangler deploy
```

Sau khi deploy thanh cong, thay link trong script `Cong xuong sang tao`:

- `TARGET_ORIGIN`: URL worker moi, vi du `https://hanh-lang-sang-the.<subdomain>.workers.dev`
- `TARGET_URL`: `${TARGET_ORIGIN}/embed`
