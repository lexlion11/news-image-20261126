# news-image-20261126

[![news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/badge/news-image-20261126.svg)
[![rank](https://make.fun/badge/news-image-20261126/lexlion11/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/lexlion11/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)

A single-page broadsheet that sums up the world news of **Thursday 26 November 2026**
in one 1024×1024 image (`entry.png`), rendered from a fully self-contained
`page.html` with headless Chrome.

Entry for the [make.fun bounty news-image-20261126](https://make.fun/bounty/news-image-20261126).

## The day

**55 verified stories, all dated Thursday 26 November 2026**, across **10 named
regions** and **18 news sections**.

- **Trade / North America** — Washington proposes tariffs of 15–20% on 14
  economies, reviving the "overcapacity" dispute with Beijing.
- **Energy / Middle East** — the Strait of Hormuz tanker mine blasts push Brent
  to $94.61; two tankers are hit off Oman.
- **War / Middle East** — Houthi drones and missiles strike Saudi Arabia's
  Jeddah and Jizan ports in retaliation for the coalition's hit on Hodeidah.
- **Economy / Africa** — a tanker fire in Cairo's port; the Suez route closed
  again.
- **Markets / North America** — core PCE inflation prints at 3.8%, above
  forecast; the Fed's preferred gauge stays well above target.
- **Business / North America** — S&P puts Nvidia on negative credit watch over
  governance; five-year CDS sets a record.
- **Space / North America** — the FAA clears SpaceX for a one-million-satellite
  constellation.
- **Sport / Europe** — the Champions League round produces its results.

## Layout, top to bottom

- **Masthead** — a kicker line, the dateline **"Thursday 26 November 2026"** at
  the largest type on the page, and a one-line summary of the three leads.
- **Region bar** — 10 colour-coded cells with counts, each carrying one key
  number.
- **Field taxonomy bar** — 18 sections with counts: Conflict 7, Diplomacy 6,
  Economy 5, Society 5, Politics 4, Crime 4, Business 3, Energy 3, Markets 3,
  Military 3, Sport 3, Trade 2, Tech 2, Disaster 1, Humanitarian 1, Space 1,
  Media 1, Science 1.
- **THE DAY IN UTC** — timestamped stamps, each naming the event it belongs to.
- **Hero row** — the three leads, each with a drawn 3-colour scene, a stat
  callout, a confidence chip and a WHY IT MATTERS line.
- **HOW SURE legend** — the OFFICIAL / CONFIRMED / REPORTED / CLAIM key.
- **Lead band** — the other 14 lead stories as compact cards, each with its own
  confidence chip and section tag.
- **Map + IN BRIEF** — the 53-pin world map with region polygons colour-filled,
  beside the 38-story wire in regional order.
- **Footer bar** — the date repeated, with the headline counts.

## Measured

Measured on the submitted `entry.png`:

| measurement | value |
|---|---|
| ink coverage (V < 0.72, 3px grid) | **38.66%** (dark 1.94% + mid 36.71%) |
| dimensions | 1024 × 1024 |
| file size | 407,211 bytes (limit 1,048,576) |
| stories represented | 55 of 55 (17 lead + 38 brief) |
| map pins | 53 (2 stories are global and have no place) |
| region cells | 10 |
| taxonomy sections | 18 |
| elements overflowing the canvas | 0 |

## Palette

Deep and saturated rather than pastel — parchment paper, ink navy (`#162038`),
slate, oxblood (`#6b1f2e`), rust (`#b5563c`), brass (`#a8641b`), pine
(`#2f6b52`), teal (`#0f6f77`) and plum (`#5b3a70`). The region colours are
reused in three places — the region bar, the card top rules and the map fill —
so the page reads as one system.

## Running it

```sh
node main.ts                      # copies entry.png to $MAKEFUN_OUTPUT_DIR (default /output)
MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` is Node standard library only. It resolves `entry.png` relative to the
module, copies it to the output directory, then re-reads the bytes it wrote and
checks the PNG signature, the IHDR dimensions and the SHA-256 against the
source. Both runs produce identical bytes.

`page.html` is self-contained: system fonts only, no external requests, no
`<img>`, `<script src>`, `<link>` or `url()`. To re-render:

```sh
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1024,1024 --force-device-scale-factor=1 --virtual-time-budget=6000 \
  --screenshot=entry.png "file://$PWD/page.html"
```

## Sources

Every story is drawn from that day's own reporting; the outlets are named in the
image. Facts as reported, no commentary.

## License

MIT — see `LICENSE`.
