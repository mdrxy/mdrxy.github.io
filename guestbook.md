---
title: Guestbook
layout: essay
---

<div class="container">
  <p class="lead text-center">Leave a message on this page by sending a <a href="https://indieweb.org/Webmention">Webmention</a>.</p>
  <div id="webmentions"></div>
</div>

<script>
  function loadWebmentions() {
    fetch('https://webmention.io/api/mentions.json?target=https://mdrxy.com/guestbook.html')
      .then(response => response.json())
      .then(data => {
        const webmentionsContainer = document.getElementById('webmentions');
        let html = '<ul>';
        data.links.forEach(link => {
          html += `<li><a href="${link.source}">${link.data.author.name || 'Anonymous'}</a>: ${link.data.content}</li>`;
        });
        html += '</ul>';
        webmentionsContainer.innerHTML = html;
      });
  }

  loadWebmentions();
</script>
