import { useState } from 'react';
import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import { buildShareUrl } from '../lib/shareUrl';

export default function ShareButton({ modelId, data }) {
  const { lang } = useLang();
  const [state, setState] = useState('idle'); // idle | copying | copied

  async function handleClick() {
    if (state !== 'idle') return;
    setState('copying');
    try {
      const url = await buildShareUrl(modelId, data);
      await navigator.clipboard.writeText(url);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('idle');
    }
  }

  return (
    <button className="btn btn-ghost" onClick={handleClick} disabled={state === 'copying'}>
      {state === 'copied' ? t('share_copied', lang) : t('share_copy', lang)}
    </button>
  );
}
