$(() => {
  const repo = $('#repo');
  const input = $('#input');
  const output = $('#output');
  
  let key, lastFetch;
  
  repo.on('change', () => {
    key = undefined;
    update();
  });
  input.on('input', update);
  
  function update() {
    repo.css('border-color', 'red');
    input.css('border-color', 'red');
    output.css('border-color', 'red');
    
    if (key) {
      repo.css('border-color', 'green');
    } else if (lastFetch !== repo.val()) {
      lastFetch = repo.val();
      $.getJSON(`https://api.travis-ci.org/repos/${repo.val()}/key`)
        .done(val => key = val.key)
        .always(update);
    }
    
    if (input.val()) {
      input.css('border-color', 'green');
    }
    
    if (key && input.val()) {
      const enc = new JSEncrypt();
      enc.setKey(key);
      output.val(enc.encrypt(input.val()));
      output.css('border-color', 'green');
    }
  }
  
  update();
});
