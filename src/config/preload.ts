utools.onPluginEnter(params => {
  console.log(`onPluginEnter:`, params);
});

window.openUrl = url => {
  require('electron').shell.openExternal(url);
};
