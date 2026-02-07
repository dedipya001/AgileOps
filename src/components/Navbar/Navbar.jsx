import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import "./Navbar.css";

export default function Navbar({
  items = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" },
  ],
}) {
  const navRef = useRef(null);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverX, setHoverX] = useState(null);

  // ✅ Sync active index with current route
  useEffect(() => {
    const index = items.findIndex(
      (item) => item.path === location.pathname
    );
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname, items]);

  // ✅ Mouse hover spotlight
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;

      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);

      const activeItem = nav.querySelector(
        `[data-index="${activeIndex}"]`
      );

      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX =
          itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // ✅ Animate active ambience bar
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeItem = nav.querySelector(
      `[data-index="${activeIndex}"]`
    );

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX =
        itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  return (
    <div className="navbar-container">
      <nav ref={navRef} className="spotlight-nav">
        <ul className="spotlight-list">
          {items.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                data-index={idx}
                onClick={() => setActiveIndex(idx)}
                className={({ isActive }) =>
                  cn("spotlight-link", isActive && "active")
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          className="spotlight-hover"
          style={{ opacity: hoverX !== null ? 1 : 0 }}
        />

        <div className="spotlight-active" />
        <div className="spotlight-border" />
      </nav>
    </div>
  );
}
