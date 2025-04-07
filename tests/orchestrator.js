import retry from 'async-retry';

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100, //número máximo de tentativas,
      maxTimeout: 1000, // 1 segundo entre uma tentativa e outra
    });

    async function fetchStatusPage() {
      const response = await fetch('http://localhost:3000/api/v1/status');

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

const orchestrator = { waitForAllServices };
export default orchestrator;
