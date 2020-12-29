# ~/.config/lxsession/LXDE-pi/autostart
@unclutter -idle 0 &
@rm -rf ~/.cache/chromium
@export DISPLAY=:0
@mkdir -p /etc/chromium-browser/customizations
@echo 'CHROMIUM_FLAGS="${CHROMIUM_FLAGS} --check-for-update-interval=31536000"' > /etc/chromium-browser/customizations/01-disable-update-check
@chromium-browser --kiosk --force-device-scale-factor=2 --disable-cache --disable-restore-session-state --disable-component-update --noerrdialogs --app=https://mirror-1598972059056.web.app