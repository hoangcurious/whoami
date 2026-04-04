# CLAUDE.md — Project Context

This file is read automatically by Claude Code at session start. It documents the architecture, conventions, and current state of the **whoami** personality quiz app.

---

## Project Overview

A multi-model personality assessment web app. Users take up to 6 independent quizzes; results are stored in localStorage per model. No login required.

**Live repo**: `hoangcurious/whoami`
**Active branch**: `claude/neubrutalism-redesign-qfQhy`

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite (port 5173) |
| Backend | Node.js + Express (port 3001) |
| Serverless | Vercel functions in `api/` |
| Styling | CSS Modules |
| i18n | EN + VI via `client/src/i18n/translations.js` |
| Charts | Recharts (installed) |

Dev: `npm run dev` at repo root (concurrently starts both server + client).

---

## Architecture

### Screen-based state machine (no React Router)

`App.jsx` holds a `screen` string. Navigation = `setScreen('...')`.

Screen names:
- `'home'` — HomeScreen with all model cards
- `'bigfive'` — Big Five quiz flow
- `'bigfive_results'` — Big Five results
- `'{modelId}'` — A/B quiz flow for any AB model
- `'{modelId}_results'` — results for that model
- `'synthesis'` — consolidated synthesis report (planned)

### Model registry (`client/src/config/models.js`)

Single source of truth for all models. `App.jsx` and `HomeScreen.jsx` loop over this — adding a new model only requires a data file + result card component.

```js
export const BF_MODEL = { id: 'bigfive', storageKey: 'whoami_bf_results', questions: 100, timeMin: 15 };
export const AB_MODELS = [
  { id: 'mbti',       storageKey: 'whoami_mbti_results',       perPage: 4, questions: 32,  timeMin: 5 },
  { id: 'enneagram',  storageKey: 'whoami_enneagram_results',  perPage: 4, questions: 36,  timeMin: 7 },
  { id: 'disc',       storageKey: 'whoami_disc_results',       perPage: 4, questions: 28,  timeMin: 5 },
  { id: 'attachment', storageKey: 'whoami_attachment_results', perPage: 4, questions: 24,  timeMin: 5 },
  { id: 'lovelang',   storageKey: 'whoami_lovelang_results',   perPage: 5, questions: 30,  timeMin: 5 },
];
```

### Generic A/B quiz hook (`client/src/hooks/useModelQuiz.js`)

Replaces the old `useMbtiQuiz.js`. Accepts `(modelId, lang, perPage)`, fetches from `/api/${modelId}/questions` and posts to `/api/${modelId}/submit`.

### localStorage persistence

Each model's result stored at its `storageKey`. Shape per model:

```
bigfive    → { scores:{O,C,E,A,N}, dimensions:[{key,score(0-100),...}], summary, mbti:{type,...} }
mbti       → { mbti: { type:"INTJ", dichotomies, shortDescription, fullDescription } }
enneagram  → { enneagram: { type:5, wing:4, scores:{1..9}, title, tagline, text } }
disc       → { disc: { primary:"C", secondary:"D", scores, pcts:{D,I,S,C}, title, tagline, text } }
attachment → { attachment: { primary:"secure", scores, pcts, title, tagline, text } }
lovelang   → { loveLang: { ranked:[{lang, score, pct, title, tagline, text}, ...] } }
```

---

## Server Structure

```
server/
  index.js                  ← mounts all routers; currently: quiz, mbti, disc, attachment, loveLang, enneagram
  routes/quiz.js            ← Big Five: GET /api/quiz/questions, POST /api/quiz/submit
  routes/mbti.js
  routes/disc.js
  routes/attachment.js
  routes/loveLang.js
  routes/enneagram.js
  data/questions.js         ← 100 Big Five IPIP questions
  data/discQuestions.js     ← 28 DISC questions
  data/attachmentQuestions.js ← 24 questions
  data/loveLangQuestions.js ← 30 questions (paired-choice, 10 pairs × 3)
  data/enneagramQuestions.js ← 36 questions (4 per type × 9 types)
  lib/scoring.js            ← Big Five scoring
  lib/disc.js               ← DISC scoring + descriptions
  lib/attachment.js
  lib/loveLang.js
  lib/enneagram.js
```

### Vercel API (`api/`)

Mirrors Express routes as serverless functions:
```
api/{modelId}/questions.js  ← GET handler
api/{modelId}/submit.js     ← POST handler
```
Exists for: `quiz`, `mbti`, `disc`, `attachment`, `lovelang`, `enneagram`.

---

## Client Structure

```
client/src/
  App.jsx                   ← root; screen state machine
  config/models.js          ← model registry (BF_MODEL, AB_MODELS, ALL_MODELS)
  hooks/
    useQuiz.js              ← Big Five Likert quiz state
    useModelQuiz.js         ← generic A/B quiz state
  i18n/
    LangContext.jsx         ← lang state ('en'|'vi'), LangProvider, useLang
    translations.js         ← all strings EN+VI; t(key, lang, params) helper
  components/
    HomeScreen.jsx          ← 3-col responsive grid of model cards
    HomeScreen.module.css
    QuizPage.jsx            ← Big Five Likert page (10 questions)
    MbtiQuizPage.jsx        ← A/B quiz page (reused for all AB models)
    MbtiQuestionCard.jsx    ← single A/B question card
    Results.jsx             ← Big Five results page
    ModelResults.jsx        ← generic results wrapper for all AB models
    MbtiResultCard.jsx
    EnneagramResultCard.jsx
    DiscResultCard.jsx
    AttachmentResultCard.jsx
    LoveLangResultCard.jsx
    OceanRadarChart.jsx
    DimensionCard.jsx
    LangToggle.jsx
```

