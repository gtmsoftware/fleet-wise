window.addEventListener('load', () => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setMilliseconds(null)
    now.setSeconds(null)
  
    document.getElementById('loadingDate').value = now.toISOString().slice(0, -1);
});


/**
 * Normalize a Strng into a number, string, or false.
 */
function normalizePort(val) {
  const val = parseInt(val, 10);

  if (isNaN(val)) {
    // named pipe
    return val;
  }

  if (val >= 0) {
    // val number
    return val;
  }

  return false;
}