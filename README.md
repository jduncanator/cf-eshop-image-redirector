# eShop Title ID Redirection Service

This repository implements a basic redirection service built on top of Cloudflare Workers KV.

A lookup is performed with the game Title ID as the key, and if an entry is found returns a redirect to the game icon image hosted on eShop CDN servers.

An optional `placeholder` query parameter is available, which can contain a URL to a fallback image in the case that a Title ID cannot be found in the KV namespace. If a `placeholder` is not provided, the service returns a 404 response.

### KV data format

Data is stored in Workers KV as key-value pairs. The eShop redirection service expects the key to be the uppercased Title ID, and the value to be the fully qualified absolute URL to the icon image for that title.

> 📘 **Note**
> 
> The redirection service does not _have_ to redirect to the icon image data, it supports redirecting to any URL placed in the value field, however the service was originally designed to support mapping Title IDs to image icons for use with Ryujinx.

---

## Hosted instance

A hosted instance of this Worker that provides redirection from Title IDs to game icon images is available at https://img-eshop.ryujinx.dev. The KV data is populated from US and JP eShop data using a (currently) proprietary script, updated weekly.

The US and JP regions should cover 99% of titles released on the Switch, however if you'd like to support Title IDs from other regions you'll need to source that data and self-host the Worker service.

## Self-Hosting

1. Copy `wrangler.example.toml` to `wrangler.toml`.
2. After installing `wrangler` (v2) for Cloudflare Workers, run `wrangler config` to configure your account.
3. Create the two KV bindings for Production and Development
    1. Run `wrangler kv:namespace create KV_ESHOP_ICON_MAPPING`. Update your `wrangler.toml` file with the newly created binding ID, populating the `id` value.
    2. Run `wrangler kv:namespace create KV_ESHOP_ICON_MAPPING --preview`. Update your `wrangler.toml` file with the newly created binding ID, populating the `preview_id` value.
4. You can now run or deploy the Worker with `wrangler dev` or `wrangler publish` respectively.

You will need to populate your newly created KV namespaces with data.