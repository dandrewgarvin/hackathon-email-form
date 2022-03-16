const DELAY = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

function send_form() {
  const submit_button = document.getElementById('submit-button');
  const form = document.getElementById('email-form');

  form.submit();

  submit_button.disabled = true;
  submit_button.innerHTML = 'Sending...';
  submit_button.classList.add('sending');

  setTimeout(() => {
    submit_button.innerHTML = 'Sent!';
    submit_button.classList.remove('sending');
    submit_button.classList.add('sent');
  }, DELAY);

  setTimeout(() => {
    submit_button.disabled = false;
    submit_button.innerHTML = 'Send';
    submit_button.classList.remove('sent');
  }, DELAY + 1000);
}

document.getElementById('email-form').addEventListener('submit', send_form);

function get_file() {
  const request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const token_field = document.getElementById('token');
      token_field.value = this.responseText;
    }
  };

  request.open('GET', './TOKEN', true);
  request.send();
}

get_file();
