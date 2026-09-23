"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const photos = [
  {
    src: "/gallery/frame1.png",
    caption: "one of my favorite little moments",
    rotate: -3,
  },
  {
    src: "/gallery/frame2.png",
    caption: "you probably don't know how cute this was",
    rotate: 3,
  },
  {
    src: "/gallery/frame3.png",
    caption: "just another moment i wanted to keep",
    rotate: -2,
  },
  {
    src: "/gallery/frame4.png",
    caption: "some moments deserve to stay",
    rotate: 3,
  },
  {
    src: "/gallery/frame5.png",
    caption: "still one of my favorites",
    rotate: -3,
  },
  {
    src: "/gallery/frame6.png",
    caption: "ordinary day, special memory",
    rotate: 2,
  },
  {
    src: "/gallery/frame7.png",
    caption: "i'd choose this memory again",
    rotate: -3,
  },
  {
    src: "/gallery/frame8.png",
    caption: "and somehow, you became my favorite part",
    rotate: 3,
  },
];

const memoryCategories = [
  {
    id: "moments",
    number: "01",
    title: "little moments",
    subtitle: "the tiny things worth keeping",
  },
  {
    id: "days",
    number: "02",
    title: "random days",
    subtitle: "nothing special, somehow everything",
  },
  {
    id: "you",
    number: "03",
    title: "things about you",
    subtitle: "the parts i secretly love",
  },
];

