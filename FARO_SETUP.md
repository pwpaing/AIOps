# Faro Local Testing Guide

This guide will help you test Grafana Faro (Real User Monitoring) locally.

## What is Fixed

1. ✅ **Port correction**: Changed Faro endpoint from port 12347 → 12345 to match Alloy configuration
2. ✅ **Missing imports**: Added `getWebInstrumentations` import from `@grafana/faro-react`
3. ✅ **React setup**: Added proper React DOM rendering in `index.js`
4. ✅ **Logo fix**: Updated `App.js` to use existing logo asset
5. ✅ **Faro receiver**: Added Faro collection endpoint to Alloy config

## Prerequisites

- Docker and Docker Compose installed
- Node.js 16+ installed
- Git

## Quick Start

### Step 1: Start Backend Services (Grafana Stack)

```bash
cd d:\DevOps\LGTM
docker-compose up -d
```

This starts:
- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Loki**: http://localhost:3100
- **Alloy**: http://localhost:12345
- **Sample Flask App**: http://localhost:5000

### Step 2: Install React App Dependencies

```bash
cd my-app
npm install
```

### Step 3: Start React App

```bash
npm start
```

The app will open at `http://localhost:3000` (or another available port if 3000 is taken).

## Testing Faro

1. **Open the React app** in your browser
2. **Click the test button** on the app to generate some telemetry
3. **View in Grafana**:
   - Go to http://localhost:3000 (Grafana)
   - Login: `admin` / `admin`
   - Look for logs from the "faro" source
   - Check real user monitoring dashboards

## Alloy Configuration Details

The Faro receiver is configured to:
- Listen for Faro data on **port 12345**
- Tag incoming logs with `source=faro` and `app=faro-lab-app`
- Send logs to **Loki** for log visualization
- Process traces in batches

## React App Configuration

The app is configured in `my-app/src/index.js`:
- **Faro URL**: http://localhost:12345/collect
- **API Key**: secret
- **Instrumentations**: Web RUM + Tracing enabled

## Troubleshooting

### Faro data not showing up in Grafana?

1. Check Alloy logs:
   ```bash
   docker logs alloy
   ```

2. Check React app console for errors:
   - Open browser DevTools (F12)
   - Look for Faro initialization messages

3. Verify connectivity:
   ```bash
   curl http://localhost:12345/metrics
   ```

### Port already in use?

Edit `docker-compose.yml` to change the port mappings:
```yaml
alloy:
  ports:
    - "12346:12345"  # Use 12346 instead
```

Then update `my-app/src/index.js`:
```javascript
url: 'http://localhost:12346/collect',
```

### React app won't start?

Clear node_modules and reinstall:
```bash
cd my-app
rm -r node_modules package-lock.json
npm install
npm start
```

## Next Steps

1. Create Grafana dashboards for Faro data
2. Set up Loki datasource in Grafana (if not auto-provisioned)
3. Explore Faro documentation: https://grafana.com/docs/faro/latest/
