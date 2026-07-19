  /* --- DATA DEPOSITORY FOR Nrutya CLUB EVENTS --- */
    const EVENTS = [
      {
        date: "2026-06-03",
        title: "Lasya 3.0 (Online Summer competition)",
        type: "competition",
        desc: "Lasya 3.0 is a collaborative dance-and-music event that celebrates the fusion of movement and melody. Participants perform in teams, combining live or original music with dance to create a unique and creative showcase of talent.",
        link: "../pages/event.html", 
        img: "../images/Lasya_3.0/Las_poster_final.jpg" /* Empty String for testing Glowing Solid Colors Fallback */
      },
      {
        date: "2026-08-19",
        title: "Freshers (Welcome to Nrutya)",
        type: "other",
        desc: "Learn dynamic moves, master fresh choreography, and elevate your style with an energetic workshop.",
        link: "../pages/event.html", 
        img: "" /* Empty String for testing Glowing Solid Colors Fallback */
      },
      {
        date: "2026-08-21",
        title: "Beat Breakers (Western Dance Workshop) — Day 1",
        type: "workshop",
        desc: "Learn dynamic moves, master fresh choreography, and elevate your style with an energetic workshop.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-08-22",
        title: "Beat Breakers (Western Dance Workshop) — Day 2",
        type: "workshop",
        desc: "Learn dynamic moves, master fresh choreography, and elevate your style with an energetic workshop.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-08-28",
        title: "Beat Breakers (Western Dance Workshop) — Day 2",
        type: "workshop",
        desc: "Learn dynamic moves, master fresh choreography, and elevate your style with an energetic workshop.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-08-29",
        title: "Beat Breakers (Western Dance Workshop) — Day 4",
        type: "workshop",
        desc: "Learn dynamic moves, master fresh choreography, and elevate your style with an energetic workshop.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-09-12",
        title: "Street to Spotlight (Hip Hop Workshop) — Day 1",
        type: "workshop",
        desc: "Discover the energy of hip-hop through fun choreography and good vibes.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-09-13",
        title: "Street to Spotlight (Hip Hop Workshop) — Day 1",
        type: "workshop",
        desc: "Discover the energy of hip-hop through fun choreography and good vibes.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-09-19",
        title: "Street to Spotlight (Hip Hop Workshop) — Day 1",
        type: "workshop",
        desc: "Discover the energy of hip-hop through fun choreography and good vibes.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-09-20",
        title: "Street to Spotlight (Hip Hop Workshop) — Day 4",
        type: "workshop",
        desc: "Discover the energy of hip-hop through fun choreography and good vibes.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-10-10",
        title: "Street to Spotlight (Hip Hop Workshop) — Day 5",
        type: "workshop",
        desc: "Discover the energy of hip-hop through fun choreography and good vibes.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-10-11",
        title: "Street to Spotlight (Hip Hop Workshop) — Day 6",
        type: "workshop",
        desc: "Discover the energy of hip-hop through fun choreography and good vibes.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-10-02",
        title: "Cultural fest presents — Solo Classical Workshop (Day 1)",
        type: "workshop",
        desc: "Discover the beauty of classical dance through graceful movements, rhythm, and expression.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-10-03",
        title: "Cultural fest presents — Pratibimb (Dance. Capture. Create.)",
        type: "competition",
        desc: "A unique collaboration of dance and photography, where classical dancers and photographers team up to create breathtaking performances and captivating visuals.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-10-03",
        title: "Cultural fest presents — Solo Classical Workshop (Day 2)",
        type: "workshop",
        desc: "Discover the beauty of classical dance through graceful movements, rhythm, and expression.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-10-04",
        title: "Cultural fest presents — Dance Mania (A dance jamming session)",
        type: "other",
        desc: "An open-to-all dance celebration featuring street battles, showcases, open jams, and endless energy!",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-11-14",
        title: "Flowstate (A dance element workshop) — Day 1",
        type: "workshop",
        desc: "A high-energy dance session with jamming, choreography, and styles like popping, tutting, animation, and more.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-11-15",
        title: "Flowstate (A dance element workshop) — Day 2",
        type: "workshop",
        desc: "A high-energy dance session with jamming, choreography, and styles like popping, tutting, animation, and more.",
        link: "../pages/event.html", 
        img: ""
      },
      {
        date: "2026-11-22",
        title: "Flowstate (A dance element workshop) — Day 3",
        type: "workshop",
        desc: "A high-energy dance session with jamming, choreography, and styles like popping, tutting, animation, and more.",
        link: "../pages/event.html", 
        img: ""
      },

      
    ];

    const MONTH_NAMES = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];

    // Core Time Tracking Instances
    const today = new Date();
    let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);

    // DOM Nodes Target Matrix
    const monthLabel = document.getElementById("monthLabel");
    const calendarGrid = document.getElementById("calendarGrid");
    const featuredHeading = document.getElementById("featuredMonthHeading");
    const upcomingList = document.getElementById("upcomingList");
    const popup = document.getElementById("eventPopup");
    const popupImgContainer = document.getElementById("popupImgContainer");

    /* --- DATE UTILITY ENGINE --- */
    function formatIsoDate(year, month, day) {
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      return `${year}-${mm}-${dd}`;
    }

    function prettyDate(isoString) {
      const parts = isoString.split("-");
      if(parts.length !== 3) return isoString;
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    /* --- CORE CALENDAR RENDERING CONFIGURATION --- */
    function renderCalendar() {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();

      // Configure Active Tracker Label
      monthLabel.textContent = `${MONTH_NAMES[month]} ${year}`;

      // Clean Out previous iteration data
      calendarGrid.innerHTML = "";

      // Offset alignment tracking parameters
      const firstDayIndex = new Date(year, month, 1).getDay();
      const totalDays = new Date(year, month + 1, 0).getDate();

      // Render Empty Padding Spaces
      for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "day-cell empty";
        calendarGrid.appendChild(emptyCell);
      }

      // Populate Days inside active calendar grids
      for (let day = 1; day <= totalDays; day++) {
        const cellDateStr = formatIsoDate(year, month, day);
        const dayCell = document.createElement("div");
        dayCell.className = "day-cell";
        dayCell.innerText = day;

        // Verify matches with local host machine clock values
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dayCell.classList.add("today");
        }

        // Filter and bundle events occurring on this cell coordinate
        const dayEvents = EVENTS.filter(ev => ev.date === cellDateStr);

        if (dayEvents.length > 0) {
          dayCell.classList.add("has-event");
          
          // Apply styling parameters matching the dominant event tier
          const primaryType = dayEvents[0].type;
          dayCell.classList.add(`type-${primaryType}`);

          // Render micro metric glow dot containers inside day square spaces
          const markersContainer = document.createElement("div");
          markersContainer.className = "day-markers";
          
          dayEvents.forEach(ev => {
            const marker = document.createElement("span");
            marker.className = `marker ${ev.type}`;
            markersContainer.appendChild(marker);
          });
          dayCell.appendChild(markersContainer);

          // Wire click interactive interface callbacks
          setupCellClickInteractions(dayCell, dayEvents[0]);

          
        }

        calendarGrid.appendChild(dayCell);
      }
    }

    /* --- HOVER POPUP MECHANICS CONTROL --- */
    function setupCellClickInteractions(cellElement, eventData) {
      const img = document.getElementById("popupImg");
      const badge = document.getElementById("popupBadge");
      const title = document.getElementById("popupTitle");
      const dateEl = document.getElementById("popupDate");
      const desc = document.getElementById("popupDesc");

      function openPopup(e) {
        popup.href = eventData.link || "#"; 
        
        // Remove prior dynamic fallback utility classes from container
        popupImgContainer.className = "popup-img-wrap";

        if (eventData.img && eventData.img.trim() !== "") {
          img.src = eventData.img;
          img.style.display = "block";
        } else {
          // If the link is empty or missing, inject the solid fallback color class instead
          img.style.display = "none";
          popupImgContainer.classList.add(`fallback-${eventData.type}`, "has-fallback");
        }

        badge.textContent = eventData.type;
        badge.style.background = `var(--accent-${eventData.type})`;
        title.textContent = eventData.title;
        dateEl.textContent = prettyDate(eventData.date);
        desc.textContent = eventData.desc;

        popup.classList.add("visible");
        positionPopup(e, cellElement);
      }

      function hidePopup() {
        popup.classList.remove("visible");
      }

      let clickTimer = null;

// Handle Single Click (Open Popup)
cellElement.addEventListener("click", (e) => {
  // Clear the timer so it doesn't fire multiple times
  clearTimeout(clickTimer);
  
  // Wait 250ms to see if a second click happens
  clickTimer = setTimeout(() => {
    // If the popup is already open for this exact event, close it (toggle effect). 
    // Otherwise, open it.
    if (popup.classList.contains("visible") && title.textContent === eventData.title) {
      hidePopup();
    } else {
      openPopup(e);
    }
  }, 250); 
});

// Handle Double Click (Redirect to Event Page)
cellElement.addEventListener("dblclick", () => {
  // Prevent the single click logic from running
  clearTimeout(clickTimer);
  
  if (eventData.link) {
    window.location.href = eventData.link;
  }
});

/* --- GLOBAL CLICK TO CLOSE POPUP --- */
document.addEventListener("click", (e) => {
  // Close the popup if the click is outside the popup AND outside a day cell with an event
  if (!e.target.closest(".day-cell.has-event") && !e.target.closest("#eventPopup")) {
    popup.classList.remove("visible");
  }
});

      
      // Accessibility tracking support
      cellElement.addEventListener("focus", openPopup);
      cellElement.addEventListener("blur", hidePopup);
    }

    function positionPopup(e, anchor) {
      const popupWidth = popup.offsetWidth || 270;
      const popupHeight = popup.offsetHeight || 220;
      
      let topPos = e.pageY - popupHeight - 15;
      let leftPos = e.pageX - (popupWidth / 2);

      // Bound safety layout verification checks
      if (topPos < window.scrollY + 10) {
        topPos = e.pageY + 20; 
      }
      if (leftPos < 10) {
        leftPos = 10;
      }
      if (leftPos + popupWidth > window.innerWidth - 10) {
        leftPos = window.innerWidth - popupWidth - 10;
      }

      popup.style.top = `${topPos}px`;
      popup.style.left = `${leftPos}px`;
    }

    /* --- LOCKED PERMANENT LIVE DYNAMIC SYSTEM FEATURED LIST ENGINE --- */
    function renderFeaturedCurrentMonthList() {
      const curYear = today.getFullYear();
      const curMonth = today.getMonth();

      // Explicit requested display layout overwrite updating title parameters dynamically
      featuredHeading.innerHTML = `Featured in <span>${MONTH_NAMES[curMonth]} ${curYear}</span>`;

      upcomingList.innerHTML = "";

      // Extract events matched purely to the current chronological operational system calendar month
      const currentMonthEvents = EVENTS.filter(ev => {
        const parts = ev.date.split("-");
        return parseInt(parts[0], 10) === curYear && (parseInt(parts[1], 10) - 1) === curMonth;
      });

      if (currentMonthEvents.length === 0) {
        upcomingList.innerHTML = `<div class="up-empty">No club events scheduled for ${MONTH_NAMES[curMonth]} ${curYear}.</div>`;
        return;
      }

      currentMonthEvents.forEach(ev => {
        const card = document.createElement("a");
        card.href = ev.link || "#"; 
        card.className = `up-card card-${ev.type}`;

        // Configure Thumbnail space depending on image availability status
        let imgLayoutSpace = "";
        if (ev.img && ev.img.trim() !== "") {
          imgLayoutSpace = `<div class="up-img-container"><img class="up-thumb" src="${ev.img}" alt="${ev.title}"></div>`;
        } else {
          // Fallback glowing solid box representation
          imgLayoutSpace = `<div class="up-img-container fallback-${ev.type} has-fallback"></div>`;
        }

        card.innerHTML = `
          ${imgLayoutSpace}
          <div class="up-meta">
            <h4>${ev.title}</h4>
            <span class="up-date">${prettyDate(ev.date)}</span>
            <span class="up-tag tag-${ev.type}">${ev.type}</span>
          </div>
        `;
        upcomingList.appendChild(card);
      });
    }

    /* --- EVENT CONTROL BINDINGS --- */
    document.getElementById("prevMonth").addEventListener("click", () => {
      popup.classList.remove("visible");
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      popup.classList.remove("visible");
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCalendar();
    });

    document.getElementById("todayBtn").addEventListener("click", () => {
      popup.classList.remove("visible");
      viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
      renderCalendar();
    });

    // Hide dynamic flying popup instantly during interface scroll processes
    window.addEventListener("scroll", () => popup.classList.remove("visible"));

    /* --- SYSTEM KEYBOARD SIDE ARROW MOVING BUTTON CONTROLS --- */
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        popup.classList.remove("visible");
        viewDate.setMonth(viewDate.getMonth() - 1);
        renderCalendar();
      } else if (e.key === "ArrowRight") {
        popup.classList.remove("visible");
        viewDate.setMonth(viewDate.getMonth() + 1);
        renderCalendar();
      }
    });

    /* --- INITIALIZATION --- */
    window.addEventListener("DOMContentLoaded", () => {
      renderCalendar();
      renderFeaturedCurrentMonthList();
    });

/* --- MOBILE SWIPE GESTURE CONTROLS --- */
    const calendarShell = document.querySelector('.calendar-shell');
    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance in pixels to count as a swipe
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped Left -> Go to Next Month
        popup.classList.remove("visible");
        viewDate.setMonth(viewDate.getMonth() + 1);
        renderCalendar();
      }
      
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped Right -> Go to Previous Month
        popup.classList.remove("visible");
        viewDate.setMonth(viewDate.getMonth() - 1);
        renderCalendar();
      }
    }

    calendarShell.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    calendarShell.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

           // ==========================================
