/**
 * Utility functions for scroll-based animations
 * Provides reusable animation calculations for wedding components
 */

/**
 * Enum for fade animation types
 */
export enum FadeType {
  FADE_IN = 'fadeIn',
  FADE_OUT = 'fadeOut',
  BOTH = 'both'
}

/**
 * Configuration for scroll animation behavior
 */
export interface ScrollAnimationConfig {
  /** Current scroll position */
  scrollY: number;
  /** Animation start position */
  start?: number;
  /** Animation end position */
  end?: number;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Default fade type for animations */
  fadeType?: FadeType;
  /** Fade in speed multiplier (1 = normal, 2 = 2x faster) */
  fadeInSpeed?: number;
  /** Fade out speed multiplier (1 = normal, 2 = 2x faster) */
  fadeOutSpeed?: number;
  /** Fade in buffer (how much after start to start fading in) */
  fadeInBuffer?: number;
  /** Fade out buffer (how much before end to start fading out) */
  fadeOutBuffer?: number;
  /** Container translateY distance (default: 50) */
  containerTranslateY?: number;
  /** Container base scale (default: 0.9) */
  containerBaseScale?: number;
  /** Container target scale (default: 1.0) */
  containerTargetScale?: number;
}

/**
 * Return type for scroll animation utilities
 */
export interface ScrollAnimationUtils {
  /** Get progress value (0-1) for animations */
  getProgress: (startOffset?: number, reverse?: boolean) => number;
  /** Get fade out opacity (1-0) */
  getFadeOutOpacity: (startOffset?: number) => number;
  /** Get fade in opacity (0-1) */
  getFadeInOpacity: (startOffset?: number) => number;
  /** Get scale value for transform animations */
  getScale: (baseScale?: number, targetScale?: number, startOffset?: number) => number;
  /** Get translateY value for transform animations */
  getTranslateY: (distance?: number, startOffset?: number, reverse?: boolean) => number;
  /** Get translateX value for transform animations */
  getTranslateX: (distance?: number, startOffset?: number, reverse?: boolean) => number;
  /** Get rotate value for transform animations */
  getRotate: (degrees?: number, startOffset?: number, reverse?: boolean) => number;
  /** Animation duration for transitions */
  animationDuration: number;
  /** Helper function for backdrop styles */
  createBackdropStyles: (fadeType?: FadeType, startOffset?: number) => {
    opacity: number;
    backdropFilter: string;
    WebkitBackdropFilter: string;
    transition: string;
  };
  /** Helper function for container styles */
  createContainerStyles: (translateY?: number, baseScale?: number, targetScale?: number) => {
    transform: string;
    transition: string;
  };
  /** Helper function for fade styles with options */
  createFadeStyles: (type?: FadeType) => {
    opacity: number;
    transition: string;
  };
}

/**
 * Hook for scroll-based animations
 * @param config - Scroll animation configuration
 * @returns Animation utility functions
 */
