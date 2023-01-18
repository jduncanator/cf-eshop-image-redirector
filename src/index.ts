import { Hono } from 'hono'

export interface Bindings {
    KV_ESHOP_ICON_MAPPING: KVNamespace
}

const router = new Hono<{ Bindings: Bindings }>();

router.get('/titleid/:id', async c => {
    const { id } = c.req.param();
    const { placeholder } = c.req.query();

    const id_upper = id.toUpperCase();
    const kv_result = await c.env.KV_ESHOP_ICON_MAPPING.get(id_upper, {
        type: 'text',
        cacheTtl: 3600 // 1 hour
    });

    // We don't have an icon entry for that title ID
    if(kv_result === null) {
        // If we have a specified placeholder image,
        // we redirect to that
        if(placeholder) {
            return c.redirect(placeholder);
        }

        // Otherwise we return a 404 error
        return c.notFound();
    }

    // If we found an entry, we redirect the user to that URL.
    return c.redirect(kv_result);
});

export default router;