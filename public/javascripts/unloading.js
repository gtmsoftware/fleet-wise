window.addEventListener('load', () => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setMilliseconds(null)
    now.setSeconds(null)
  
    document.getElementById('unloadingDate').value = now.toISOString().slice(0, -1);
});