export function useScrollAnimations({
  scrollY,
  start = 0,
  end = 10,
  animationDuration = 500,
  fadeType = FadeType.FADE_OUT,
  fadeInSpeed = 1,
  fadeOutSpeed = 1,
  fadeInBuffer = 2,
  fadeOutBuffer = 2,
  containerTranslateY = 25,
  containerBaseScale = 0.9,
  containerTargetScale = 1.0
}: ScrollAnimationConfig): ScrollAnimationUtils {

  /**
   * Calculate progress value between 0 and 1
   */
  const getProgress = (startOffset = 0, reverse = false) => {
    const sectionStart = start + startOffset;
    const sectionEnd = end + startOffset;
    const progress = Math.min(Math.max((scrollY - sectionStart) / (sectionEnd - sectionStart), 0), 1);
    return reverse ? 1 - progress : progress;
  };

  /**
   * Calculate fade out opacity (starts at 1, goes to 0)
   */
  const getFadeOutOpacity = (startOffset = 0) => {
    const sectionStart = start + startOffset;
    const sectionEnd = end + startOffset;

    if (scrollY <= sectionStart) {
      return 1;
    }
    if (scrollY >= sectionEnd) {
      return 0;
    }

    // Apply speed multiplier for faster fade out
    const rawProgress = (scrollY - sectionStart) / (sectionEnd - sectionStart);
    const speedProgress = Math.min(rawProgress * fadeOutSpeed, 1);

    // Lighter easing for more responsive feel
    const easedProgress = speedProgress * speedProgress * (3 - 2 * speedProgress);

    return 1 - Math.min(Math.max(easedProgress, 0), 1);
  };

  /**
   * Calculate fade in opacity (starts at 0, goes to 1)
   */
  const getFadeInOpacity = (startOffset = 0) => {
    const sectionStart = start + startOffset;
    const sectionEnd = end + startOffset;

    // If before section starts (with buffer), opacity = 0
    if (scrollY < (sectionStart + fadeInBuffer)) {
      return 0;
    }

    // If after section ends, opacity = 1 (fully visible)
    if (scrollY > sectionEnd) {
      return 1;
    }

    // During the section, fade in from 0 to 1 with speed control
    const fadeInStartPoint = sectionStart + fadeInBuffer;
    const rawProgress = (scrollY - fadeInStartPoint) / (sectionEnd - fadeInStartPoint);

    // Apply speed multiplier for faster animation
    const speedProgress = Math.min(rawProgress * fadeInSpeed, 1);

    // Apply lighter easing for more responsive feel
    const easedProgress = speedProgress * speedProgress * (3 - 2 * speedProgress);

    return Math.min(Math.max(easedProgress, 0), 1);
  };

  /**
   * Calculate scale transformation
   */
  const getScale = (baseScale = 0.9, targetScale = 1.0, startOffset = 0) => {
    const progress = getProgress(startOffset);
    return baseScale + (targetScale - baseScale) * progress;
  };

  /**
   * Calculate translateY transformation
   */
  const getTranslateY = (distance = 50, startOffset = 0, reverse = false) => {
    const progress = getProgress(startOffset, reverse);
    return distance * (1 - progress);
  };

  /**
   * Calculate translateX transformation
   */
  const getTranslateX = (distance = 50, startOffset = 0, reverse = false) => {
    const progress = getProgress(startOffset, reverse);
    return distance * (1 - progress);
  };

  /**
   * Calculate rotate transformation
   */
  const getRotate = (degrees = 360, startOffset = 0, reverse = false) => {
    const progress = getProgress(startOffset, reverse);
    return degrees * progress;
  };

  return {
    getProgress,
    getFadeOutOpacity,
    getFadeInOpacity,
    getScale,
    getTranslateY,
    getTranslateX,
    getRotate,
    animationDuration,
    createBackdropStyles: (overrideFadeType?: FadeType, startOffset = 0) => {
      const activeFadeType = overrideFadeType || fadeType;
      let opacity: number;
      let backdropFilter: string;
      let WebkitBackdropFilter: string;

      switch (activeFadeType) {
        case 'fadeIn':
          opacity = getFadeInOpacity();
          backdropFilter = `blur(${getFadeInOpacity() * 10}px)`;
          WebkitBackdropFilter = `blur(${getFadeInOpacity() * 10}px)`;
          break;
        case 'both':
          const currentSectionStart = start + startOffset;
          const currentSectionEnd = end + startOffset;
          const sectionDuration = currentSectionEnd - currentSectionStart;

          // If before section starts, opacity = 0
          if (scrollY < currentSectionStart) {
            opacity = 0;
          }
          // If after section ends (with buffer), fade out from 1 to 0
          else if (scrollY > (currentSectionEnd - fadeOutBuffer)) {
            // Calculate fade out progress from adjusted end point
            const fadeOutEndPoint = currentSectionEnd - fadeOutBuffer;
            const fadeOutProgress = Math.min((scrollY - fadeOutEndPoint) / (currentSectionEnd - fadeOutEndPoint), 1);
            const speedOutProgress = Math.min(fadeOutProgress * fadeOutSpeed, 1);
            const easedOutProgress = speedOutProgress * speedOutProgress * (3 - 2 * speedOutProgress);
            opacity = 1 - easedOutProgress;
          }
          // During the section, fade in from 0 to 1
          else {
            const fadeInProgress = (scrollY - currentSectionStart) / sectionDuration;
            const speedInProgress = Math.min(fadeInProgress * fadeInSpeed, 1);
            const easedInProgress = speedInProgress * speedInProgress * (3 - 2 * speedInProgress);
            opacity = easedInProgress;
          }

          backdropFilter = `blur(${opacity * 10}px)`;
          WebkitBackdropFilter = `blur(${opacity * 10}px)`;
          break;
        case 'fadeOut':
        default:
          opacity = getFadeOutOpacity();
          backdropFilter = `blur(${getFadeOutOpacity() * 10}px)`;
          WebkitBackdropFilter = `blur(${getFadeOutOpacity() * 10}px)`;
          break;
      }

      return {
        opacity,
        backdropFilter,
        WebkitBackdropFilter,
        transition: `opacity ${animationDuration}ms ease-out, backdrop-filter ${animationDuration}ms ease-out`
      };
    },
    createContainerStyles: (translateY?: number, baseScale?: number, targetScale?: number) => ({
      transform: `translateY(${getTranslateY(translateY ?? containerTranslateY)}px) scale(${getScale(baseScale ?? containerBaseScale, targetScale ?? containerTargetScale)})`,
      transition: `transform ${animationDuration}ms ease-out`
    }),
    createFadeStyles: (type: FadeType = FadeType.FADE_OUT) => {
      switch (type) {
        case FadeType.FADE_IN:
          return {
            opacity: getFadeInOpacity(),
            transition: `opacity ${animationDuration}ms ease-out`
          };
        case FadeType.BOTH:
          const currentSectionStart = start;
          const currentSectionEnd = end;
          const sectionDuration = currentSectionEnd - currentSectionStart;

          let opacity: number;

          // If before section starts, opacity = 0
          if (scrollY < currentSectionStart) {
            opacity = 0;
          }
          // If after section ends (with buffer), fade out from 1 to 0
          else if (scrollY > (currentSectionEnd - fadeOutBuffer)) {
            const fadeOutEndPoint = currentSectionEnd - fadeOutBuffer;
            const fadeOutProgress = Math.min((scrollY - fadeOutEndPoint) / (currentSectionEnd - fadeOutEndPoint), 1);
            const speedOutProgress = Math.min(fadeOutProgress * fadeOutSpeed, 1);
            const easedOutProgress = speedOutProgress * speedOutProgress * (3 - 2 * speedOutProgress);
            opacity = 1 - easedOutProgress;
          }
          // During the section, fade in from 0 to 1
          else {
            const fadeInProgress = (scrollY - currentSectionStart) / sectionDuration;
            const speedInProgress = Math.min(fadeInProgress * fadeInSpeed, 1);
            const easedInProgress = speedInProgress * speedInProgress * (3 - 2 * speedInProgress);
            opacity = easedInProgress;
          }

          return {
            opacity,
            transition: `opacity ${animationDuration}ms ease-out`
          };
        case FadeType.FADE_OUT:
        default:
          return {
            opacity: getFadeOutOpacity(),
            transition: `opacity ${animationDuration}ms ease-out`
          };
      }
    }
  };
}

