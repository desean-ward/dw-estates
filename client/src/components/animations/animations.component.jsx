import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
};

const slideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
};
const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
};

export const FadeIn = ({ children }) => {
  const [fadeInRef, fadeInView] = useInView();

  return (
    <div ref={fadeInRef}>
      <motion.div
        variants={fadeIn}
        initial='hidden'
        animate={fadeInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};
export const SlideUp = ({ children }) => {
  const [slideUpRef, slideUpInView] = useInView();

  return (
    <div ref={slideUpRef}>
      <motion.div
        variants={slideUp}
        initial='hidden'
        animate={slideUpInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SlideInLeft = ({ children }) => {
  const [slideInLeftRef, slideInLeftView] = useInView();

  return (
    <div ref={slideInLeftRef}>
      <motion.div
        variants={slideInLeft}
        initial='hidden'
        animate={slideInLeftView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};
export const SlideInRight = ({ children }) => {
  const [slideInRightRef, slideInRightView] = useInView();

  return (
    <div ref={slideInRightRef}>
      <motion.div
        variants={slideInRight}
        initial='hidden'
        animate={slideInRightView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};
