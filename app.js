$(() => {
  const repo = $('#repo');
  const input = $('#input');
  const output = $('#output');
  
  let key, fetching;
  
  repo.on('change', () => {
    key = undefined;
    fetching = false;
    update();
  });
  input.on('input', update);
  
  function update() {
    if (fetching) return;
    if (!repo.val()) return;
    
    if (!key) {
      fetching = true;
      // deliberately avoid handling the case where this request fails
      // so we don't end up trying to fetch it over and over again
      $.getJSON(`https://api.travis-ci.org/repos/${repo.val()}/key`)
        .then(val => {
          key = val.key;
          fetching = false;
          update();
        });
      return;
    }
    
    const enc = new JSEncrypt();
    enc.setKey(key);
    output.val(enc.encrypt(input.val()));
  }
});