/**
 * Helper function to create backdrop filter styles
 */
export function createBackdropFilter(opacity: number, blurAmount = 10) {
  const blurValue = opacity * blurAmount;
  return {
    backdropFilter: `blur(${blurValue}px)`,
    WebkitBackdropFilter: `blur(${blurValue}px)`
  };
}

/**
 * Helper function to create transform styles
 */
export function createTransformStyles(
  translateY = 0,
  scale = 1,
  rotate = 0,
  translateX = 0
) {
  const transforms = [];

  if (translateY !== 0) {
    transforms.push(`translateY(${translateY}px)`);
  }
  if (translateX !== 0) {
    transforms.push(`translateX(${translateX}px)`);
  }
  if (scale !== 1) {
    transforms.push(`scale(${scale})`);
  }
  if (rotate !== 0) {
    transforms.push(`rotate(${rotate}deg)`);
  }

  return {
    transform: transforms.join(' ') || 'none',
    WebkitTransform: transforms.join(' ') || 'none'
  };
}

/**
 * Helper function to create animation transition styles
 */
export function createTransitionStyles(
  animationDuration: number,
  properties = ['opacity', 'transform', 'backdrop-filter']
) {
  const transitions = properties.map(prop =>
    `${prop} ${animationDuration}ms ease-out`
  );

  return {
    transition: transitions.join(', '),
    WebkitTransition: transitions.join(', ')
  };
}
