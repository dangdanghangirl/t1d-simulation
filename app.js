// Game State Management
class DiabetesSimulation {
    constructor() {
        this.gameState = {
            character: {
                name: '',
                age: 25,
                monitoringMethod: 'cgm',
                difficulty: 'beginner'
            },
            bloodGlucose: 120,
            insulinOnBoard: {
                rapid: 0,
                long: 0,
                rapidTime: null,
                longTime: null
            },
            energy: 85,
            gameTime: new Date(),
            realStartTime: new Date(),
            isPaused: false,
            dailyStats: {
                carbs: 0,
                meals: 0,
                bgChecks: 0,
                activities: []
            },
            bgHistory: [],
            timeInRange: 78,
            managementScore: 85,
            currentScenario: null,
            tutorialStep: 1,
            maxTutorialSteps: 5
        };
        
        // Game data from JSON
        this.gameData = {
            bloodGlucoseRanges: {
                low: 70,
                targetMin: 80,
                targetMax: 180,
                high: 250
            },
            insulinTypes: {
                rapidActing: {
                    name: "초속효성 인슐린",
                    onset: 15,
                    peak: 90,
                    duration: 240
                },
                longActing: {
                    name: "지속형 인슐린",
                    onset: 60,
                    peak: 0,
                    duration: 1440
                }
            },
            koreanFoods: [
                {name: "백미밥", carbs: 55, portion: "1공기"},
                {name: "김치찌개", carbs: 15, portion: "1그릇"},
                {name: "불고기", carbs: 5, portion: "100g"},
                {name: "사과", carbs: 25, portion: "1개"},
                {name: "바나나", carbs: 27, portion: "1개"},
                {name: "우유", carbs: 12, portion: "200ml"},
                {name: "라면", carbs: 80, portion: "1봉지"},
                {name: "토스트", carbs: 30, portion: "2장"},
                {name: "현미밥", carbs: 45, portion: "1공기"},
                {name: "된장찌개", carbs: 12, portion: "1그릇"},
                {name: "삼겹살", carbs: 2, portion: "100g"},
                {name: "오렌지", carbs: 20, portion: "1개"}
            ],
            activities: [
                {name: "걷기", intensity: "low", bgEffect: -10, duration: 30},
                {name: "조깅", intensity: "medium", bgEffect: -25, duration: 30},
                {name: "수영", intensity: "high", bgEffect: -40, duration: 30},
                {name: "요가", intensity: "low", bgEffect: -5, duration: 30},
                {name: "계단 오르기", intensity: "medium", bgEffect: -15, duration: 15},
                {name: "자전거 타기", intensity: "medium", bgEffect: -20, duration: 45}
            ],
            scenarios: [
                {
                    name: "아침 루틴",
                    description: "기상 후 혈당 체크하고 아침 식사 준비",
                    tasks: ["혈당 측정", "지속형 인슐린 주사", "아침 식사", "초속효성 인슐린 주사"]
                },
                {
                    name: "회사/학교 점심",
                    description: "외식 상황에서 탄수화물 계산하기",
                    tasks: ["메뉴 선택", "탄수화물 추정", "인슐린 계산", "식사 후 혈당 체크"]
                },
                {
                    name: "운동 전 준비",
                    description: "운동으로 인한 혈당 변화 대비",
                    tasks: ["운동 전 혈당 체크", "필요시 간식 섭취", "운동", "운동 후 혈당 체크"]
                },
                {
                    name: "저혈당 응급상황",
                    description: "혈당이 70mg/dL 이하로 떨어진 상황",
                    tasks: ["증상 인식", "빠른 탄수화물 섭취", "15분 후 재측정", "필요시 추가 처치"]
                }
            ],
            tips: [
                "혈당은 하루에 최소 4-7회 측정하는 것이 좋습니다",
                "탄수화물 15g은 보통 혈당을 약 45-60mg/dL 올립니다",
                "운동 전에는 혈당이 100mg/dL 이상인지 확인하세요",
                "스트레스와 수면 부족은 혈당을 올릴 수 있습니다",
                "저혈당 시에는 빠른 탄수화물을 15-20g 섭취하세요",
                "인슐린 주사 부위를 매번 바꿔주세요",
                "혈당 측정 전에는 손을 깨끗이 씻어주세요"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.showRandomTip();
        this.startGameLoop();
    }
    
    // Game Loop
    startGameLoop() {
        setInterval(() => {
            if (!this.gameState.isPaused) {
                this.updateGameTime();
                this.simulateBloodGlucose();
                this.updateInsulinOnBoard();
                this.checkForEmergencies();
                this.updateDisplay();
            }
        }, 5000); // Update every 5 seconds
    }
    
    updateGameTime() {
        const now = new Date();
        const elapsed = now - this.gameState.realStartTime;
        this.gameState.gameTime = new Date(this.gameState.gameTime.getTime() + elapsed * 10); // 10x speed
        this.gameState.realStartTime = now;
    }
    
    simulateBloodGlucose() {
        const difficulty = this.gameState.character.difficulty;
        let variability = 0;
        
        switch(difficulty) {
            case 'beginner':
                variability = 5;
                break;
            case 'intermediate':
                variability = 10;
                break;
            case 'advanced':
                variability = 15;
                break;
        }
        
        // Random variation
        const variation = (Math.random() - 0.5) * variability;
        
        // Insulin effect
        const insulinEffect = this.calculateInsulinEffect();
        
        // Natural glucose rise
        const naturalRise = 2;
        
        this.gameState.bloodGlucose += variation - insulinEffect + naturalRise;
        this.gameState.bloodGlucose = Math.max(40, Math.min(400, this.gameState.bloodGlucose));
        
        // Record history
        this.gameState.bgHistory.push({
            time: new Date(this.gameState.gameTime),
            value: this.gameState.bloodGlucose
        });
        
        // Keep only last 24 hours
        if (this.gameState.bgHistory.length > 288) {
            this.gameState.bgHistory.shift();
        }
        
        this.updateTimeInRange();
    }
    
    calculateInsulinEffect() {
        let effect = 0;
        const now = this.gameState.gameTime;
        
        // Rapid acting insulin
        if (this.gameState.insulinOnBoard.rapidTime) {
            const minutesElapsed = (now - this.gameState.insulinOnBoard.rapidTime) / 60000;
            if (minutesElapsed < 240) {
                const peakEffect = this.gameState.insulinOnBoard.rapid * 50;
                const timeEffect = Math.sin((minutesElapsed / 240) * Math.PI);
                effect += peakEffect * timeEffect;
            }
        }
        
        // Long acting insulin
        if (this.gameState.insulinOnBoard.longTime) {
            const minutesElapsed = (now - this.gameState.insulinOnBoard.longTime) / 60000;
            if (minutesElapsed < 1440) {
                effect += this.gameState.insulinOnBoard.long * 0.5;
            }
        }
        
        return effect;
    }
    
    updateInsulinOnBoard() {
        const now = this.gameState.gameTime;
        
        // Decay rapid acting insulin
        if (this.gameState.insulinOnBoard.rapidTime) {
            const minutesElapsed = (now - this.gameState.insulinOnBoard.rapidTime) / 60000;
            if (minutesElapsed >= 240) {
                this.gameState.insulinOnBoard.rapid = 0;
                this.gameState.insulinOnBoard.rapidTime = null;
            }
        }
        
        // Decay long acting insulin
        if (this.gameState.insulinOnBoard.longTime) {
            const minutesElapsed = (now - this.gameState.insulinOnBoard.longTime) / 60000;
            if (minutesElapsed >= 1440) {
                this.gameState.insulinOnBoard.long = 0;
                this.gameState.insulinOnBoard.longTime = null;
            }
        }
    }
    
    updateTimeInRange() {
        const inRange = this.gameState.bgHistory.filter(entry => 
            entry.value >= this.gameData.bloodGlucoseRanges.targetMin && 
            entry.value <= this.gameData.bloodGlucoseRanges.targetMax
        ).length;
        
        this.gameState.timeInRange = Math.round((inRange / this.gameState.bgHistory.length) * 100);
    }
    
    checkForEmergencies() {
        const bg = this.gameState.bloodGlucose;
        
        if (bg < this.gameData.bloodGlucoseRanges.low) {
            this.triggerEmergency('low');
        } else if (bg > this.gameData.bloodGlucoseRanges.high) {
            this.triggerEmergency('high');
        }
    }
    
    triggerEmergency(type) {
        const emergencyMessages = {
            low: {
                title: "저혈당 경고!",
                message: "혈당이 70mg/dL 이하입니다. 즉시 빠른 탄수화물을 섭취하세요!",
                actions: ["포도당 정제 섭취", "오렌지 주스 마시기", "사탕 먹기"]
            },
            high: {
                title: "고혈당 경고!",
                message: "혈당이 250mg/dL 이상입니다. 수분 섭취와 인슐린 주사를 고려하세요.",
                actions: ["물 마시기", "인슐린 주사", "의료진 연락"]
            }
        };
        
        const emergency = emergencyMessages[type];
        this.showEmergencyModal(emergency);
    }
    
    showEmergencyModal(emergency) {
        const modal = document.getElementById('actionModal');
        const content = document.getElementById('modalContent');
        
        content.innerHTML = `
            <div class="emergency-alert ${emergency.title.includes('저혈당') ? 'error' : 'warning'}">
                <h3>${emergency.title}</h3>
                <p>${emergency.message}</p>
                <div class="emergency-actions">
                    ${emergency.actions.map(action => 
                        `<button class="btn btn--primary btn--sm" onclick="handleEmergencyAction('${action}')">${action}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }
    
    updateDisplay() {
        // Update header stats
        document.getElementById('currentBG').textContent = Math.round(this.gameState.bloodGlucose);
        document.getElementById('gameTime').textContent = this.formatTime(this.gameState.gameTime);
        document.getElementById('energy').textContent = this.gameState.energy;
        
        // Update dashboard
        document.getElementById('dashboardBG').textContent = Math.round(this.gameState.bloodGlucose);
        document.getElementById('bgStatus').textContent = this.getBGStatus();
        document.getElementById('bgStatus').className = `bg-status ${this.getBGStatusClass()}`;
        
        // Update insulin times
        document.getElementById('longActingTime').textContent = this.getInsulinTimeText('long');
        document.getElementById('rapidActingTime').textContent = this.getInsulinTimeText('rapid');
        
        // Update meal info
        document.getElementById('nextMeal').textContent = this.getNextMealText();
        document.getElementById('dailyCarbs').textContent = this.gameState.dailyStats.carbs + 'g';
        
        // Update activity
        document.getElementById('dailyActivity').textContent = this.getDailyActivityText();
        document.getElementById('activityEnergy').textContent = this.gameState.energy + '%';
        
        // Update footer stats
        document.getElementById('timeInRange').textContent = this.gameState.timeInRange + '%';
        document.getElementById('managementScore').textContent = this.gameState.managementScore;
    }
    
    getBGStatus() {
        const bg = this.gameState.bloodGlucose;
        if (bg < this.gameData.bloodGlucoseRanges.low) return '저혈당';
        if (bg > this.gameData.bloodGlucoseRanges.high) return '고혈당';
        if (bg >= this.gameData.bloodGlucoseRanges.targetMin && bg <= this.gameData.bloodGlucoseRanges.targetMax) return '정상';
        return '주의';
    }
    
    getBGStatusClass() {
        const bg = this.gameState.bloodGlucose;
        if (bg < this.gameData.bloodGlucoseRanges.low) return 'low';
        if (bg > this.gameData.bloodGlucoseRanges.high) return 'high';
        return 'normal';
    }
    
    getInsulinTimeText(type) {
        const time = this.gameState.insulinOnBoard[type + 'Time'];
        if (!time) return '주사 필요';
        
        const hoursAgo = Math.floor((this.gameState.gameTime - time) / 3600000);
        if (hoursAgo < 1) return '방금 전';
        return `${hoursAgo}시간 전`;
    }
    
    getNextMealText() {
        const hour = this.gameState.gameTime.getHours();
        if (hour < 8) return '아침 (08:00)';
        if (hour < 12) return '점심 (12:00)';
        if (hour < 18) return '저녁 (18:00)';
        return '야식 (21:00)';
    }
    
    getDailyActivityText() {
        const activities = this.gameState.dailyStats.activities;
        if (activities.length === 0) return '활동 없음';
        return activities[activities.length - 1].name + ' ' + activities[activities.length - 1].duration + '분';
    }
    
    formatTime(date) {
        return date.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }
    
    showRandomTip() {
        const tips = this.gameData.tips;
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        document.getElementById('dailyTip').textContent = randomTip;
    }
    
    // Save/Load functionality
    saveGame() {
        const saveData = {
            gameState: this.gameState,
            timestamp: new Date().toISOString()
        };
        
        try {
            const jsonData = JSON.stringify(saveData);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `diabetes-sim-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            this.showMessage('게임이 저장되었습니다!', 'success');
        } catch (error) {
            this.showMessage('저장 중 오류가 발생했습니다.', 'error');
        }
    }
    
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `status status--${type}`;
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.zIndex = '1001';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Global game instance
let game;

// Screen navigation functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    showScreen('characterSetup');
}

function startTutorial() {
    showScreen('tutorialScreen');
    game = new DiabetesSimulation();
}

function loadGame() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const saveData = JSON.parse(e.target.result);
                    game = new DiabetesSimulation();
                    game.gameState = saveData.gameState;
                    game.updateDisplay();
                    showScreen('gameDashboard');
                    game.showMessage('게임이 불러와졌습니다!', 'success');
                } catch (error) {
                    alert('잘못된 저장 파일입니다.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function finishSetup() {
    const name = document.getElementById('characterName').value;
    const age = parseInt(document.getElementById('characterAge').value);
    const monitoring = document.getElementById('monitoringMethod').value;
    const difficulty = document.getElementById('difficulty').value;
    
    if (!name.trim()) {
        alert('이름을 입력해주세요.');
        return;
    }
    
    game = new DiabetesSimulation();
    game.gameState.character = { name, age, monitoringMethod: monitoring, difficulty };
    
    showScreen('gameDashboard');
    game.showMessage(`${name}님, 환영합니다!`, 'success');
}

// Tutorial functions
function nextTutorial() {
    const currentStep = document.querySelector('.tutorial-step.active');
    const nextStep = currentStep.nextElementSibling;
    
    if (nextStep && nextStep.classList.contains('tutorial-step')) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        
        if (nextStep.dataset.step == 5) {
            document.querySelector('.tutorial-nav .btn--primary').textContent = '완료';
            document.querySelector('.tutorial-nav .btn--primary').onclick = finishTutorial;
        }
    }
}

function prevTutorial() {
    const currentStep = document.querySelector('.tutorial-step.active');
    const prevStep = currentStep.previousElementSibling;
    
    if (prevStep && prevStep.classList.contains('tutorial-step')) {
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
        
        document.querySelector('.tutorial-nav .btn--primary').textContent = '다음';
        document.querySelector('.tutorial-nav .btn--primary').onclick = nextTutorial;
    }
}

function skipTutorial() {
    showScreen('characterSetup');
}

function finishTutorial() {
    showScreen('characterSetup');
}

// Game action functions
function checkBloodGlucose() {
    if (!game) return;
    
    game.gameState.dailyStats.bgChecks++;
    game.gameState.managementScore += 2;
    
    const modal = document.getElementById('actionModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3>혈당 측정 결과</h3>
        <div class="bg-display">
            <div class="bg-value">${Math.round(game.gameState.bloodGlucose)}</div>
            <div class="bg-status ${game.getBGStatusClass()}">${game.getBGStatus()}</div>
        </div>
        <p>측정 시간: ${game.formatTime(game.gameState.gameTime)}</p>
        <button class="btn btn--primary" onclick="closeModal()">확인</button>
    `;
    
    modal.classList.add('active');
}

function injectInsulin(type) {
    if (!game) return;
    
    const modal = document.getElementById('actionModal');
    const content = document.getElementById('modalContent');
    
    const insulinInfo = game.gameData.insulinTypes[type === 'rapid' ? 'rapidActing' : 'longActing'];
    
    content.innerHTML = `
        <h3>${insulinInfo.name} 주사</h3>
        <div class="insulin-calculator">
            <div class="calculator-row">
                <span>현재 혈당:</span>
                <span>${Math.round(game.gameState.bloodGlucose)} mg/dL</span>
            </div>
            <div class="calculator-row">
                <span>주사 단위:</span>
                <input type="number" id="insulinUnits" class="calculator-input" min="1" max="20" value="4">
            </div>
            <div class="calculator-row">
                <span>예상 효과:</span>
                <span id="expectedEffect">-40 mg/dL</span>
            </div>
        </div>
        <div style="margin-top: 16px;">
            <button class="btn btn--primary" onclick="confirmInsulinInjection('${type}')">주사하기</button>
            <button class="btn btn--secondary" onclick="closeModal()">취소</button>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Update expected effect when units change
    document.getElementById('insulinUnits').addEventListener('input', function() {
        const units = parseInt(this.value) || 0;
        const effect = type === 'rapid' ? units * 50 : units * 30;
        document.getElementById('expectedEffect').textContent = `-${effect} mg/dL`;
    });
}

function confirmInsulinInjection(type) {
    const units = parseInt(document.getElementById('insulinUnits').value) || 0;
    
    if (units <= 0) {
        alert('올바른 단위를 입력해주세요.');
        return;
    }
    
    if (type === 'rapid') {
        game.gameState.insulinOnBoard.rapid = units;
        game.gameState.insulinOnBoard.rapidTime = new Date(game.gameState.gameTime);
    } else {
        game.gameState.insulinOnBoard.long = units;
        game.gameState.insulinOnBoard.longTime = new Date(game.gameState.gameTime);
    }
    
    game.gameState.managementScore += 3;
    game.showMessage(`${type === 'rapid' ? '초속효성' : '지속형'} 인슐린 ${units}단위 주사 완료!`, 'success');
    
    closeModal();
}

function eatMeal() {
    if (!game) return;
    
    const modal = document.getElementById('actionModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3>식사 선택</h3>
        <div class="food-grid">
            ${game.gameData.koreanFoods.map(food => `
                <div class="food-item" onclick="selectFood('${food.name}', ${food.carbs}, '${food.portion}')">
                    <div class="food-name">${food.name}</div>
                    <div class="food-carbs">탄수화물: ${food.carbs}g</div>
                    <div class="food-portion">${food.portion}</div>
                </div>
            `).join('')}
        </div>
        <div id="selectedFoods" style="margin-top: 16px;"></div>
        <div style="margin-top: 16px;">
            <button class="btn btn--primary" onclick="confirmMeal()">식사 완료</button>
            <button class="btn btn--secondary" onclick="closeModal()">취소</button>
        </div>
    `;
    
    modal.classList.add('active');
}

let selectedFoods = [];

function selectFood(name, carbs, portion) {
    selectedFoods.push({ name, carbs, portion });
    updateSelectedFoods();
}

function updateSelectedFoods() {
    const container = document.getElementById('selectedFoods');
    const totalCarbs = selectedFoods.reduce((sum, food) => sum + food.carbs, 0);
    
    container.innerHTML = `
        <h4>선택된 음식:</h4>
        ${selectedFoods.map((food, index) => `
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                <span>${food.name} (${food.portion})</span>
                <span>${food.carbs}g</span>
            </div>
        `).join('')}
        <hr>
        <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>총 탄수화물:</span>
            <span>${totalCarbs}g</span>
        </div>
    `;
}

function confirmMeal() {
    if (selectedFoods.length === 0) {
        alert('음식을 선택해주세요.');
        return;
    }
    
    const totalCarbs = selectedFoods.reduce((sum, food) => sum + food.carbs, 0);
    
    // Increase blood glucose based on carbs
    game.gameState.bloodGlucose += totalCarbs * 3; // 3mg/dL per gram of carbs
    game.gameState.dailyStats.carbs += totalCarbs;
    game.gameState.dailyStats.meals++;
    
    game.gameState.managementScore += 1;
    game.showMessage(`식사 완료! 탄수화물 ${totalCarbs}g 섭취`, 'success');
    
    selectedFoods = [];
    closeModal();
}

function doActivity() {
    if (!game) return;
    
    const modal = document.getElementById('actionModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3>활동 선택</h3>
        <div class="activity-grid">
            ${game.gameData.activities.map(activity => `
                <div class="activity-item-card" onclick="selectActivity('${activity.name}', ${activity.bgEffect}, ${activity.duration})">
                    <div class="activity-name">${activity.name}</div>
                    <div class="activity-intensity">강도: ${activity.intensity}</div>
                    <div class="activity-effect">혈당 효과: ${activity.bgEffect}mg/dL</div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 16px;">
            <button class="btn btn--secondary" onclick="closeModal()">취소</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function selectActivity(name, bgEffect, duration) {
    // Check if blood glucose is too low for exercise
    if (game.gameState.bloodGlucose < 100) {
        alert('운동 전 혈당이 너무 낮습니다. 간식을 드시고 운동하세요.');
        return;
    }
    
    game.gameState.bloodGlucose += bgEffect;
    game.gameState.energy = Math.max(0, game.gameState.energy - 15);
    game.gameState.dailyStats.activities.push({ name, duration, time: new Date(game.gameState.gameTime) });
    
    game.gameState.managementScore += 2;
    game.showMessage(`${name} ${duration}분 완료!`, 'success');
    
    closeModal();
}

function handleEmergencyAction(action) {
    if (action.includes('포도당') || action.includes('주스') || action.includes('사탕')) {
        game.gameState.bloodGlucose += 45; // Fast carbs effect
        game.showMessage('빠른 탄수화물 섭취 완료!', 'success');
    } else if (action.includes('인슐린')) {
        game.gameState.insulinOnBoard.rapid = 3;
        game.gameState.insulinOnBoard.rapidTime = new Date(game.gameState.gameTime);
        game.showMessage('인슐린 주사 완료!', 'success');
    } else if (action.includes('물')) {
        game.gameState.energy += 5;
        game.showMessage('충분한 수분 섭취!', 'success');
    }
    
    closeModal();
}

function viewBGHistory() {
    const modal = document.getElementById('actionModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3>혈당 기록</h3>
        <div class="bg-chart-container">
            <div class="bg-chart">혈당 그래프 (최근 24시간)</div>
        </div>
        <div style="margin-top: 16px;">
            <p>목표 범위 내 시간: ${game.gameState.timeInRange}%</p>
            <p>평균 혈당: ${Math.round(game.gameState.bgHistory.reduce((sum, entry) => sum + entry.value, 0) / game.gameState.bgHistory.length)}mg/dL</p>
        </div>
        <button class="btn btn--primary" onclick="closeModal()">확인</button>
    `;
    
    modal.classList.add('active');
}

function viewFoodDiary() {
    const modal = document.getElementById('actionModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3>식단 일기</h3>
        <div>
            <p>오늘 섭취한 탄수화물: ${game.gameState.dailyStats.carbs}g</p>
            <p>식사 횟수: ${game.gameState.dailyStats.meals}회</p>
            <p>권장 일일 탄수화물: 200-300g</p>
        </div>
        <button class="btn btn--primary" onclick="closeModal()">확인</button>
    `;
    
    modal.classList.add('active');
}

function viewActivityLog() {
    const modal = document.getElementById('actionModal');
    const content = document.getElementById('modalContent');
    
    const activities = game.gameState.dailyStats.activities;
    
    content.innerHTML = `
        <h3>활동 기록</h3>
        <div>
            ${activities.length > 0 ? activities.map(activity => `
                <div style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">
                    <strong>${activity.name}</strong> - ${activity.duration}분
                    <br><small>${activity.time.toLocaleTimeString('ko-KR')}</small>
                </div>
            `).join('') : '<p>오늘 활동이 없습니다.</p>'}
        </div>
        <button class="btn btn--primary" onclick="closeModal()">확인</button>
    `;
    
    modal.classList.add('active');
}

function advanceTime() {
    if (!game) return;
    
    const newTime = new Date(game.gameState.gameTime.getTime() + 3600000); // Add 1 hour
    game.gameState.gameTime = newTime;
    game.showMessage('시간이 1시간 진행되었습니다.', 'info');
}

function pauseGame() {
    if (!game) return;
    
    game.gameState.isPaused = !game.gameState.isPaused;
    const button = event.target;
    button.textContent = game.gameState.isPaused ? '재개' : '일시정지';
    
    game.showMessage(game.gameState.isPaused ? '게임 일시정지' : '게임 재개', 'info');
}

function saveGame() {
    if (!game) return;
    game.saveGame();
}

function closeModal() {
    document.getElementById('actionModal').classList.remove('active');
}

// Initialize the game when page loads
window.addEventListener('load', function() {
    // Show welcome screen initially
    showScreen('welcomeScreen');
});