---

## Translation Convention

All strings live in `client/src/i18n/translations.js` under `en` and `vi` keys.

```js
t('key', lang)              // basic lookup
t('key', lang, { n: 3 })   // interpolation: {n} in string → 3
```

Model-specific key pattern:
- `model_{id}_title` — card title
- `model_{id}_desc` — card description
- `model_{id}_questions` — e.g. "32 questions"
- `model_{id}_time` — e.g. "~5 min"
- `model_{id}_badge` — results page badge
- `model_{id}_results_title` — results page h1
- `model_{id}_results_subtitle`
- `model_{id}_footer_note`

---

## CSS Modules Convention

- All component styles in `.module.css` siblings
- Global CSS classes (e.g. `.btn`, `.btn-primary`) defined in `client/src/index.css`
- To use a global class inside a CSS module: `:global(.btn) { ... }`

---

## Design System — Neubrutalism

The app uses a **Neubrutalism** visual style. All future UI work must follow these conventions.

### Core Principles
- **Light background**: Warm cream `#FFFEF0`, white cards `#FFFFFF`
- **Thick black borders**: `2px solid #000` everywhere — no soft/translucent borders
- **Hard box shadows**: `4px 4px 0 #000` (no blur) on cards; `2px 2px 0 #000` on small elements
- **No gradients**: No `linear-gradient` or `radial-gradient` fills, no gradient text (`-webkit-background-clip`)
- **No glow effects**: No `::before` radial glow overlays on hero cards
- **Bold typography**: Headings `font-weight: 800`, hero labels `font-weight: 900`
- **Flat progress bars**: `border-radius: 0`, black fill, bordered track

### CSS Variables (defined in `client/src/styles/index.css`)
```css
--color-bg:      #FFFEF0   /* page background */
--color-surface: #FFFFFF   /* card backgrounds */
--color-surface-2: #F5F4E8 /* inset panels */
--color-border:  #000000   /* all borders */
--color-text:    #0D0D0D
--color-text-muted: #444444
--color-accent:  #FFD600   /* primary yellow */
--shadow:        4px 4px 0 #000000
--shadow-sm:     2px 2px 0 #000000
--border:        2px solid #000000
--radius:        4px
--radius-sm:     2px
```

### Hover Contract (interactive cards and buttons)
```
default: box-shadow: 4px 4px 0 #000
hover:   transform: translate(2px, 2px) + box-shadow: 2px 2px 0 #000
```
Apply to: quiz cards, synthesis card, option cards, all `.btn` elements, language toggle.
Do NOT apply to: static result display cards (read-only).

### Bright Color Palette (model-specific)
| Variable / Usage | Hex |
|---|---|
| `--color-O` (Openness) | `#FF6B6B` coral-red |
| `--color-C` (Conscientiousness) | `#00C896` vivid teal |
| `--color-E` (Extraversion) | `#FF9500` orange |
| `--color-A` (Agreeableness) | `#E040FB` vivid purple |
| `--color-N` (Neuroticism) | `#2979FF` electric blue |
| DISC D | `#FF3D3D` |
| DISC I | `#FFD600` |
| DISC S | `#00C896` |
| DISC C | `#2979FF` |
| Attachment secure | `#00C896` |
| Attachment anxious | `#FFD600` |
| Attachment avoidant | `#2979FF` |
| Attachment fearful | `#FF6B6B` |

### Badges
All badges use: `background: #FFD600; color: #000; border: 2px solid #000; border-radius: 2px; box-shadow: 2px 2px 0 #000; font-weight: 800; text-transform: uppercase`

### Language Toggle
Inverted: `background: #000; color: #FFD600` — stands out as a control element.

---

## Pending Feature: Synthesis Report

A "Full Profile" consolidated report that reads all completed test results and synthesizes them across 5 dimensions:

| Dimension | Poles | Sources |
|---|---|---|
| Energy | Introverted ↔ Extraverted | MBTI E/I, BF Extraversion, DISC |
| Mind | Concrete ↔ Abstract | MBTI S/N, BF Openness, Enneagram center |
| Relationships | Independent ↔ Connected | Attachment, BF A+N, Love Languages |
| Drive | Harmony ↔ Achievement | DISC, MBTI T/F, BF Conscientiousness, Enneagram |
| Resilience | Sensitive ↔ Stable | BF Neuroticism, Attachment |

Files to create:
- `client/src/lib/synthesize.js` — signal extraction + archetype text EN+VI
- `client/src/components/SynthesisReport.jsx` + `.module.css` — pentagon chart + 5 insight cards

Files to update:
- `client/src/i18n/translations.js` — synthesis strings
- `client/src/components/HomeScreen.jsx` — full-width synthesis card (unlocks at ≥ 3 models done)
- `client/src/App.jsx` — `screen === 'synthesis'` branch

Minimum models to unlock: 3.

---

## Git Workflow

- Always develop on: `claude/neubrutalism-redesign-qfQhy`
- Push: `git push -u origin claude/neubrutalism-redesign-qfQhy`
- Do NOT push to main/master without explicit permission
- Commit messages should be descriptive; end with session URL

---

## Common Commands

```bash
npm run dev          # start both server (3001) + client (5173) concurrently
git status --short   # check what's changed
git log --oneline -5 # recent commits
```
