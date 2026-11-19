// Swaps the video thumbnail for the YouTube player on click.
// Without JavaScript the thumbnail is still a working link to YouTube.
document.querySelectorAll('a.video[data-id]').forEach(function (link) {
  link.addEventListener('click', function (event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + link.dataset.id + '?autoplay=1&rel=0';
    iframe.title = link.getAttribute('aria-label');
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;

    var box = document.createElement('div');
    box.className = 'video';
    box.appendChild(iframe);
    link.replaceWith(box);
    iframe.focus();
  });
});
