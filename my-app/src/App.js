import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [logCount, setLogCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [lastSentAt, setLastSentAt] = useState(null);

  const faroReady = useMemo(() => Boolean(window.faro?.api), []);

  const markSent = () => {
    setLastSentAt(new Date().toLocaleTimeString());
  };

  const sendFaroTestData = () => {
    const faroApi = window.faro?.api;

    if (!faroApi) {
      return;
    }

    faroApi.pushLog([`Manual Faro test log from React button ${Date.now()}`], {
      level: 'info',
      skipDedupe: true,
    });

    faroApi.pushEvent('manual-faro-test', {
      source: 'ui-button',
      status: 'ok',
      sentAt: Date.now().toString(),
    });

    setLogCount((count) => count + 1);
    setEventCount((count) => count + 1);
    markSent();
  };

  return (
    <div className="app-shell">
      <main className="console">
        <section className="hero">
          <div>
            <h1>Faro Monitoring Test Console</h1>
            <p>
              Send browser telemetry to Alloy and verify it in Grafana quickly.
            </p>
          </div>
          <span className={`status-chip ${faroReady ? 'ready' : 'not-ready'}`}>
            {faroReady ? 'Faro SDK Connected' : 'Faro SDK Not Ready'}
          </span>
        </section>

        <section className="actions card">
          <h2>Actions</h2>
          <div className="button-row">
            <button onClick={sendFaroTestData} disabled={!faroReady}>
              Send Test Telemetry
            </button>
            <a
              className="secondary-btn"
              href="http://localhost:3000/d/faro-local-logs/faro-local-signals"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Grafana Dashboard
            </a>
          </div>
          <p className="hint">
            Click a few times, then refresh Grafana panel to confirm new entries.
          </p>
        </section>

        <section className="stats-grid">
          <article className="card stat">
            <h3>Logs Sent</h3>
            <strong>{logCount}</strong>
          </article>
          <article className="card stat">
            <h3>Events Sent</h3>
            <strong>{eventCount}</strong>
          </article>
          <article className="card stat">
            <h3>Last Sent</h3>
            <strong>{lastSentAt || '—'}</strong>
          </article>
        </section>

        <section className="card checklist">
          <h2>Verify in Grafana</h2>
          <ol>
            <li>Open the dashboard from the button above.</li>
            <li>Set time range to Last 15 minutes.</li>
            <li>Confirm logs containing “Manual Faro test log”.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}

export default App;
