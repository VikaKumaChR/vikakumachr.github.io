# Hero backdrop

- Asset: `hero-lace-expanded.png` (1774 × 887).
- Input: user-provided `底素分享💜🩷🩵💛_1_兜有米_来自小红书网页版.jpg` (1080 × 1080).
- Method: built-in imagegen edit/outpaint, 2026-09-17. The original reference was not modified.
- The round medallion center is approximately (50%, 48.5%) of the expanded image. The homepage anchors this point to the rendered character center using ResizeObserver, preserving the image's proportions.
- Desktop width is based only on character height (2.35×), not viewport coverage. A CSS radial mask blends the small character frame into a separate subtle page pattern. This prevents ultrawide screens from enlarging the circle.
- Imagegen output dimensions were 1774 × 887, rather than the approximate requested dimensions below.

## Final prompt

Edit target: the supplied 1080x1080 pastel lavender scrapbook texture. Create a high-resolution landscape outpaint, approximately 3072x1536 (2:1 aspect ratio), for a personal character blog hero background. Preserve the supplied visual language faithfully: very pale lavender and white argyle diamonds, tiny white hearts and stars, delicate scalloped white lace at the top and bottom. Keep ONE large perfectly round white lace medallion with its pale lilac bow and two hanging round ornaments. The circle center must remain at exactly 50% of canvas width and 50% of canvas height; the full circle plus bow should occupy roughly 76% of the canvas HEIGHT. Extend the argyle/hearts/stars background naturally to both left and right, adding coherent pattern detail rather than stretching the square. Preserve crisp fine lace and a very light palette near #c6bae0. Keep the interior of the medallion almost white, with the same sparse pale stars. This asset will be positioned in CSS so its center follows the character; do NOT add any character, person, portrait, text, logo, UI, border box or extra circles. Do not make a website screenshot. Output only the expanded decorative background bitmap.
