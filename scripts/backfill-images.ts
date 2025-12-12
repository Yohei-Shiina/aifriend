// scripts/backfill-images.ts
import { PrismaClient } from '@/lib/prisma';
const prisma = new PrismaClient()

// 例: https://res.cloudinary.com/<cloud>/image/upload/v1700/folder/name.jpg
function extractPublicId(secureUrl: string): string | null {
  try {
    const u = new URL(secureUrl)
    let rest = u.pathname.split('/image/upload/')[1] || ''
    // 変換指定 or バージョン v123... をスキップ
    rest = rest.replace(/^(?:[^/]*\/)*v\d+\//, '')
    // 拡張子除去
    rest = rest.replace(/\.[^.\/]+$/, '')
    return rest.replace(/^\/+/, '')
  } catch { return null }
}

async function main() {
  // image_url からバックフィル（空は除外）
  const articles = await prisma.article.findMany({
    where: { image_url: { not: '' } },
    select: { id: true, image_url: true }
  })

  for (const a of articles) {
    const secureUrl = a.image_url!
    if (!/res\.cloudinary\.com/.test(secureUrl)) {
      console.warn('Skip non-Cloudinary URL:', secureUrl)
      continue
    }
    const publicId = extractPublicId(secureUrl)
    if (!publicId) {
      console.warn('Cannot parse public_id:', secureUrl)
      continue
    }

    // public_id をユニークにして重複を防ぐ
    const img = await prisma.image.upsert({
      where: { public_id: publicId },
      update: {},
      create: { secure_url: secureUrl, public_id: publicId },
    })

    // Article に紐づけ
    await prisma.article.update({
      where: { id: a.id },
      data: { image_id: img.id }, // ← Article に imageId がある想定
    })
  }
  console.log('Backfill done.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
