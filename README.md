# Wohnungskauf Anwendung auf Raspberry Pi 4 – Installations-, Update- und Deinstallationsanleitung

Diese Anleitung erklärt Schritt für Schritt, wie Sie die Wohnungskauf Anwendung von GitHub (https://github.com/mlurz92/wohnungskauf.git) auf einem Raspberry Pi 4 mit RaspberryOS Lite (64bit) vollständig installieren, aktualisieren und wieder komplett entfernen. Außerdem wird beschrieben, wie Sie die Anwendung über HTTPS mittels MyFritz-Freigabe (https://raspberrypi.hyg6zkbn2mykr1go.myfritz.net) aus dem Internet erreichbar machen.

> **Hinweis:** Diese Anleitung verwendet aktuelle, kompatible Komponenten. Kopieren Sie die untenstehenden Befehle in Ihr Terminal.

---

## Inhaltsverzeichnis

1. [System vorbereiten](#1-system-vorbereiten)
2. [Repository klonen und Anwendung installieren](#2-repository-klonen-und-anwendung-installieren)
3. [Backend und Frontend einrichten und starten](#3-backend-und-frontend-einrichten-und-starten)
4. [Anwendung über HTTPS mittels MyFritz zugänglich machen](#4-anwendung-über-https-mittels-myfritz-zugänglich-machen)
5. [Repository aktualisieren (git reset --hard)](#5-repository-aktualisieren-git-reset---hard)
6. [Anwendung komplett vom Raspberry Pi entfernen](#6-anwendung-komplett-vom-raspberry-pi-entfernen)

---

## 1. System vorbereiten

1. **System aktualisieren und Upgrades durchführen:**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Erforderliche Pakete installieren (Git, curl, build-essential, etc.):**

   ```bash
   sudo apt install -y git curl build-essential
   ```

3. **Node.js (Version 16.x) und npm installieren:**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

4. **Überprüfen Sie die Installationen:**

   ```bash
   node -v
   npm -v
   git --version
   ```

---

## 2. Repository klonen und Anwendung installieren

1. **Wechseln Sie in Ihr gewünschtes Arbeitsverzeichnis:**

   ```bash
   cd ~
   mkdir wohnungskauf && cd wohnungskauf
   ```

2. **Klonen Sie das Repository:**

   ```bash
   git clone https://github.com/mlurz92/wohnungskauf.git
   cd wohnungskauf
   ```

3. **(Optional) Falls bereits eine alte Version vorhanden ist, können Sie mit folgendem Befehl alle lokalen Änderungen verwerfen und den Stand des Remote-Repositories wiederherstellen:**

   ```bash
   git reset --hard
   git clean -fdx
   ```

---

## 3. Backend und Frontend einrichten und starten

### 3.1 Backend

1. **Navigieren Sie in das Backend-Verzeichnis:**

   ```bash
   cd backend
   ```

2. **Installieren Sie die Abhängigkeiten:**

   ```bash
   npm install
   ```

3. **Starten Sie den Backend-Server (im Entwicklungsmodus können Sie auch `npm run dev` verwenden):**

   ```bash
   npm start
   ```

   Der Server lauscht standardmäßig auf Port **3000**.

### 3.2 Frontend

1. **Öffnen Sie ein neues Terminal oder wechseln Sie in ein anderes Tab und navigieren Sie in das Frontend-Verzeichnis:**

   ```bash
   cd ~/wohnungskauf/wohnungskauf/frontend
   ```

2. **Installieren Sie die Frontend-Abhängigkeiten:**

   ```bash
   npm install
   ```

3. **Starten Sie den Entwicklungsserver (Live-Reload):**

   ```bash
   npm run serve
   ```

   Der Entwicklungsserver startet in der Regel auf Port **8080**.

4. **Für eine Produktionsversion erstellen Sie:**

   ```bash
   npm run build
   ```

   Die erstellten Dateien befinden sich im Ordner `dist`.

---

## 4. Anwendung über HTTPS mittels MyFritz zugänglich machen

Um die Anwendung über das Internet sicher mittels HTTPS erreichbar zu machen, konfigurieren Sie Ihre MyFritz-Freigabe und einen Reverse-Proxy (z.B. Nginx).

### 4.1 MyFritz-Freigabe einrichten

1. **Melden Sie sich bei Ihrer MyFritz-Benutzeroberfläche an.**
2. **Richten Sie eine Portfreigabe ein:**
   - Weiterleitung des externen Ports (z.B. 443) an den internen Raspberry Pi (IP-Adresse des Pi, Port 3000 für das Backend oder 8080 für das Frontend, je nach Bedarf).
   - Notieren Sie sich die zugewiesene Adresse:  
     `https://raspberrypi.hyg6zkbn2mykr1go.myfritz.net`

### 4.2 Reverse-Proxy (Nginx) konfigurieren

1. **Installieren Sie Nginx:**

   ```bash
   sudo apt install -y nginx
   ```

2. **(Optional) Erzeugen Sie ein SSL-Zertifikat mit Let's Encrypt (Sie können Certbot verwenden):**

   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d raspberrypi.hyg6zkbn2mykr1go.myfritz.net
   ```

3. **Konfigurieren Sie Nginx als Reverse-Proxy:**

   Erstellen oder bearbeiten Sie eine Konfigurationsdatei, z. B. `/etc/nginx/sites-available/wohnungskauf`:

   ```nginx
   server {
       listen 443 ssl;
       server_name raspberrypi.hyg6zkbn2mykr1go.myfritz.net;

       ssl_certificate /etc/letsencrypt/live/raspberrypi.hyg6zkbn2mykr1go.myfritz.net/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/raspberrypi.hyg6zkbn2mykr1go.myfritz.net/privkey.pem;

       location / {
           proxy_pass http://localhost:8080;  # Für Frontend; ändern Sie ggf. zu 3000 für das Backend
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }

   # Optional: HTTP zu HTTPS Weiterleitung
   server {
       listen 80;
       server_name raspberrypi.hyg6zkbn2mykr1go.myfritz.net;
       return 301 https://$host$request_uri;
   }
   ```

4. **Aktivieren Sie die Nginx-Konfiguration und starten Sie Nginx neu:**

   ```bash
   sudo ln -s /etc/nginx/sites-available/wohnungskauf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## 5. Repository aktualisieren (git reset --hard)

Um Ihre lokale Kopie mit dem Remote-Repository zu synchronisieren und alle lokalen Änderungen zu verwerfen, führen Sie folgende Befehle im Stammverzeichnis des Repositories aus:

```bash
git fetch --all
git reset --hard origin/main
git clean -fdx
```

> **Hinweis:** Ersetzen Sie `main` durch den entsprechenden Branch-Namen, falls notwendig.

---

## 6. Anwendung komplett vom Raspberry Pi entfernen

Wenn Sie die Anwendung vollständig von Ihrem Raspberry Pi entfernen möchten, gehen Sie folgendermaßen vor:

1. **Stoppen Sie alle laufenden Prozesse (Backend, Frontend, Nginx):**

   ```bash
   # Beispiel: Falls Sie den Backend-Prozess über pm2 oder einen systemd-Service laufen haben, stoppen Sie ihn.
   # Für systemd (Backend):
   sudo systemctl stop wohnungskauf-backend.service

   # Falls Frontend über einen separaten Service läuft, stoppen Sie diesen ebenfalls.
   # Alternativ, falls Prozesse manuell im Terminal gestartet wurden, schließen Sie die Terminals.
   ```

2. **Löschen Sie das geklonte Repository:**

   ```bash
   cd ~
   rm -rf wohnungskauf
   ```

3. **Optional: Entfernen Sie Nginx und Certbot (falls nicht mehr benötigt):**

   ```bash
   sudo apt remove --purge -y nginx certbot python3-certbot-nginx
   sudo apt autoremove -y
   ```

4. **Optional: Entfernen Sie Node.js (falls nicht mehr benötigt):**

   ```bash
   sudo apt remove --purge -y nodejs
   sudo apt autoremove -y
   ```

---

## Zusammenfassung

- **System vorbereiten:** Update, Installation von Git, Node.js und weiteren Tools.
- **Repository klonen:** Klonen Sie das GitHub-Repository und verwerfen Sie bei Bedarf lokale Änderungen mit `git reset --hard`.
- **Backend & Frontend einrichten:** Installieren Sie Abhängigkeiten und starten Sie beide Komponenten.
- **HTTPS-Zugriff über MyFritz:** Richten Sie eine MyFritz-Freigabe und einen Nginx-Reverse-Proxy ein.
- **Aktualisieren:** Nutzen Sie `git reset --hard` zur Synchronisation.
- **Deinstallation:** Stoppen Sie alle Prozesse und löschen Sie alle installierten Komponenten.

Befolgen Sie diese Schritte in der vorgegebenen Reihenfolge, um die Anwendung sicher und vollständig auf Ihrem Raspberry Pi 4 zu installieren, zu aktualisieren und bei Bedarf wieder zu entfernen.

Viel Erfolg!
