export const aceEditorThemes = {
  dark: [
    'ambiance',
    'chaos',
    'clouds_midnight',
    'dracula',
    'cobalt',
    'gruvbox',
    'gob',
    'idle_fingers',
    'kr_theme',
    'merbivore',
    'merbivore_soft',
    'mono_industrial',
    'monokai',
    'pastel_on_dark',
    'solarized_dark',
    'terminal',
    'tomorrow_night',
    'tomorrow_night_blue',
    'tomorrow_night_bright',
    'tomorrow_night_eighties',
    'twilight',
    'vibrant_ink'
  ],
  light: [
    'chrome',
    'clouds',
    'crimson_editor',
    'dawn',
    'dreamweaver',
    'eclipse',
    'github',
    'iplastic',
    'solarized_light',
    'textmate',
    'tomorrow',
    'xcode',
    'kuroir',
    'katzenmilch',
    'sqlserver'
  ]
};

export const mockData = [
  {
    id: 'root',
    name: 'Documents',
    type: 'FOLDER',
    parent: 'ZdQd13dl4qbAKkqLF08y1K9SMLF3'
  },
  {
    id: 'angular',
    name: 'angular 6',
    type: 'FOLDER',
    parent: 'root'
  },
  {
    id: 'react',
    name: 'react',
    type: 'FOLDER',
    parent: 'root'
  },
  {
    id: 'data.json',
    name: 'data.json',
    type: 'FILE',
    parent: 'root'
  },
  {
    id: '',
    name: '',
    type: 'FOLDER',
    parent: ''
  },
  {
    id: 'src',
    name: 'src',
    type: 'FOLDER',
    parent: 'angular'
  },
  {
    id: 'angular.json',
    name: 'angular.json',
    type: 'FILE',
    parent: 'angular'
  },
  {
    id: 'app',
    name: 'app',
    type: 'FOLDER',
    parent: 'src'
  },
  {
    id: 'index.html',
    name: 'index.html',
    type: 'FILE',
    parent: 'src'
  },
  {
    id: 'app.component.ts',
    name: 'app.component.ts',
    type: 'FILE',
    parent: 'app'
  }
];
