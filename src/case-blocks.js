// Building blocks for the case studies, shared by every language version.
export const text = (...paragraphs) => ({ type: 'text', paragraphs });
export const claims = (...items) => ({ type: 'claims', items });
export const media = item => ({ type: 'media', item });
export const gallery = (...items) => ({ type: 'gallery', items });
export const options = (...items) => ({ type: 'options', items });
export const decision = value => ({ type: 'decision', ...value });
export const stack = (...items) => ({ type: 'stack', items });
export const checks = (...items) => ({ type: 'checks', items });
export const testPlan = value => ({ type: 'testPlan', ...value });
export const note = (kind, value) => ({ type: 'note', kind, text: value });
export const placeholder = (ratio, need, evidence = 'placeholder') => ({ kind: 'placeholder', ratio, need, evidence });
export const image = (src, alt, caption, evidence, ratio = '16/10') => ({ kind: 'image', src, alt, caption, evidence, ratio });

