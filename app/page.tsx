
"use client";

import { motion } from "motion/react";
import { useState } from "react";

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

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <main>
      {/* ================= HERO ================= */}

      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            a little corner of the internet ♡
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
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
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
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
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            scroll to memories ↓
          </motion.a>
        </motion.div>

        <motion.div
          className="floating-note note-one"
          initial={{ opacity: 0, x: -30, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{
            delay: 1,
            duration: 1,
          }}
        >
          kept this one ♡
        </motion.div>

        <motion.div
          className="floating-note note-two"
          initial={{ opacity: 0, x: 30, rotate: 20 }}
          animate={{ opacity: 1, x: 0, rotate: 12 }}
          transition={{
            delay: 1.2,
            duration: 1,
          }}
        >
          ♡
        </motion.div>
      </section>

      {/* ================= INTRO ================= */}

      <section className="intro">
        <motion.p
          className="small-title"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
        >
          01 — memories
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          maybe they're just photos,
          <br />
          <i>but they mean more than that.</i>
        </motion.h2>

        <motion.p
          className="intro-text"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2 }}
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

      {/* ================= GALLERY ================= */}

      <section className="gallery-section" id="gallery">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <div>
            <p className="small-title">02 — the gallery</p>

            <h2>little things i kept</h2>
          </div>

          <span className="photo-count">08 memories</span>
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
                amount: 0.25,
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
              onClick={() => setSelectedPhoto(photo.src)}
            >
              <div className="photo-wrapper">
                <img
                  src={photo.src}
                  alt={`Memory ${index + 1}`}
                />
              </div>

              <div className="photo-caption">
                <span>0{index + 1}</span>

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
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
          }}
          transition={{ duration: 0.9 }}
        >
          03 — little things
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          {[
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
          ].map((thing, index) => (
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
            >
              <span>0{index + 1}</span>

              <h3>{thing.title}</h3>

              <p>{thing.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ENDING ================= */}

      <section className="ending">
        <motion.p
          className="small-title"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
          }}
          transition={{ duration: 0.9 }}
        >
          04 — end of the gallery
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
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

        <motion.div
          className="heart"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♡
        </motion.div>
      </section>

      {/* ================= LIGHTBOX ================= */}

      {selectedPhoto && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.img
            src={selectedPhoto}
            alt="Selected memory"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="close-button"
            onClick={() => setSelectedPhoto(null)}
          >
            ×
          </button>
        </motion.div>
      )}
    </main>
  );
}

