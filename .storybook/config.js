import { configure } from '@storybook/react';
import { setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: []
});

function loadStories() {

  req = require.context("../components", true, /story.(tsx|js)$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

