# Wohnungskauf Anwendung

## Installation, Inbetriebnahme und Bereitstellung

### Vorbereitungen
- Raspberry Pi 4 mit Raspberry Pi OS Lite (64-bit)
- Internetverbindung
- MyFritz-Adresse: `raspberrypi.hyg6zkbn2mykr1go.myfritz.net`
- GitHub-Repository: `https://github.com/mlurz92/wohnungskauf.git`
- Email für Certbot: `mlurz92@googlemail.com`

### Installation

1. **System aktualisieren**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. **Grundlegende Pakete installieren**
   ```bash
   sudo apt install -y git npm sqlite3 nginx certbot python3-certbot-nginx
   ```

3. **Repository klonen**
   ```bash
   git clone https://github.com/mlurz92/wohnungskauf.git
   cd wohnungskauf
   ```

4. **Backend installieren**
   ```bash
   cd backend
   npm install
   ```

   Erstellen Sie `.env`:
   ```bash
   nano .env
   ```

   ```plaintext
   PORT=5000
   JWT_SECRET=your-secret-key
   DB_PATH=./wohnungskauf.db
   ```

5. **Frontend bauen**
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```

6. **Nginx konfigurieren**
   ```bash
   sudo nano /etc/nginx/sites-available/wohnungskauf
   ```

   ```nginx
   server {
       listen 80;
       server_name raspberrypi.hyg6zkbn2mykr1go.myfritz.net;

       location / {
           root /home/pi/wohnungskauf/frontend/dist;
           try_files $uri $uri/ /index.html;
       }

       location /api/ {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

   Aktivieren und testen:
   ```bash
   sudo ln -s /etc/nginx/sites-available/wohnungskauf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **HTTPS mit Certbot**
   ```bash
   sudo certbot --nginx -d raspberrypi.hyg6zkbn2mykr1go.myfritz.net --email mlurz92@googlemail.com --agree-tos --no-eff-email
   ```

8. **Automatischer Start mit Systemd**
   Erstelle einen Service für das Backend:
   ```bash
   sudo nano /etc/systemd/system/wohnungskauf-backend.service
   ```

   ```ini
   [Unit]
   Description=Wohnungskauf Backend Service
   After=network.target

   [Service]
   User=pi
   WorkingDirectory=/home/pi/wohnungskauf/backend
   ExecStart=/usr/bin/npm start
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

   Aktiviere den Service:
   ```bash
   sudo systemctl enable wohnungskauf-backend
   sudo systemctl start wohnungskauf-backend
   ```

   Stelle sicher, dass Nginx beim Boot startet:
   ```bash
   sudo systemctl enable nginx
   ```

## Aufrufen der Anwendung
- Öffnen Sie `https://raspberrypi.hyg6zkbn2mykr1go.myfritz.net/`
- Registrieren oder einloggen

## Update der Anwendung
```bash
cd ~/wohnungskauf
git fetch origin
git reset --hard origin/main
cd backend
npm install
cd ../frontend
npm install
npm run build
sudo systemctl restart wohnungskauf-backend
sudo systemctl restart nginx
```

## Vollständige Entfernung
1. **Dienste stoppen**
   ```bash
   sudo systemctl stop nginx
   sudo systemctl stop wohnungskauf-backend
   ```

2. **Dateien löschen**
   ```bash
   cd ~
   rm -rf wohnungskauf
   sudo rm -rf /etc/nginx/sites-available/wohnungskauf /etc/nginx/sites-enabled/wohnungskauf
   rm wohnungskauf.db
   ```

3. **Pakete deinstallieren**
   ```bash
   sudo apt remove -y git npm sqlite3 nginx certbot python3-certbot-nginx
   sudo apt autoremove -y
   ```
```

---