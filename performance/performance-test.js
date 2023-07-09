import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: "30s", target: 25 },
    { duration: "1m", target: 25 },
    { duration: "20s", target: 0 },
  ],
}

export default function () {
  const pages = [
    "/",
    "/random-picture",
    "/not-existing-page",
  ]

  for (const page of pages) {
    const res = http.get('http://localhost:8080' + page);
    check(res, {
      'GET Status was 200': (response) => response.status === 200,
      'GET Duration was <= ': (response) => response.timings.duration <= 200
    });
    sleep(1);
  }

  // Send a POST request to the /picture endpoint
  const url = 'http://localhost:8080/picture';
  const payload = JSON.stringify({
    pictureName: '1.png',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  check(http.post(url, payload, params), {
    'POST Status was 200': (response) => response.status === 200,
    'POST Duration was <= ': (response) => response.timings.duration <= 200
  });

  sleep(1); // Wait for 1 second between each iteration
}
