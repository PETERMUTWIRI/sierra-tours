import { prisma } from '../lib/db';
async function main() {
  const posts = await prisma.post.findMany({ 
    select: { id: true, title: true, slug: true, category: true, country: true, cover: true } 
  });
  console.log('Blog posts:');
  posts.forEach(p => console.log('  -', p.title, '|', p.category, '|', p.country || 'no country', '|', p.cover ? 'has cover' : 'no cover'));
  await prisma.$disconnect();
}
main();
