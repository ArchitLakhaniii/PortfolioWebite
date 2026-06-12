// Deterministic test double for framer-motion.
// Renders motion.* as plain DOM elements (stripping animation-only props) and
// makes AnimatePresence a pass-through so React mount/unmount is synchronous.
const React = require("react");

const MOTION_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileInView",
  "whileDrag",
  "viewport",
  "layout",
  "layoutId",
  "drag",
  "dragConstraints",
  "style",
  "custom",
  "onViewportEnter",
  "onViewportLeave",
  "onAnimationStart",
  "onAnimationComplete",
  "transformTemplate",
]);

function strip(props) {
  const out = {};
  for (const key in props) {
    if (!MOTION_PROPS.has(key)) out[key] = props[key];
  }
  return out;
}

const cache = {};
const motion = new Proxy(
  {},
  {
    get(_target, tag) {
      if (typeof tag !== "string") return undefined;
      if (!cache[tag]) {
        cache[tag] = React.forwardRef(function MotionMock(props, ref) {
          const { children, ...rest } = strip(props);
          return React.createElement(tag, { ref, ...rest }, children);
        });
      }
      return cache[tag];
    },
  }
);

const AnimatePresence = ({ children }) =>
  React.createElement(React.Fragment, null, children);

const motionValueStub = (value = 0) => ({
  get: () => value,
  set: () => {},
  on: () => () => {},
  onChange: () => () => {},
});

const useScroll = () => ({ scrollYProgress: motionValueStub(0) });
const useTransform = () => 0;
const useSpring = (v) => (v && typeof v === "object" ? v : motionValueStub(v));
const useInView = () => false;
const useReducedMotion = () => false;
const useMotionValue = (v) => motionValueStub(v);
const useMotionValueEvent = () => {};
const useAnimation = () => ({ start: () => Promise.resolve(), stop: () => {} });

module.exports = {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  useAnimation,
};
