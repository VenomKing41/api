(function() {
    if (window.blackoutLoaded) {
        return;
    }
    window.blackoutLoaded = true;

    const LOGIN_CREDENTIALS = {
        username: "regx",
        password: "4204"
    };

    // 3RD LOGIN PAGE - The one with gradients and beautiful design
    const loginOverlay = document.createElement('div');
    loginOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 50% 50%, #1a1a1a, #000000);
        z-index: 99999999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        backdrop-filter: blur(10px);
    `;

    const loginContainer = document.createElement('div');
    loginContainer.style.cssText = `
        background: rgba(20, 20, 20, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        width: 320px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
        color: #fff;
        overflow: hidden;
        animation: floatIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        @keyframes floatIn {
            from { 
                opacity: 0; 
                transform: translateY(20px) scale(0.95);
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.2); }
            50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.4); }
            100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.2); }
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #fff, #a0a0a0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `;
    document.head.appendChild(animStyle);

    const loginHeader = document.createElement('div');
    loginHeader.style.cssText = `
        padding: 24px 24px 16px;
        text-align: center;
        position: relative;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(0,255,255,0.05) 0%, transparent 100%);
    `;

    const headerGlow = document.createElement('div');
    headerGlow.style.cssText = `
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1), transparent 70%);
        animation: pulse 4s ease-in-out infinite;
        pointer-events: none;
    `;
    loginHeader.appendChild(headerGlow);

    const loginTitle = document.createElement('h2');
    loginTitle.style.cssText = `
        margin: 0;
        font-size: 28px;
        font-weight: 800;
        letter-spacing: -0.5px;
        background: linear-gradient(135deg, #fff, #00ffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        font-family: 'Space Grotesk', sans-serif;
    `;
    loginTitle.textContent = 'BLACKOUT';
    loginHeader.appendChild(loginTitle);

    const loginSubtitle = document.createElement('div');
    loginSubtitle.style.cssText = `
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        margin-top: 4px;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 500;
    `;
    loginSubtitle.textContent = 'Authentication Required';
    loginHeader.appendChild(loginSubtitle);

    const loginBody = document.createElement('div');
    loginBody.style.cssText = `
        padding: 24px;
        background: linear-gradient(180deg, transparent, rgba(0,255,255,0.02) 100%);
    `;

    const loginStatus = document.createElement('div');
    loginStatus.style.cssText = `
        display: inline-block;
        padding: 6px 16px;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 20px;
        backdrop-filter: blur(5px);
        letter-spacing: 0.3px;
    `;
    loginStatus.textContent = '⚫ SYSTEM LOCKED';
    loginStatus.id = 'login-status';

    const inputGroupStyle = `
        margin-bottom: 16px;
    `;

    const labelStyle = `
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 6px;
        display: block;
        letter-spacing: 0.5px;
    `;

    const inputStyle = `
        width: 100%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 12px 16px;
        color: #fff;
        font-size: 14px;
        box-sizing: border-box;
        outline: none;
        transition: all 0.2s;
        font-weight: 400;
    `;

    const usernameFrame = document.createElement('div');
    usernameFrame.style.cssText = inputGroupStyle;

    const usernameLabel = document.createElement('label');
    usernameLabel.style.cssText = labelStyle;
    usernameLabel.textContent = 'USERNAME';
    usernameFrame.appendChild(usernameLabel);

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Enter your username';
    usernameInput.style.cssText = inputStyle;
    usernameInput.onfocus = () => {
        usernameInput.style.background = 'rgba(255, 255, 255, 0.05)';
        usernameInput.style.borderColor = 'rgba(0, 255, 255, 0.5)';
    };
    usernameInput.onblur = () => {
        usernameInput.style.background = 'rgba(255, 255, 255, 0.03)';
        usernameInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    };
    usernameFrame.appendChild(usernameInput);

    const passwordFrame = document.createElement('div');
    passwordFrame.style.cssText = inputGroupStyle;

    const passwordLabel = document.createElement('label');
    passwordLabel.style.cssText = labelStyle;
    passwordLabel.textContent = 'PASSWORD';
    passwordFrame.appendChild(passwordLabel);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.style.cssText = inputStyle;
    passwordInput.onfocus = () => {
        passwordInput.style.background = 'rgba(255, 255, 255, 0.05)';
        passwordInput.style.borderColor = 'rgba(0, 255, 255, 0.5)';
    };
    passwordInput.onblur = () => {
        passwordInput.style.background = 'rgba(255, 255, 255, 0.03)';
        passwordInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    };
    passwordFrame.appendChild(passwordInput);

    const messageFrame = document.createElement('div');
    messageFrame.style.cssText = `
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 12px 16px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const messageLabel = document.createElement('span');
    messageLabel.style.cssText = `
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        font-weight: 500;
    `;
    messageLabel.textContent = 'System Status';

    const messageValue = document.createElement('span');
    messageValue.style.cssText = `
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 100px;
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.9);
        font-size: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    messageValue.textContent = 'Awaiting input';
    messageValue.id = 'login-message';

    messageFrame.appendChild(messageLabel);
    messageFrame.appendChild(messageValue);

    const loginBtn = document.createElement('button');
    loginBtn.style.cssText = `
        width: 100%;
        background: linear-gradient(135deg, #00ffff, #0088ff);
        border: none;
        border-radius: 12px;
        padding: 14px;
        color: #000;
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.2s;
        margin-bottom: 16px;
        position: relative;
        overflow: hidden;
        font-family: 'Space Grotesk', sans-serif;
    `;
    loginBtn.textContent = 'ACCESS SYSTEM';
    
    const btnGlow = document.createElement('div');
    btnGlow.style.cssText = `
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), transparent 70%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    `;
    loginBtn.appendChild(btnGlow);
    
    loginBtn.onmouseover = () => {
        loginBtn.style.transform = 'translateY(-2px)';
        loginBtn.style.boxShadow = '0 10px 20px -5px rgba(0, 255, 255, 0.3)';
        btnGlow.style.opacity = '1';
    };
    loginBtn.onmouseout = () => {
        loginBtn.style.transform = 'translateY(0)';
        loginBtn.style.boxShadow = 'none';
        btnGlow.style.opacity = '0';
    };

    const loginFooter = document.createElement('div');
    loginFooter.style.cssText = `
        text-align: center;
        font-size: 11px;
        padding: 16px;
        color: rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(0, 0, 0, 0.2);
        font-weight: 500;
        letter-spacing: 0.3px;
    `;
    loginFooter.textContent = 'BLACKOUT! • discord.gg/JKvwmdphN3';

    loginBody.appendChild(loginStatus);
    loginBody.appendChild(usernameFrame);
    loginBody.appendChild(passwordFrame);
    loginBody.appendChild(messageFrame);
    loginBody.appendChild(loginBtn);
    
    loginContainer.appendChild(loginHeader);
    loginContainer.appendChild(loginBody);
    loginContainer.appendChild(loginFooter);
    loginOverlay.appendChild(loginContainer);
    document.body.appendChild(loginOverlay);

    usernameInput.focus();

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });

    loginBtn.onclick = () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === LOGIN_CREDENTIALS.username && password === LOGIN_CREDENTIALS.password) {
            loginStatus.textContent = '🟢 SYSTEM UNLOCKED';
            loginStatus.style.background = 'rgba(0, 255, 0, 0.1)';
            loginStatus.style.borderColor = 'rgba(0, 255, 0, 0.3)';
            loginStatus.style.color = '#00ff00';
            messageValue.textContent = '✓ ACCESS GRANTED';
            messageValue.style.background = 'rgba(0, 255, 0, 0.1)';
            messageValue.style.color = '#00ff00';
            loginContainer.style.animation = 'glow 2s ease-in-out infinite';
            
            setTimeout(() => {
                loginOverlay.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                loginOverlay.style.opacity = '0';
                setTimeout(() => {
                    loginOverlay.remove();
                    startQueueJoiner();
                }, 500);
            }, 1000);
        } else {
            loginStatus.textContent = '🔴 ACCESS DENIED';
            loginStatus.style.background = 'rgba(255, 0, 0, 0.1)';
            loginStatus.style.borderColor = 'rgba(255, 0, 0, 0.3)';
            loginStatus.style.color = '#ff4444';
            messageValue.textContent = '✗ INVALID CREDENTIALS';
            messageValue.style.background = 'rgba(255, 0, 0, 0.1)';
            messageValue.style.color = '#ff4444';
            loginContainer.style.animation = 'shake 0.5s ease';
            
            passwordInput.value = '';
            passwordInput.focus();
            
            setTimeout(() => {
                loginContainer.style.animation = '';
                loginStatus.textContent = '⚫ SYSTEM LOCKED';
                loginStatus.style.background = 'rgba(255, 255, 255, 0.05)';
                loginStatus.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                loginStatus.style.color = 'rgba(255, 255, 255, 0.7)';
                messageValue.textContent = 'Awaiting input';
                messageValue.style.background = 'rgba(255, 255, 255, 0.05)';
                messageValue.style.color = 'rgba(255, 255, 255, 0.9)';
            }, 2000);
        }
    };

    function startQueueJoiner() {
        window.queueClickerActive = true;

        let intervalId = null;
        let clickCount = 0;
        let isRunning = false;
        let currentTheme = 'black';
        let selectedClicks = 1;
        let selectedCPS = 20;
        let autoModeEnabled = false;
        let notificationEnabled = false;
        let soundAlertEnabled = false;
        let clickModeType = 'single';
        let burstDelayMs = 100;
        let ambulanceAudio = null;

        function playAmbulanceSound() {
            try {
                if (ambulanceAudio) {
                    ambulanceAudio.pause();
                    ambulanceAudio = null;
                }
                
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const now = audioCtx.currentTime;
                
                const masterGain = audioCtx.createGain();
                masterGain.gain.value = 0.5;
                masterGain.connect(audioCtx.destination);
                
                for (let cycle = 0; cycle < 10; cycle++) {
                    const startTime = now + (cycle * 0.5);
                    
                    const highOsc = audioCtx.createOscillator();
                    const lowOsc = audioCtx.createOscillator();
                    const highGain = audioCtx.createGain();
                    const lowGain = audioCtx.createGain();
                    
                    highOsc.type = 'sawtooth';
                    lowOsc.type = 'sawtooth';
                    
                    if (cycle % 2 === 0) {
                        highOsc.frequency.value = 1800;
                        lowOsc.frequency.value = 1500;
                    } else {
                        highOsc.frequency.value = 1500;
                        lowOsc.frequency.value = 1200;
                    }
                    
                    highGain.gain.setValueAtTime(0.3, startTime);
                    highGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
                    lowGain.gain.setValueAtTime(0.3, startTime);
                    lowGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
                    
                    highOsc.connect(highGain);
                    lowOsc.connect(lowGain);
                    highGain.connect(masterGain);
                    lowGain.connect(masterGain);
                    
                    highOsc.start(startTime);
                    lowOsc.start(startTime);
                    highOsc.stop(startTime + 0.4);
                    lowOsc.stop(startTime + 0.4);
                }
                
                ambulanceAudio = {
                    ctx: audioCtx,
                    stop: function() {
                        try {
                            this.ctx.close();
                        } catch (e) {}
                    }
                };
                
                setTimeout(() => {
                    if (ambulanceAudio) {
                        ambulanceAudio.stop();
                        ambulanceAudio = null;
                    }
                }, 5000);
                
            } catch (e) {
                console.log("Ambulance sound error:", e);
            }
        }

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap');
            
            * {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            
            @keyframes slideInRight {
                from { 
                    opacity: 0; 
                    transform: translateX(50px) scale(0.9);
                }
                to { 
                    opacity: 1; 
                    transform: translateX(0) scale(1);
                }
            }
            
            @keyframes glowPulse {
                0% { box-shadow: 0 0 3px rgba(0, 255, 255, 0.15); }
                50% { box-shadow: 0 0 8px rgba(0, 255, 255, 0.25); }
                100% { box-shadow: 0 0 3px rgba(0, 255, 255, 0.15); }
            }
            
            /* Custom scrollbar */
            ::-webkit-scrollbar {
                width: 4px;
                height: 4px;
            }
            
            ::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(0, 255, 255, 0.3);
                border-radius: 10px;
            }
            
            /* Custom select dropdown styling */
            select.qc-select {
                appearance: none;
                -webkit-appearance: none;
                background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2300ffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
                background-repeat: no-repeat;
                background-position: right 10px center;
                background-size: 14px;
                padding-right: 30px;
                color: #ffffff !important;
            }
            
            select.qc-select option {
                background: #0f0f0f;
                color: #ffffff !important;
                padding: 8px;
                font-size: 11px;
                font-weight: 500;
            }
            
            .qc-container {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 250px;
                border-radius: 14px;
                background: rgba(8, 8, 12, 0.96);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(0, 255, 255, 0.15);
                box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.6);
                z-index: 9999999;
                overflow: hidden;
                animation: slideInRight 0.3s ease;
                transition: all 0.2s ease;
                user-select: none;
                will-change: left, top, transform;
            }
            
            .qc-container:hover {
                border-color: rgba(0, 255, 255, 0.25);
            }
            
            .qc-container.dragging {
                opacity: 0.95;
                transform: scale(1.02);
                transition: none;
                cursor: grabbing;
                box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.8);
            }
            
            /* Theme: Cyber Black */
            .qc-container.theme-black {
                background: rgba(5, 5, 8, 0.96);
                border-color: rgba(0, 255, 255, 0.2);
            }
            .theme-black .qc-header {
                border-bottom-color: rgba(0, 255, 255, 0.15);
                background: linear-gradient(180deg, rgba(0,255,255,0.1) 0%, transparent 100%);
            }
            .theme-black .qc-header h2 {
                color: #00ffff;
                text-shadow: 0 0 5px rgba(0,255,255,0.3);
                -webkit-text-fill-color: #00ffff;
                background: none;
            }
            .theme-black .qc-stat-value {
                color: #00ffff;
            }
            .theme-black .qc-button-primary {
                background: linear-gradient(135deg, #00ffff, #0088ff);
                color: #000;
            }
            .theme-black .qc-dev-name {
                color: #00ffff;
                -webkit-text-fill-color: #00ffff;
                background: none;
            }
            .theme-black .qc-select {
                border-color: rgba(0, 255, 255, 0.3);
            }
            .theme-black .qc-info-value {
                border-color: rgba(0, 255, 255, 0.3);
            }
            .theme-black .qc-slider {
                border-color: rgba(0, 255, 255, 0.3);
            }
            .theme-black input:checked + .qc-slider {
                background-color: rgba(0, 40, 40, 0.6);
                border-color: #00ffff;
            }
            .theme-black input:checked + .qc-slider:before {
                background-color: #00ffff;
            }
            .theme-black .qc-footer {
                color: rgba(0, 255, 255, 0.6);
                border-top-color: rgba(0, 255, 255, 0.2);
            }
            .theme-black .qc-theme-btn {
                color: #00ffff;
                border-color: rgba(0, 255, 255, 0.3);
            }
            
            /* Theme: Neon Red */
            .qc-container.theme-red {
                background: rgba(12, 5, 5, 0.96);
                border-color: rgba(255, 60, 60, 0.2);
            }
            .theme-red .qc-header {
                border-bottom-color: rgba(255, 60, 60, 0.15);
                background: linear-gradient(180deg, rgba(255,60,60,0.1) 0%, transparent 100%);
            }
            .theme-red .qc-header h2 {
                color: #ff6b6b;
                text-shadow: 0 0 5px rgba(255,60,60,0.3);
                -webkit-text-fill-color: #ff6b6b;
                background: none;
            }
            .theme-red .qc-stat-value {
                color: #ff6b6b;
            }
            .theme-red .qc-button-primary {
                background: linear-gradient(135deg, #ff6b6b, #ff3b3b);
                color: #fff;
            }
            .theme-red .qc-dev-name {
                color: #ff6b6b;
                -webkit-text-fill-color: #ff6b6b;
                background: none;
            }
            .theme-red .qc-select {
                border-color: rgba(255, 60, 60, 0.3);
            }
            .theme-red .qc-info-value {
                border-color: rgba(255, 60, 60, 0.3);
            }
            .theme-red .qc-slider {
                border-color: rgba(255, 60, 60, 0.3);
            }
            .theme-red input:checked + .qc-slider {
                background-color: rgba(60, 0, 0, 0.6);
                border-color: #ff6b6b;
            }
            .theme-red input:checked + .qc-slider:before {
                background-color: #ff6b6b;
            }
            .theme-red .qc-footer {
                color: rgba(255, 107, 107, 0.6);
                border-top-color: rgba(255, 60, 60, 0.2);
            }
            .theme-red .qc-theme-btn {
                color: #ff6b6b;
                border-color: rgba(255, 60, 60, 0.3);
            }
            
            /* Theme: Electric Purple */
            .qc-container.theme-purple {
                background: rgba(8, 5, 15, 0.96);
                border-color: rgba(160, 100, 255, 0.2);
            }
            .theme-purple .qc-header {
                border-bottom-color: rgba(160, 100, 255, 0.15);
                background: linear-gradient(180deg, rgba(160,100,255,0.1) 0%, transparent 100%);
            }
            .theme-purple .qc-header h2 {
                color: #b266ff;
                text-shadow: 0 0 5px rgba(160,100,255,0.3);
                -webkit-text-fill-color: #b266ff;
                background: none;
            }
            .theme-purple .qc-stat-value {
                color: #b266ff;
            }
            .theme-purple .qc-button-primary {
                background: linear-gradient(135deg, #8a2be2, #4b0082);
                color: #fff;
            }
            .theme-purple .qc-dev-name {
                color: #b266ff;
                -webkit-text-fill-color: #b266ff;
                background: none;
            }
            .theme-purple .qc-select {
                border-color: rgba(160, 100, 255, 0.3);
            }
            .theme-purple .qc-info-value {
                border-color: rgba(160, 100, 255, 0.3);
            }
            .theme-purple .qc-slider {
                border-color: rgba(160, 100, 255, 0.3);
            }
            .theme-purple input:checked + .qc-slider {
                background-color: rgba(40, 0, 60, 0.6);
                border-color: #b266ff;
            }
            .theme-purple input:checked + .qc-slider:before {
                background-color: #b266ff;
            }
            .theme-purple .qc-footer {
                color: rgba(178, 102, 255, 0.6);
                border-top-color: rgba(160, 100, 255, 0.2);
            }
            .theme-purple .qc-theme-btn {
                color: #b266ff;
                border-color: rgba(160, 100, 255, 0.3);
            }
            
            /* Theme: Golden */
            .qc-container.theme-gold {
                background: rgba(12, 10, 5, 0.96);
                border-color: rgba(255, 215, 0, 0.2);
            }
            .theme-gold .qc-header {
                border-bottom-color: rgba(255, 215, 0, 0.15);
                background: linear-gradient(180deg, rgba(255,215,0,0.1) 0%, transparent 100%);
            }
            .theme-gold .qc-header h2 {
                color: #ffd700;
                text-shadow: 0 0 5px rgba(255,215,0,0.3);
                -webkit-text-fill-color: #ffd700;
                background: none;
            }
            .theme-gold .qc-stat-value {
                color: #ffd700;
            }
            .theme-gold .qc-button-primary {
                background: linear-gradient(135deg, #ffd700, #ffaa00);
                color: #000;
            }
            .theme-gold .qc-dev-name {
                color: #ffd700;
                -webkit-text-fill-color: #ffd700;
                background: none;
            }
            .theme-gold .qc-select {
                border-color: rgba(255, 215, 0, 0.3);
            }
            .theme-gold .qc-info-value {
                border-color: rgba(255, 215, 0, 0.3);
            }
            .theme-gold .qc-slider {
                border-color: rgba(255, 215, 0, 0.3);
            }
            .theme-gold input:checked + .qc-slider {
                background-color: rgba(60, 40, 0, 0.6);
                border-color: #ffd700;
            }
            .theme-gold input:checked + .qc-slider:before {
                background-color: #ffd700;
            }
            .theme-gold .qc-footer {
                color: rgba(255, 215, 0, 0.6);
                border-top-color: rgba(255, 215, 0, 0.2);
            }
            .theme-gold .qc-theme-btn {
                color: #ffd700;
                border-color: rgba(255, 215, 0, 0.3);
            }
            
            /* Theme: Matrix Green */
            .qc-container.theme-green {
                background: rgba(5, 12, 5, 0.96);
                border-color: rgba(0, 255, 0, 0.2);
            }
            .theme-green .qc-header {
                border-bottom-color: rgba(0, 255, 0, 0.15);
                background: linear-gradient(180deg, rgba(0,255,0,0.1) 0%, transparent 100%);
            }
            .theme-green .qc-header h2 {
                color: #00ff00;
                text-shadow: 0 0 5px rgba(0,255,0,0.3);
                -webkit-text-fill-color: #00ff00;
                background: none;
            }
            .theme-green .qc-stat-value {
                color: #00ff00;
            }
            .theme-green .qc-button-primary {
                background: linear-gradient(135deg, #00ff00, #00cc00);
                color: #000;
            }
            .theme-green .qc-dev-name {
                color: #00ff00;
                -webkit-text-fill-color: #00ff00;
                background: none;
            }
            .theme-green .qc-select {
                border-color: rgba(0, 255, 0, 0.3);
            }
            .theme-green .qc-info-value {
                border-color: rgba(0, 255, 0, 0.3);
            }
            .theme-green .qc-slider {
                border-color: rgba(0, 255, 0, 0.3);
            }
            .theme-green input:checked + .qc-slider {
                background-color: rgba(0, 40, 0, 0.6);
                border-color: #00ff00;
            }
            .theme-green input:checked + .qc-slider:before {
                background-color: #00ff00;
            }
            .theme-green .qc-footer {
                color: rgba(0, 255, 0, 0.6);
                border-top-color: rgba(0, 255, 0, 0.2);
            }
            .theme-green .qc-theme-btn {
                color: #00ff00;
                border-color: rgba(0, 255, 0, 0.3);
            }
            
            .qc-header {
                padding: 10px 10px 6px;
                text-align: center;
                position: relative;
                border-bottom: 1px solid rgba(0, 255, 255, 0.12);
                background: rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
            }
            
            .qc-header h2 {
                margin: 0;
                font-size: 15px;
                font-weight: 600;
                letter-spacing: -0.3px;
                font-family: 'Space Grotesk', sans-serif;
                text-transform: uppercase;
                transition: all 0.2s ease;
            }
            
            .qc-dev-line {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                margin-top: 2px;
            }
            
            .qc-dev-label {
                opacity: 0.5;
                font-weight: 500;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                font-size: 8px;
                color: #888;
            }
            
            .qc-dev-name {
                font-weight: 600;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                font-size: 9px;
                opacity: 0.9;
                transition: all 0.2s ease;
            }
            
            .qc-body {
                padding: 10px;
            }
            
            .qc-stats-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 4px;
                margin-bottom: 10px;
            }
            
            .qc-stat-card {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(0, 255, 255, 0.1);
                border-radius: 8px;
                padding: 5px 2px;
                text-align: center;
            }
            
            .qc-stat-label {
                font-size: 7px;
                font-weight: 600;
                text-transform: uppercase;
                color: #888;
                margin-bottom: 2px;
                letter-spacing: 0.3px;
            }
            
            .qc-stat-value {
                font-size: 13px;
                font-weight: 600;
                line-height: 1.1;
                font-family: 'Space Grotesk', sans-serif;
                transition: all 0.2s ease;
            }
            
            .qc-info-panel {
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(0, 255, 255, 0.1);
                border-radius: 8px;
                padding: 6px 8px;
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .qc-info-label {
                font-size: 9px;
                font-weight: 500;
                color: #aaa;
                letter-spacing: 0.3px;
                text-transform: uppercase;
            }
            
            .qc-info-value {
                font-weight: 600;
                padding: 2px 6px;
                border-radius: 100px;
                background: rgba(0, 0, 0, 0.3);
                font-size: 9px;
                border: 1px solid rgba(0, 255, 255, 0.15);
                letter-spacing: 0.2px;
                color: #fff;
                transition: all 0.2s ease;
            }
            
            .qc-select-group {
                margin-bottom: 6px;
            }
            
            .qc-select-label {
                font-size: 8px;
                font-weight: 600;
                text-transform: uppercase;
                color: #aaa;
                margin-bottom: 3px;
                letter-spacing: 0.3px;
            }
            
            .qc-select {
                width: 100%;
                padding: 5px 8px;
                background: rgba(0, 0, 0, 0.4);
                border: 1px solid rgba(0, 255, 255, 0.15);
                border-radius: 6px;
                color: #ffffff !important;
                font-size: 10px;
                font-weight: 500;
                cursor: pointer;
                outline: none;
                transition: all 0.15s;
            }
            
            .qc-select:hover {
                background: rgba(0, 0, 0, 0.5);
            }
            
            .qc-button-group {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 5px;
                margin-top: 10px;
            }
            
            .qc-button {
                padding: 6px 4px;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                cursor: pointer;
                transition: all 0.15s;
                font-family: 'Space Grotesk', sans-serif;
            }
            
            .qc-button-primary {
                color: #000;
                font-weight: 700;
                transition: all 0.2s ease;
            }
            
            .qc-button-primary:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: 0 3px 8px rgba(0, 255, 255, 0.2);
            }
            
            .qc-button-danger {
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(255, 60, 60, 0.3);
                color: #ff8a8a;
                font-weight: 600;
            }
            
            .qc-button-danger:hover:not(:disabled) {
                background: rgba(40, 20, 20, 0.8);
                border-color: rgba(255, 60, 60, 0.5);
                transform: translateY(-1px);
            }
            
            .qc-footer {
                text-align: center;
                font-size: 8px;
                padding: 6px;
                border-top: 1px solid rgba(0, 255, 255, 0.2);
                background: rgba(0, 0, 0, 0.2);
                font-weight: 600;
                letter-spacing: 0.3px;
                transition: all 0.2s ease;
            }
            
            .qc-status-badge {
                display: inline-block;
                padding: 2px 6px;
                border-radius: 100px;
                font-size: 8px;
                font-weight: 600;
                margin-bottom: 8px;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(0, 255, 255, 0.15);
                letter-spacing: 0.3px;
                text-transform: uppercase;
                color: #ccc;
            }
            
            .qc-status-badge.active {
                background: rgba(0, 40, 0, 0.3);
                border-color: rgba(0, 255, 0, 0.25);
                color: #90EE90;
            }
            
            .qc-drag-handle {
                position: absolute;
                top: 0;
                left: 30px;
                right: 30px;
                height: 35px;
                cursor: grab;
                z-index: 5;
            }
            
            .qc-drag-handle:active {
                cursor: grabbing;
            }
            
            .qc-theme-btn {
                position: absolute;
                left: 8px;
                top: 7px;
                width: 22px;
                height: 22px;
                border: none;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(0, 255, 255, 0.15);
            }
            
            .qc-theme-btn:hover {
                background: rgba(0, 0, 0, 0.5);
                transform: rotate(180deg);
            }
            
            .qc-close-btn {
                position: absolute;
                right: 8px;
                top: 7px;
                width: 22px;
                height: 22px;
                border: none;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                color: #ff8a8a;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(255, 60, 60, 0.15);
            }
            
            .qc-close-btn:hover {
                background: rgba(40, 0, 0, 0.5);
                color: #ff6b6b;
            }
            
            .qc-switch {
                position: relative;
                display: inline-block;
                width: 34px;
                height: 18px;
                margin-left: 5px;
            }
            
            .qc-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .qc-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(40, 40, 40, 0.6);
                transition: .15s;
                border-radius: 18px;
                border: 1px solid rgba(0, 255, 255, 0.15);
            }
            
            .qc-slider:before {
                position: absolute;
                content: "";
                height: 14px;
                width: 14px;
                left: 2px;
                bottom: 1px;
                background-color: #ccc;
                transition: .15s;
                border-radius: 50%;
            }
            
            input:checked + .qc-slider {
                background-color: rgba(0, 40, 40, 0.6);
                border-color: rgba(0, 255, 255, 0.3);
            }
            
            input:checked + .qc-slider:before {
                transform: translateX(16px);
                transition: .15s;
            }
            
            .qc-setting-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
                padding: 4px 5px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 6px;
                border: 1px solid rgba(0, 255, 255, 0.08);
                transition: all 0.2s ease;
            }
            
            .qc-setting-label {
                font-size: 9px;
                font-weight: 500;
                color: #bbb;
                letter-spacing: 0.2px;
                text-transform: uppercase;
            }
            
            .qc-badge {
                padding: 2px 5px;
                border-radius: 100px;
                font-size: 7px;
                font-weight: 600;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(0, 255, 255, 0.12);
                color: #ddd;
                letter-spacing: 0.2px;
                text-transform: uppercase;
                transition: all 0.2s ease;
            }
            
            .qc-progress {
                height: 2px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 2px;
                overflow: hidden;
                margin: 6px 0 4px;
            }
            
            .qc-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #00ffff, #0088ff);
                width: 0%;
                transition: width 0.15s;
                border-radius: 2px;
            }
            
            .qc-badge-group {
                display: flex;
                gap: 3px;
                flex-wrap: wrap;
                margin-top: 5px;
            }
            
            select.qc-select option {
                background-color: #0a0a0a !important;
                color: #ffffff !important;
                font-size: 10px;
                padding: 5px;
            }
            
            select.qc-select option:checked {
                background: #1a3a3a !important;
                color: #00ffff !important;
            }
        `;
        document.head.appendChild(style);

        // Click options
        let clickOptions = '';
        for (let i = 1; i <= 20; i++) {
            clickOptions += `<option value="${i}">${i} click${i > 1 ? 's' : ''}</option>`;
        }
        [25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100].forEach(num => {
            clickOptions += `<option value="${num}">${num} clicks</option>`;
        });

        let cpsOptions = '';
        for (let i = 1; i <= 10; i++) {
            cpsOptions += `<option value="${i}">${i} CPS (${Math.round(1000/i)}ms)</option>`;
        }
        for (let i = 15; i <= 50; i += 5) {
            cpsOptions += `<option value="${i}">${i} CPS (${Math.round(1000/i)}ms)</option>`;
        }
        for (let i = 60; i <= 100; i += 10) {
            cpsOptions += `<option value="${i}">${i} CPS (${Math.round(1000/i)}ms)</option>`;
        }

        const themes = ['black', 'red', 'purple', 'gold', 'green'];
        let themeIndex = 0;

        const container = document.createElement('div');
        container.className = 'qc-container theme-black';
        container.innerHTML = `
            <div class="qc-drag-handle" id="qc-drag-handle"></div>
            <div class="qc-header">
                <button class="qc-theme-btn" id="qc-theme-toggle">◉</button>
                <button class="qc-close-btn" id="qc-close-main">✕</button>
                <h2>BLACKOUT</h2>
                <div class="qc-dev-line">
                    <span class="qc-dev-label">DEV</span>
                    <span class="qc-dev-name">REGX</span>
                </div>
            </div>

            <div class="qc-body">
                <div class="qc-status-badge" id="qc-status">
                    ⚫ STANDBY
                </div>

                <div class="qc-stats-grid">
                    <div class="qc-stat-card">
                        <div class="qc-stat-label">QUEUE</div>
                        <div class="qc-stat-value" id="queue-count">0</div>
                    </div>
                    <div class="qc-stat-card">
                        <div class="qc-stat-label">ACTIVE</div>
                        <div class="qc-stat-value" id="active-count">0</div>
                    </div>
                    <div class="qc-stat-card">
                        <div class="qc-stat-label">CLICKS</div>
                        <div class="qc-stat-value" id="qc-clicks">0</div>
                    </div>
                </div>

                <div class="qc-info-panel">
                    <span class="qc-info-label">JOIN</span>
                    <span class="qc-info-value" id="join-status">SCAN</span>
                </div>

                <div class="qc-select-group">
                    <div class="qc-select-label">MODE</div>
                    <select class="qc-select" id="qc-click-mode-select">
                        <option value="single">SINGLE CLICK</option>
                        <option value="burst">BURST MODE</option>
                        <option value="continuous">CONTINUOUS</option>
                        <option value="smart">SMART CLICK</option>
                    </select>
                </div>

                <div class="qc-select-group">
                    <div class="qc-select-label">CLICKS</div>
                    <select class="qc-select" id="qc-click-select">
                        ${clickOptions}
                    </select>
                </div>

                <div class="qc-select-group">
                    <div class="qc-select-label">SPEED</div>
                    <select class="qc-select" id="qc-cps-select">
                        ${cpsOptions}
                    </select>
                </div>

                <div class="qc-select-group" id="burst-delay-group" style="display: none;">
                    <div class="qc-select-label">BURST DELAY</div>
                    <select class="qc-select" id="qc-burst-delay-select">
                        <option value="50">50ms</option>
                        <option value="100" selected>100ms</option>
                        <option value="200">200ms</option>
                        <option value="300">300ms</option>
                        <option value="500">500ms</option>
                        <option value="1000">1000ms</option>
                    </select>
                </div>

                <div class="qc-setting-row">
                    <span class="qc-setting-label">AUTO</span>
                    <label class="qc-switch">
                        <input type="checkbox" id="qc-auto-mode-check">
                        <span class="qc-slider"></span>
                    </label>
                </div>

                <div class="qc-setting-row">
                    <span class="qc-setting-label">NOTIFY</span>
                    <label class="qc-switch">
                        <input type="checkbox" id="qc-notifications-check">
                        <span class="qc-slider"></span>
                    </label>
                </div>

                <div class="qc-setting-row">
                    <span class="qc-setting-label">SOUND</span>
                    <label class="qc-switch">
                        <input type="checkbox" id="qc-sound-check">
                        <span class="qc-slider"></span>
                    </label>
                </div>

                <div class="qc-progress">
                    <div class="qc-progress-bar" id="progress-bar" style="width: 0%"></div>
                </div>

                <div class="qc-badge-group">
                    <span class="qc-badge" id="click-status">READY</span>
                    <span class="qc-badge" id="detection-status">MONITOR</span>
                    <span class="qc-badge" id="cps-display">20 CPS</span>
                </div>

                <div class="qc-button-group">
                    <button class="qc-button qc-button-primary" id="qc-start">ACTIVATE</button>
                    <button class="qc-button qc-button-danger" id="qc-stop" disabled>STOP</button>
                </div>
            </div>

            <div class="qc-footer">
                BLACKOUT! • discord.gg/JKvwmdphN3
            </div>
        `;
        document.body.appendChild(container);

        // SMOOTHER DRAG FUNCTIONALITY
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        let rafId = null;

        const dragHandle = document.getElementById('qc-drag-handle');
        
        dragHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            
            const rect = container.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            startX = e.clientX;
            startY = e.clientY;
            
            container.classList.add('dragging');
            container.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            if (rafId) cancelAnimationFrame(rafId);
            
            rafId = requestAnimationFrame(() => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                
                let newLeft = startLeft + dx;
                let newTop = startTop + dy;
                
                const maxX = window.innerWidth - container.offsetWidth;
                const maxY = window.innerHeight - container.offsetHeight;
                
                newLeft = Math.min(Math.max(0, newLeft), maxX);
                newTop = Math.min(Math.max(0, newTop), maxY);
                
                container.style.left = newLeft + 'px';
                container.style.top = newTop + 'px';
                container.style.right = 'auto';
                container.style.bottom = 'auto';
                
                rafId = null;
            });
            
            e.preventDefault();
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                container.classList.remove('dragging');
                container.style.transition = 'all 0.2s ease';
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            }
        });

        // DOM elements
        const startBtn = document.getElementById('qc-start');
        const stopBtn = document.getElementById('qc-stop');
        const closeBtn = document.getElementById('qc-close-main');
        const themeToggle = document.getElementById('qc-theme-toggle');
        const clickSelect = document.getElementById('qc-click-select');
        const cpsSelect = document.getElementById('qc-cps-select');
        const clickModeSelect = document.getElementById('qc-click-mode-select');
        const burstDelaySelect = document.getElementById('qc-burst-delay-select');
        const burstDelayGroup = document.getElementById('burst-delay-group');
        const autoModeCheck = document.getElementById('qc-auto-mode-check');
        const notificationsCheck = document.getElementById('qc-notifications-check');
        const soundCheck = document.getElementById('qc-sound-check');
        const statusEl = document.getElementById('qc-status');
        const clicksEl = document.getElementById('qc-clicks');
        const queueCountSpan = document.getElementById('queue-count');
        const activeCountSpan = document.getElementById('active-count');
        const joinStatus = document.getElementById('join-status');
        const clickStatus = document.getElementById('click-status');
        const detectionStatus = document.getElementById('detection-status');
        const cpsDisplay = document.getElementById('cps-display');
        const progressBar = document.getElementById('progress-bar');

        // Event listeners
        clickModeSelect.addEventListener('change', () => {
            clickModeType = clickModeSelect.value;
            burstDelayGroup.style.display = clickModeType === 'burst' ? 'block' : 'none';
            clickStatus.textContent = clickModeType.toUpperCase();
        });

        cpsSelect.addEventListener('change', () => {
            selectedCPS = parseInt(cpsSelect.value);
            cpsDisplay.textContent = `${selectedCPS} CPS`;
        });

        clickSelect.addEventListener('change', () => {
            selectedClicks = parseInt(clickSelect.value);
            clickStatus.textContent = `${clickModeType.toUpperCase()} • ${selectedClicks}X`;
        });

        burstDelaySelect.addEventListener('change', () => {
            burstDelayMs = parseInt(burstDelaySelect.value);
        });

        autoModeCheck.addEventListener('change', () => {
            autoModeEnabled = autoModeCheck.checked;
        });

        notificationsCheck.addEventListener('change', () => {
            notificationEnabled = notificationsCheck.checked;
        });

        soundCheck.addEventListener('change', () => {
            soundAlertEnabled = soundCheck.checked;
        });

        themeToggle.addEventListener('click', () => {
            themeIndex = (themeIndex + 1) % themes.length;
            const oldTheme = currentTheme;
            const newTheme = themes[themeIndex];
            container.classList.remove(`theme-${oldTheme}`);
            container.classList.add(`theme-${newTheme}`);
            currentTheme = newTheme;
            
            const startButton = document.getElementById('qc-start');
            if (newTheme === 'black' || newTheme === 'gold' || newTheme === 'green') {
                startButton.style.color = '#000';
            } else {
                startButton.style.color = '#fff';
            }
        });

        // Click functionality with ambulance sound
        let lastButtonState = false;
        let hasClickedJoin = false;
        let clickTimer = null;
        let burstTimer = null;
        let spamPrevented = false;
        let queueMessageDetected = false;
        
        function updateQueueStats() {
            try {
                const pageText = document.body.innerText;
                const queueMatch = pageText.match(/Queue\s*\((\d+)\/(\d+)\)/i) || 
                                  pageText.match(/Queue.*?(\d+)\s*\/\s*(\d+)/i);
                if (queueMatch) {
                    queueCountSpan.textContent = queueMatch[1];
                }
                const activeMatch = pageText.match(/Active.*?\((\d+)\/(\d+)\)/i) || 
                                   pageText.match(/Active.*?(\d+)\s*\/\s*(\d+)/i);
                if (activeMatch) {
                    activeCountSpan.textContent = activeMatch[1];
                }
            } catch (e) {}
        }

        function findJoinButton() {
            return [...document.querySelectorAll("button, [role='button'], .join-button, .queue-button")].find(b => {
                const text = b.textContent.trim().toLowerCase();
                return text === "join" || 
                       text === "join queue" || 
                       text.includes("join") || 
                       text.includes("join queue") ||
                       text.includes("enter queue");
            });
        }

        function checkForQueueMessage() {
            const pageText = document.body.innerText.toLowerCase();
            const queueMessages = [
                "already in the queue",
                "already in queue",
                "you are already in the queue",
                "already queued",
                "already in line"
            ];
            
            return queueMessages.some(msg => pageText.includes(msg));
        }

        function showNotification(message, type = 'info') {
            if (!notificationEnabled) return;
            
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 290px;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(8px);
                border: 1px solid ${type === 'success' ? 'rgba(0,255,0,0.2)' : type === 'error' ? 'rgba(255,0,0,0.2)' : 'rgba(0,255,255,0.2)'};
                border-radius: 8px;
                padding: 6px 12px;
                color: #fff;
                font-size: 10px;
                font-weight: 500;
                z-index: 10000000;
                animation: slideInRight 0.15s ease;
                box-shadow: 0 5px 10px rgba(0,0,0,0.3);
                letter-spacing: 0.2px;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transition = 'opacity 0.15s';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 150);
            }, 2000);
        }

        function playSound() {
            if (!soundAlertEnabled) return;
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.08;
                
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.06);
            } catch (e) {}
        }

        function stopSpamming() {
            if (clickTimer) {
                clearInterval(clickTimer);
                clickTimer = null;
            }
            if (burstTimer) {
                clearTimeout(burstTimer);
                burstTimer = null;
            }
            hasClickedJoin = false;
            spamPrevented = true;
            
            joinStatus.innerHTML = 'IN QUEUE';
            joinStatus.style.background = 'rgba(255,165,0,0.2)';
            detectionStatus.innerHTML = 'STOPPED';
            
            showNotification('Already in queue - Auto stopped', 'error');
            
            // Play 5-second ambulance sound
            playAmbulanceSound();
            
            autoModeEnabled = false;
            autoModeCheck.checked = false;
        }

        function clickJoinMultiple() {
            const btn = findJoinButton();
            
            const queueMessageDetected = checkForQueueMessage();
            
            if (autoModeEnabled && queueMessageDetected) {
                if (isRunning && hasClickedJoin) {
                    stopSpamming();
                }
                return false;
            }
            
            if (btn && !btn.disabled) {
                joinStatus.innerHTML = 'READY';
                joinStatus.style.background = 'rgba(0,40,40,0.3)';
                
                if (!hasClickedJoin || autoModeEnabled) {
                    const clickDelay = Math.round(1000 / selectedCPS);
                    const totalClicks = parseInt(clickSelect.value);
                    const mode = clickModeSelect.value;
                    
                    spamPrevented = false;
                    
                    if (mode === 'burst') {
                        const burstDelayMs = parseInt(burstDelaySelect.value);
                        const bursts = Math.ceil(totalClicks / 5);
                        
                        for (let b = 0; b < bursts; b++) {
                            setTimeout(() => {
                                if (autoModeEnabled && checkForQueueMessage() && hasClickedJoin) {
                                    stopSpamming();
                                    return;
                                }
                                
                                for (let i = 0; i < Math.min(5, totalClicks - (b * 5)); i++) {
                                    setTimeout(() => {
                                        if (autoModeEnabled && checkForQueueMessage() && hasClickedJoin) {
                                            stopSpamming();
                                            return;
                                        }
                                        
                                        if (isRunning) {
                                            btn.click();
                                            clickCount++;
                                            clicksEl.textContent = clickCount;
                                            updateProgress(clickCount, totalClicks);
                                        }
                                    }, i * clickDelay);
                                }
                            }, b * burstDelayMs);
                        }
                        
                        showNotification(`BURST: ${totalClicks} clicks`, 'success');
                    } else if (mode === 'continuous') {
                        let clicksDone = 0;
                        const continuousInterval = setInterval(() => {
                            if (autoModeEnabled && checkForQueueMessage() && hasClickedJoin) {
                                clearInterval(continuousInterval);
                                stopSpamming();
                                return;
                            }
                            
                            if (clicksDone >= totalClicks || !isRunning) {
                                clearInterval(continuousInterval);
                                return;
                            }
                            
                            btn.click();
                            clickCount++;
                            clicksDone++;
                            clicksEl.textContent = clickCount;
                            updateProgress(clickCount, totalClicks);
                            
                            if (clicksDone === totalClicks) {
                                showNotification('CONTINUOUS complete', 'success');
                            }
                        }, clickDelay);
                        
                        clickTimer = continuousInterval;
                    } else {
                        for (let i = 0; i < totalClicks; i++) {
                            setTimeout(() => {
                                if (autoModeEnabled && checkForQueueMessage() && hasClickedJoin) {
                                    stopSpamming();
                                    return;
                                }
                                
                                if (isRunning) {
                                    btn.click();
                                    clickCount++;
                                    clicksEl.textContent = clickCount;
                                    updateProgress(clickCount, totalClicks);
                                    
                                    if (i === totalClicks - 1) {
                                        showNotification(`${totalClicks} clicks done`, 'success');
                                        if (soundAlertEnabled) playSound();
                                    }
                                }
                            }, i * clickDelay);
                        }
                    }
                    
                    hasClickedJoin = true;
                    
                    btn.style.boxShadow = '0 0 5px #00ffff';
                    
                    clickStatus.innerHTML = `${totalClicks}X`;
                }
                
                lastButtonState = true;
                return true;
            } else {
                joinStatus.innerHTML = 'SCAN';
                joinStatus.style.background = 'rgba(0,0,0,0.3)';
                
                if (lastButtonState) {
                    hasClickedJoin = false;
                    clickStatus.innerHTML = clickModeType.toUpperCase();
                    if (clickTimer) clearInterval(clickTimer);
                    if (burstTimer) clearTimeout(burstTimer);
                }
                
                lastButtonState = false;
                return false;
            }
        }

        function updateProgress(current, total) {
            const percentage = (current / total) * 100;
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
        }

        function checkForJoin() {
            if (!isRunning) return;
            
            const btn = findJoinButton();
            
            if (btn && !btn.disabled) {
                detectionStatus.innerHTML = 'DETECT';
                
                if (!hasClickedJoin || autoModeEnabled) {
                    clickJoinMultiple();
                }
            } else {
                detectionStatus.innerHTML = 'MONITOR';
            }
        }

        startBtn.onclick = () => {
            if (clickTimer) clearInterval(clickTimer);
            if (burstTimer) clearTimeout(burstTimer);
            
            intervalId = setInterval(checkForJoin, 500);
            isRunning = true;
            spamPrevented = false;
            
            statusEl.innerHTML = 'ACTIVE';
            statusEl.classList.add('active');
            startBtn.disabled = true;
            stopBtn.disabled = false;
            detectionStatus.innerHTML = 'MONITOR';
            clickSelect.disabled = true;
            cpsSelect.disabled = true;
            clickModeSelect.disabled = true;
            autoModeCheck.disabled = true;
            
            showNotification('JOINER ACTIVATED', 'success');
            if (soundAlertEnabled) playSound();
            
            setTimeout(checkForJoin, 100);
        };

        stopBtn.onclick = () => {
            clearInterval(intervalId);
            if (clickTimer) clearInterval(clickTimer);
            if (burstTimer) clearTimeout(burstTimer);
            isRunning = false;
            spamPrevented = false;
            
            if (ambulanceAudio) {
                ambulanceAudio.stop();
                ambulanceAudio = null;
            }
            
            statusEl.innerHTML = 'STANDBY';
            statusEl.classList.remove('active');
            startBtn.disabled = false;
            stopBtn.disabled = true;
            joinStatus.innerHTML = 'SCAN';
            detectionStatus.innerHTML = 'MONITOR';
            clickSelect.disabled = false;
            cpsSelect.disabled = false;
            clickModeSelect.disabled = false;
            autoModeCheck.disabled = false;
            hasClickedJoin = false;
            clickStatus.innerHTML = clickModeType.toUpperCase();
            progressBar.style.width = '0%';
            
            showNotification('JOINER STOPPED');
        };

        closeBtn.onclick = () => {
            if (intervalId) clearInterval(intervalId);
            if (clickTimer) clearInterval(clickTimer);
            if (burstTimer) clearTimeout(burstTimer);
            if (ambulanceAudio) {
                ambulanceAudio.stop();
                ambulanceAudio = null;
            }
            container.remove();
            window.queueClickerActive = false;
        };

        setInterval(updateQueueStats, 2000);
        updateQueueStats();
        cpsSelect.value = '20';
        cpsDisplay.textContent = '20 CPS';
        clickStatus.textContent = 'SINGLE';
    }
})();