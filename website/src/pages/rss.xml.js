import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const blog = (await getCollection('blog')).filter((post) => post.data.pubDate <= new Date());
    return rss({
        title: 'TimeHopper Blog',
        description: 'Effortless Time Zone Management for Distributed Teams',
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
        })),
    });
}
