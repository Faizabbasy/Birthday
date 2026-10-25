import sharp from 'sharp'
import { existsSync, statSync } from 'fs'
import { join } from 'path'

const dir = 'd:/BirthDay/public/assets'
const files = ['image1.png','image2.png','image3.png','image4.png','image5.png','image6.png']

for (const f of files) {
  const src = join(dir, f)
  if (!existsSync(src)) { console.log(`SKIP: ${f} not found`); continue }
  const outName = f.replace('.png', '.jpg')
  const out = join(dir, outName)
  const before = statSync(src).size
  await sharp(src).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(out)
  const after = statSync(out).size
  const pct = Math.round((1 - after/before) * 100)
  console.log(`${f} (${(before/1024/1024).toFixed(2)}MB) -> ${outName} (${(after/1024/1024).toFixed(2)}MB) [-${pct}%]`)
}
console.log('All done!')