const things = [
  {
    title: "the way you listen",
    text: "even when i'm yapping about the most random things.",
  },
  {
    title: "the little details",
    text: "somehow you notice things i don't even realize i'm showing.",
  },
  {
    title: "the way you care",
    text: "not loud. not dramatic. just there when it actually matters.",
  },
  {
    title: "just you",
    text: "honestly, i don't think this one needs an explanation.",
  },
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [category, setCategory] = useState("moments");
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [heartClicks, setHeartClicks] = useState(0);
  const [secret, setSecret] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const heroX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const heroY = useTransform(smoothY, [-1, 1], [-18, 18]);

  const photoX = useTransform(smoothX, [-1, 1], [-35, 35]);
  const photoY = useTransform(smoothY, [-1, 1], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;

      mouseX.set(x * 2 - 1);
      mouseY.set(y * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setPlaying(false);
          return 0;
        }

        return prev + 0.7;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedPhoto === null) return;

      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedPhoto((prev) =>
          prev === null ? null : (prev + 1) % photos.length
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedPhoto((prev) =>
          prev === null
            ? null
            : (prev - 1 + photos.length) % photos.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  const nextPhoto = () => {
    if (selectedPhoto === null) return;

    setSelectedPhoto((selectedPhoto + 1) % photos.length);
  };

  const previousPhoto = () => {
    if (selectedPhoto === null) return;

    setSelectedPhoto(
      (selectedPhoto - 1 + photos.length) % photos.length
    );
  };

  const handleHeart = () => {
    const nextClicks = heartClicks + 1;
    setHeartClicks(nextClicks);

    if (nextClicks >= 3) {
      setSecret(true);
    }
  };

  return (
    <main className={opened ? "site-open" : "site-locked"}>
      {/* ================= OPENING SURPRISE ================= */}

      <AnimatePresence>
        {!opened && (
          <motion.div
            className="opening-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="opening-glow opening-glow-one"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="opening-glow opening-glow-two"
              animate={{
                x: [0, -25, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="opening-content">
              <motion.p
                className="opening-eyebrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                a little something
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45,
                  duration: 1,
                }}
              >
                wait...
              </motion.h1>

              <motion.p
                className="opening-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                i made something
                <br />
                just for you ♡
              </motion.p>

              <motion.button
                className="open-button"
                onClick={() => setOpened(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 0.8,
                }}
                whileHover={{
                  scale: 1.05,
                  letterSpacing: "0.12em",
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                open it
                <span>↗</span>
              </motion.button>

              <motion.div
                className="opening-heart"
                animate={{
                  y: [0, -8, 0],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ♡
              </motion.div>
            </div>

            <div className="opening-corner opening-corner-left">
              made with a little love
            </div>

            <div className="opening-corner opening-corner-right">
              2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO ================= */}

      <section className="hero">
        <motion.div
          className="hero-background-text"
          style={{
            x: heroX,
            y: heroY,
          }}
        >
          MEMORIES
        </motion.div>

        <motion.div
          className="hero-photo hero-photo-one"
          style={{
            x: photoX,
            y: photoY,
          }}
        >
          <img src="/gallery/frame2.png" alt="Memory" />
        </motion.div>

        <motion.div
          className="hero-photo hero-photo-two"
          style={{
            x: useTransform(photoX, (value) => value * -0.5),
            y: useTransform(photoY, (value) => value * -0.5),
          }}
        >
          <img src="/gallery/frame5.png" alt="Memory" />
        </motion.div>

        <motion.div
          className="hero-photo hero-photo-three"
          style={{
            x: useTransform(photoX, (value) => value * 0.7),
            y: useTransform(photoY, (value) => value * 0.7),
          }}
        >
          <img src="/gallery/frame7.png" alt="Memory" />
        </motion.div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: opened ? 1 : 0,
            y: opened ? 0 : 40,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: opened ? 0.2 : 0,
          }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: opened ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            a little corner of the internet ♡
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: opened ? 1 : 0,
              y: opened ? 0 : 50,
            }}
            transition={{
              delay: 0.4,
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            our little
            <br />
            <span>gallery.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: opened ? 1 : 0,
              y: opened ? 0 : 20,
            }}
            transition={{
              delay: 0.8,
              duration: 0.8,
            }}
          >
            a collection of random moments,
            <br />
            tiny memories and things i never
            <br />
            want to forget.
          </motion.p>

          <motion.a
            href="#gallery"
            className="scroll-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: opened ? 1 : 0 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            enter the memories ↓
          </motion.a>
        </motion.div>

        <motion.div
          className="floating-note note-one"
          initial={{
            opacity: 0,
            x: -30,
            rotate: -15,
          }}
          animate={{
            opacity: opened ? 1 : 0,
            x: 0,
            rotate: -8,
          }}
          transition={{
            delay: 1,
            duration: 1,
          }}
        >
          kept this one ♡
        </motion.div>

        <motion.div
          className="floating-note note-two"
          initial={{
            opacity: 0,
            x: 30,
            rotate: 20,
          }}
          animate={{
            opacity: opened ? 1 : 0,
            x: 0,
            rotate: 12,
          }}
          transition={{
            delay: 1.2,
            duration: 1,
          }}
        >
          ♡
        </motion.div>

        <div className="hero-bottom-label">
          <span>scroll to explore</span>
          <span>01 — 04</span>
        </div>
      </section>

      {/* ================= MUSIC ================= */}

      <section className="spotify-spotlight-section">
        <motion.div
          className="spotify-container"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          <div className="spotify-label-header">
            <div className="spotify-brand-icon">
              <span className="music-dot">●</span>
              currently playing
            </div>

            <div className="spotify-soundwave">
              <span className={playing ? "bar animating" : "bar"} />
              <span className={playing ? "bar animating" : "bar"} />
              <span className={playing ? "bar animating" : "bar"} />
              <span className={playing ? "bar animating" : "bar"} />
            </div>
          </div>

          <div className="spotify-main-card">
            <div className="album-art-wrapper">
              <motion.div
                className="vinyl-disk"
                animate={{
                  rotate: playing ? 360 : 0,
                }}
                transition={{
                  duration: 4,
                  repeat: playing ? Infinity : 0,
                  ease: "linear",
                }}
              >
                <div className="vinyl-center" />
              </motion.div>

              <div className="album-cover">
                <img
                  src="/gallery/frame1.png"
                  alt="Album cover"
                />
              </div>
            </div>

            <div className="spotify-info">
              <div className="song-header">
                <div>
                  <div className="song-title">
                    our little soundtrack
                  </div>

                  <div className="song-artist">
                    somewhere between then & now
                  </div>
                </div>

                <button
                  className={`heart-like-btn ${
                    liked ? "liked" : ""
                  }`}
                  onClick={() => setLiked(!liked)}
                  aria-label="Like song"
                >
                  {liked ? "♥" : "♡"}
                </button>
              </div>

              <div className="progress-area">
                <div
                  className="progress-bar-bg"
                  onClick={(event) => {
                    const rect =
                      event.currentTarget.getBoundingClientRect();

                    const percentage =
                      ((event.clientX - rect.left) /
                        rect.width) *
                      100;

                    setProgress(
                      Math.max(0, Math.min(100, percentage))
                    );
                  }}
                >
                  <motion.div
                    className="progress-bar-fill"
                    animate={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="time-display">
                  <span>
                    0:{String(Math.floor(progress / 4)).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span>3:21</span>
                </div>
              </div>

              <div className="player-controls">
                <button className="ctrl-btn">↶</button>

                <button
                  className="ctrl-btn play-pause-main"
                  onClick={() => setPlaying(!playing)}
                  aria-label="Play or pause"
                >
                  {playing ? "Ⅱ" : "▶"}
                </button>

                <button className="ctrl-btn">↷</button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= INTRO ================= */}

      <section className="intro">
        <motion.p
          className="small-title"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          01 — memories
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
        >
          maybe they're just photos,
          <br />
          <i>but they mean more than that.</i>
        </motion.h2>

        <motion.p
          className="intro-text"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
        >
          Some pictures are just pictures.
          <br />
          Some somehow become little pieces
          <br />
          of a person, a place, or a moment
          <br />
          we wish we could live again.
        </motion.p>
      </section>

      {/* ================= MEMORY SELECTOR ================= */}

      <section className="memory-selector">
        <div className="memory-selector-inner">
          <motion.div
            className="selector-heading"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="small-title">
              choose a memory
            </p>

            <h2>
              where should we
              <br />
              <i>go first?</i>
            </h2>
          </motion.div>

          <div className="memory-options">
            {memoryCategories.map((item) => (
              <motion.button
                key={item.id}
                className={`memory-option ${
                  category === item.id ? "active" : ""
                }`}
                onClick={() => setCategory(item.id)}
                whileHover={{
                  x: 8,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <span>{item.number}</span>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </div>

                <span className="option-arrow">↗</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              className="selected-memory-message"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              {category === "moments" && (
                <>
                  <span>♡</span>
                  <p>
                    the moments that looked ordinary
                    <br />
                    but somehow stayed with me.
                  </p>
                </>
              )}

              {category === "days" && (
                <>
                  <span>☼</span>
                  <p>
                    random days, random pictures,
                    <br />
                    and memories i didn't know i'd keep.
                  </p>
                </>
              )}

              {category === "you" && (
                <>
                  <span>✦</span>
                  <p>
                    little things about you
                    <br />
                    that i don't think i'll ever forget.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= GALLERY ================= */}

      <section
        className="gallery-section"
        id="gallery"
      >
        <motion.div
          className="section-heading"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          <div>
            <p className="small-title">
              02 — the gallery
            </p>

            <h2>little things i kept</h2>
          </div>

          <span className="photo-count">
            08 memories
          </span>
        </motion.div>

        <div className="gallery">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              className={`photo-card photo-${index + 1}`}
              initial={{
                opacity: 0,
                y: 100,
                rotate: photo.rotate,
                scale: 0.92,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: photo.rotate,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -15,
                rotate: 0,
                scale: 1.03,
                transition: {
                  duration: 0.4,
                },
              }}
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="photo-wrapper">
                <img
                  src={photo.src}
                  alt={`Memory ${index + 1}`}
                />

                <div className="photo-hover">
                  <span>open memory</span>
                  <strong>↗</strong>
                </div>
              </div>

              <div className="photo-caption">
                <span>
                  0{index + 1}
                </span>

                <p>{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= QUOTE ================= */}

      <section className="quote-section">
        <motion.p
          className="quote-mark"
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          “
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          i don't need a perfect
          <br />
          memory.
          <br />
          <i>i just want the real ones.</i>
        </motion.h2>

        <motion.p
          className="quote-author"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
        >
          — somewhere between then & now
        </motion.p>
      </section>

      {/* ================= LITTLE THINGS ================= */}

      <section className="things-section">
        <motion.p
          className="small-title"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          03 — little things
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
        >
          things i secretly
          <br />
          <i>love about you.</i>
        </motion.h2>

        <div className="things-grid">
          {things.map((thing, index) => (
            <motion.div
              className="thing"
              key={thing.title}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
            >
              <span>0{index + 1}</span>

              <h3>{thing.title}</h3>

              <p>{thing.text}</p>

              <div className="thing-arrow">
                ↗
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ENDING ================= */}

      <section className="ending">
        <motion.p
          className="small-title"
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          04 — end of the gallery
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
        >
          maybe we'll make
          <br />
          <i>more memories.</i>
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
        >
          until then, i'll keep these ones here.
        </motion.p>

        <div className="heart-wrapper">
          <motion.button
            className="heart-interactive-btn"
            onClick={handleHeart}
            whileTap={{
              scale: 0.7,
            }}
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="heart">
              ♡
            </span>
          </motion.button>

          <AnimatePresence>
            {heartClicks > 0 && !secret && (
              <motion.span
                className="heart-counter"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                {heartClicks === 1 &&
                  "one more ♡"}

                {heartClicks === 2 &&
                  "okay... one more time"}

              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= SECRET SURPRISE ================= */}

      <AnimatePresence>
        {secret && (
          <motion.div
            className="secret-screen"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <div className="secret-hearts">
              {Array.from({
                length: 18,
              }).map((_, index) => (
                <motion.span
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 50,
                    x: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -500 - index * 20,
                    x:
                      (index % 2 === 0 ? 1 : -1) *
                      (40 + index * 8),
                    rotate:
                      index % 2 === 0
                        ? 20
                        : -20,
                  }}
                  transition={{
                    duration:
                      2.5 + index * 0.1,
                    delay: index * 0.05,
                  }}
                >
                  {index % 3 === 0
                    ? "♡"
                    : "✦"}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="secret-content"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
            >
              <span className="secret-symbol">
                ♡
              </span>

              <p className="small-title">
                you found it
              </p>

              <h2>
                i guess this one
                <br />
                <i>was meant for you.</i>
              </h2>

              <p>
                and if you made it this far,
                <br />
                thank you for keeping the memories too.
              </p>

              <button
                className="secret-close"
                onClick={() => {
                  setSecret(false);
                  setHeartClicks(0);
                }}
              >
                keep exploring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= LIGHTBOX ================= */}

      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="lightbox"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="close-button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close"
            >
              ×
            </button>

            <button
              className="lightbox-arrow lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                previousPhoto();
              }}
              aria-label="Previous photo"
            >
              ←
            </button>

            <motion.div
              className="lightbox-content"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <img
                src={photos[selectedPhoto].src}
                alt="Selected memory"
              />

              <div className="lightbox-info">
                <span>
                  0{selectedPhoto + 1} / 08
                </span>

                <p>
                  {photos[selectedPhoto].caption}
                </p>
              </div>
            </motion.div>

            <button
              className="lightbox-arrow lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                nextPhoto();
              }}
              aria-label="Next photo"
            >
              →
            </button>

            <div className="lightbox-hint">
              ← → navigate &nbsp; • &nbsp; esc close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}