import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    getCLS((metric) => {
      onPerfEntry(metric);
      if (metric.value > 1000) {
        throw new Error(`CLS metric exceeded the threshold: ${metric.value}`);
      }
    });

    getFID((metric) => {
      onPerfEntry(metric);
      if (metric.value > 1000) {
        throw new Error(`FID metric exceeded the threshold: ${metric.value}`);
      }
    });

    getFCP((metric) => {
      onPerfEntry(metric);
      if (metric.value > 1000) {
        throw new Error(`FCP metric exceeded the threshold: ${metric.value}`);
      }
    });

    getLCP((metric) => {
      onPerfEntry(metric);
      if (metric.value > 1000) {
        throw new Error(`LCP metric exceeded the threshold: ${metric.value}`);
      }
    });

    getTTFB((metric) => {
      onPerfEntry(metric);
      if (metric.value > 1000) {
        throw new Error(`TTFB metric exceeded the threshold: ${metric.value}`);
      }
    });
  }
};

export default reportWebVitals;
