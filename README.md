# Portfolio

Windows-inspired personal portfolio, built with HTML, CSS, and JavaScript.

Run locally with `python -m http.server 4173`, then open http://localhost:4173.
Use an HTTP server so window fragments and the resume can load correctly.

Window behavior is shared in `js/desktop.js`; responsive layout is in `index.css`.
Tools fill the viewport below 768px wide and on short touch screens in landscape.
Desktop windows can be dragged by their title bars, maximized, and minimized.
Desktop shortcuts open with a double-click using a mouse, or one tap on phones
and tablets. Taskbar and Start menu shortcuts always open with one click.
The line beside the clock minimizes all windows; reopen them from the taskbar.
Music plays the bundled MP3 with native playback, seeking, and volume controls.
Minimizing keeps music playing; closing the player pauses it.
The contact form opens a draft in the visitor's email app; it has no email backend.

Responsive verification: all six tools checked at 320, 390, 768, and 1440px widths,
plus 844 × 390 touch landscape. Checks cover overflow, fullscreen sizing,
close/reopen/minimize, PDF fitting, project selection, menu filtering, form state,
keyboard access, desktop drag/resize/maximize, and failed-load retry.
Tailwind, Font Awesome, PDF.js, and embedded Google content require internet access.
