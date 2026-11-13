// 1. Interactive Copy Button Feedback
      const copyBtn = document.getElementById("copy-btn");
      const copyText = document.getElementById("copy-text");
      const copyIcon = document.getElementById("copy-icon");
      const emailVal = "halo@argapratama.dev";

      if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(emailVal);
            }
          } catch (e) {
            // Fallback
            const temp = document.createElement("textarea");
            temp.value = emailVal;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            document.body.removeChild(temp);
          }

          copyText.innerText = "TERSALIN! ✓";
          copyIcon.classList.remove("hidden");
          copyBtn.classList.remove("bg-primary-container");
          copyBtn.classList.add("bg-secondary");

          setTimeout(() => {
            copyText.innerText = "SALIN";
            copyIcon.classList.add("hidden");
            copyBtn.classList.remove("bg-secondary");
            copyBtn.classList.add("bg-primary-container");
          }, 2000);
        });
      }

      // 2. Real-time Latency API Ticker
      const latencyEl = document.getElementById("latency-counter");
      if (latencyEl) {
        const latencies = ["17ms", "18ms", "19ms", "18ms", "16ms", "20ms"];
        let idx = 0;
        setInterval(() => {
          idx = (idx + 1) % latencies.length;
          latencyEl.style.opacity = "0.5";
          setTimeout(() => {
            latencyEl.innerText = latencies[idx];
            latencyEl.style.opacity = "1";
          }, 150);
        }, 4500);
      }

      // 3. Scroll Intersection Observer for Elements
      const observerOptions = {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      };

      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll(".reveal-item").forEach((el) => {
        revealObserver.observe(el);
      });

      // 4. Render english tasks from JSON payload
      const fallbackEnglishTasks = [
        {
          type: "Video",
          label: "Video · Tugas 01",
          icon: "videocam",
          number: "01",
          title: "Self Introduction",
          description:
            "Video singkat yang memperkenalkan diri dalam bahasa Inggris dengan fokus pada latar belakang akademik, pendidikan, dan minat terhadap teknologi dan komunikasi profesional.",
          url: "#",
          variant: "intro",
        },
        {
          type: "PDF",
          label: "PDF · Tugas 02",
          icon: "picture_as_pdf",
          number: "02",
          title: "Professional Writing for Online Shopping",
          description:
            "Surat keluhan formal dalam bahasa Inggris yang menjelaskan masalah pengiriman, menegaskan kondisi yang tidak sesuai, dan menuntut solusi yang adil dengan gaya komunikasi bisnis.",
          url: "#",
          variant: "writing",
        },
        {
          type: "Video",
          label: "Video · Tugas 03",
          icon: "videocam",
          number: "03",
          title: "Thesis Background & English Academic Journal",
          description:
            "Gambaran analitis tentang latar belakang penelitian, review literatur, dan alasan akademik di balik topik skripsi dalam bahasa Inggris yang jelas dan terstruktur.",
          url: "#",
          variant: "thesis",
        },
      ];

      const englishTaskGrid = document.getElementById("english-task-grid");

      const buildEnglishTaskCard = (task) => {
        const article = document.createElement("article");
        article.className =
          "group relative flex flex-col justify-between gap-space-lg bg-surface-container-lowest border border-surface-container rounded-xl p-space-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-outline-variant/70";

        if (task.variant === "intro") {
          article.classList.add("ring-1", "ring-[#7dc3b7]/20");
        }
        if (task.variant === "writing") {
          article.classList.add("ring-1", "ring-[#d5b288]/25");
        }
        if (task.variant === "thesis") {
          article.classList.add("ring-1", "ring-[#8f8f9b]/20");
        }

        article.innerHTML = `
          <span
            class="absolute top-0 left-0 h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full"
          ></span>
          <div class="flex flex-col gap-space-md">
            <div class="flex items-start justify-between gap-space-sm">
              <div class="flex items-center gap-space-sm">
                <span
                  class="w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0"
                >
                  <span class="material-symbols-outlined text-[18px]">${task.icon}</span>
                </span>
                <span
                  class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant"
                  >${task.label}</span
                >
              </div>
              <span
                class="font-headline-lg text-headline-lg italic text-secondary/25 leading-none select-none"
                >${task.number}</span
              >
            </div>
            <div class="h-px w-full bg-surface-container"></div>
            <h3
              class="font-headline-sm text-headline-sm text-primary leading-snug"
            >
              ${task.title}
            </h3>
            <p
              class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"
            >
              ${task.description}
            </p>
          </div>
          <a
            class="inline-flex items-center justify-center gap-space-xs border border-secondary/40 text-secondary font-label-md text-label-md uppercase tracking-wider px-space-md py-space-sm rounded-lg transition-all duration-300 hover:bg-secondary hover:text-surface-container-lowest hover:border-secondary active:scale-95"
            href="${task.url}"
          >
            <span>Buka di Google Drive</span>
            <span class="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
        `;

        return article;
      };

      const renderEnglishTasks = (tasks) => {
        if (!englishTaskGrid) return;
        englishTaskGrid.innerHTML = "";
        tasks.forEach((task) => {
          englishTaskGrid.appendChild(buildEnglishTaskCard(task));
        });
      };

      const loadEnglishTasks = async () => {
        try {
          const response = await fetch("portfolio-data.json", { cache: "no-store" });
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const data = await response.json();
          if (Array.isArray(data.englishTasks) && data.englishTasks.length) {
            renderEnglishTasks(data.englishTasks);
            return;
          }
          throw new Error("Data kosong");
        } catch (error) {
          console.warn("Gagal memuat portfolio-data.json, memakai data fallback.", error);
          renderEnglishTasks(fallbackEnglishTasks);
        }
      };

      if (englishTaskGrid) {
        loadEnglishTasks();
      }

      // 5. Ambient Cursor Follower Glow
      const glow = document.getElementById("ambient-glow");
      if (
        glow &&
        window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        window.addEventListener("mousemove", (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        const loop = () => {
          currentX += (mouseX - currentX) * 0.1;
          currentY += (mouseY - currentY) * 0.1;
          glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      } else if (glow) {
        glow.style.display = "none";
      }
