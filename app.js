const repo = document.getElementById('repo');
const input = document.getElementById('input');
const output = document.getElementById('output');

let key, lastFetch;

function update() {
  repo.style.borderColor = 'red';
  input.style.borderColor = 'red';
  output.style.borderColor = 'red';

  if (lastFetch !== repo.value) {
    key = undefined;
    lastFetch = repo.value;
    fetch(`https://api.travis-ci.org/repos/${repo.value}/key`)
      .then(r => r.json())
      .then(val => {
        key = val.key;
        update();
      });
  } else if (key) {
    repo.style.borderColor = 'green';
  }

  if (input.value) {
    input.style.borderColor = 'green';
  }

  if (key && input.value) {
    const enc = new JSEncrypt();
    enc.setKey(key);
    output.value = enc.encrypt(input.value);
    output.style.borderColor = 'green';
  }
}

repo.addEventListener('change', update);
input.addEventListener('input', update);

update();
