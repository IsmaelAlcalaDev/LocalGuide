// src/aos.d.ts
declare module 'aos' {
    interface AosOptions {
      duration?: number;
      easing?: string;
      once?: boolean;
      mirror?: boolean;
      delay?: number;
      anchorPlacement?: string;
      offset?: number;
      disable?: boolean | 'phone' | 'tablet' | 'mobile';
      startEvent?: string;
      animatedClassName?: string;
      initClassName?: string;
      useClassNames?: boolean;
      disableMutationObserver?: boolean;
    }
  
    interface AosInstance {
      init(options?: AosOptions): void;
      refresh(): void;
      refreshHard(): void;
      remove(): void;
    }
  
    const AOS: AosInstance;
    export default AOS;
  }
  