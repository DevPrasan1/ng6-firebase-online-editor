import { aceEditorThemes, themeVariables } from '../ace-editor-themes';
export * from '../ace-editor-themes';
declare var $: any;

export const setEditorTheme = () => {
  const root = document.getElementById('root');
  const initialbgColor = $('#editor').css('background-color');
  let i = 0;
  const interval = setInterval(() => {
    const bgColor = $('#editor').css('background-color');
    if (bgColor !== initialbgColor || i++ > 15) {
      clearInterval(interval);
      setCustomTheme(bgColor);
    }
  }, 100);
};
const saveColor = color => {
  localStorage.setItem('themeColor', color);
};
const getColor = () => {
  return localStorage.getItem('themeColor');
};
export const setCustomTheme = (bgColor = getColor()) => {
  saveColor(bgColor);
  const root = document.getElementById('root');
  root.style.setProperty('--bg-color', bgColor);
  let newTheme = themeVariables.light;
  if (isDarkColor(bgColor)) {
    newTheme = themeVariables.dark;
  }
  Object.entries(newTheme).map(d => {
    root.style.setProperty(d[0], d[1]);
  });
};

export const loadTheme = () => {
  return localStorage.getItem('themeName');
}
export const saveTheme = (theme) => {
  localStorage.setItem('themeName', theme);
}
const isDarkColor = color => {
  let r,
    b,
    g,
    hsp,
    a = color;
  if (a.match(/^rgb/)) {
    a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = a[1];
    g = a[2];
    b = a[3];
  } else {
    a = +(
      '0x' +
      a.slice(1).replace(
        // thanks to jed : http://gist.github.com/983661
        a.length < 5 && /./g,
        '$&$&',
      )
    );
    r = a >> 16;
    b = (a >> 8) & 255;
    g = a & 255;
  }
  hsp = Math.sqrt(
    // HSP equation from http://alienryderflex.com/hsp.html
    0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
  );
  if (hsp > 127.5) {
    return false;
  } else {
    return true;
  }
};
