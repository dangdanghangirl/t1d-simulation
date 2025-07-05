// Type 1 Diabetes Simulation Game
class DiabetesSimulator {
    constructor() {
        this.gameState = {
            currentTime: 8 * 60, // 8:00 AM in minutes
            currentGlucose: 120,
            activeInsulin: 0,
            basalInsulin: 0,
            activeEffects: [],
            gameLog: [],
            selectedFood: null,
            chart: null
        };

        this.glucoseHistory = [];
        this.timeLabels = [];
        this.insulinData = this.loadInsulinData();
        this.foodData = this.loadFoodData();
        this.macronutrientData = this.loadMacronutrientData();
        
        this.init();
    }

    loadInsulinData() {
        return {
            rapid_acting: {
                onset: 15,
                peak: 60,
                duration: 240,
                effectiveness_curve: [0, 20, 80, 100, 80, 60, 40, 20, 10, 0]
            },
            long_acting: {
                onset: 120,
                peak: 0,
                duration: 1440,
                effectiveness_curve: [0, 0, 0, 0, 10, 40, 70, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 75, 70, 60, 50, 40, 30, 20, 10, 0]
            }
        };
    }

    loadFoodData() {
        return [
            { name: "백미밥 (200g)", carbs: 72, protein: 6, fat: 0.6 },
            { name: "김치찌개 (1인분)", carbs: 8, protein: 15, fat: 12 },
            { name: "불고기 (150g)", carbs: 8, protein: 35, fat: 15 },
            { name: "삼겹살 구이 (200g)", carbs: 0, protein: 34, fat: 58 },
            { name: "치킨 (순살 200g)", carbs: 15, protein: 40, fat: 25 },
            { name: "피자 (2조각)", carbs: 45, protein: 20, fat: 18 },
            { name: "된장찌개 (1인분)", carbs: 6, protein: 8, fat: 3 },
            { name: "잡곡밥 (200g)", carbs: 60, protein: 8, fat: 2 }
        ];
    }

    loadMacronutrientData() {
        return {
            carbohydrate: {
                glucose_conversion: 100,
                onset_time: 30,
                peak_time: 90,
                effect_duration: 180,
                calories_per_gram: 4
            },
            protein: {
                glucose_conversion: 50,
                onset_time: 180,
                peak_time: 300,
                effect_duration: 360,
                calories_per_gram: 4
            },
            fat: {
                glucose_conversion: 10,
                onset_time: 120,
                peak_time: 240,
                effect_duration: 300,
                calories_per_gram: 9,
                gastric_delay: true
            }
        };
    }

    init() {
        this.setupChart();
        this.setupEventListeners();
        this.updateDisplay();
        this.logEvent("게임을 시작했습니다. 혈당을 80-180 mg/dL 범위로 유지하세요.");
        
        // Initialize with some glucose history
        for (let i = 0; i < 10; i++) {
            this.timeLabels.push(this.formatTime(this.gameState.currentTime - (10 - i) * 30));
            this.glucoseHistory.push(120 + Math.random() * 20 - 10);
        }
        this.updateChart();
    }

    setupChart() {
        const ctx = document.getElementById('glucose-chart').getContext('2d');
        this.gameState.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.timeLabels,
                datasets: [{
                    label: '혈당 (mg/dL)',
                    data: this.glucoseHistory,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 300,
                        grid: {
                            color: function(context) {
                                if (context.tick.value === 80 || context.tick.value === 180) {
                                    return '#1FB8CD';
                                } else if (context.tick.value === 100 || context.tick.value === 140) {
                                    return '#B4413C';
                                }
                                return 'rgba(94, 82, 64, 0.2)';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return `시간: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `혈당: ${context.parsed.y.toFixed(1)} mg/dL`;
                            }
                        }
                    }
                }
            }
        });
    }

    setupEventListeners() {
        // Action buttons
        document.getElementById('meal-btn').addEventListener('click', () => this.openMealModal());
        document.getElementById('insulin-btn').addEventListener('click', () => this.openInsulinModal());
        document.getElementById('exercise-btn').addEventListener('click', () => this.handleExercise());
        document.getElementById('time-btn').addEventListener('click', () => this.advanceTime());

        // Modal controls
        document.getElementById('cancel-meal').addEventListener('click', () => this.closeMealModal());
        document.getElementById('confirm-meal').addEventListener('click', () => this.confirmMeal());
        document.getElementById('cancel-insulin').addEventListener('click', () => this.closeInsulinModal());
        document.getElementById('confirm-insulin').addEventListener('click', () => this.confirmInsulin());

        // Close modal buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                    if (modal.id === 'meal-modal') {
                        this.resetMealModal();
                    } else if (modal.id === 'insulin-modal') {
                        this.resetInsulinModal();
                    }
                }
            });
        });

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    if (modal.id === 'meal-modal') {
                        this.resetMealModal();
                    } else if (modal.id === 'insulin-modal') {
                        this.resetInsulinModal();
                    }
                }
            });
        });
    }

    openMealModal() {
        this.populateFoodGrid();
        this.resetNutritionInfo();
        document.getElementById('meal-modal').classList.remove('hidden');
    }

    closeMealModal() {
        document.getElementById('meal-modal').classList.add('hidden');
        this.resetMealModal();
    }

    resetMealModal() {
        this.gameState.selectedFood = null;
        this.resetNutritionInfo();
        document.querySelectorAll('.food-item').forEach(item => {
            item.classList.remove('selected');
        });
    }

    openInsulinModal() {
        document.getElementById('insulin-modal').classList.remove('hidden');
    }

    closeInsulinModal() {
        document.getElementById('insulin-modal').classList.add('hidden');
        this.resetInsulinModal();
    }

    resetInsulinModal() {
        document.getElementById('rapid-insulin').value = '0';
        document.getElementById('long-insulin').value = '0';
    }

    populateFoodGrid() {
        const grid = document.getElementById('food-grid');
        grid.innerHTML = '';

        this.foodData.forEach((food, index) => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';
            foodItem.innerHTML = `
                <h5>${food.name}</h5>
                <div class="food-nutrition">
                    <span>탄수화물: ${food.carbs}g</span>
                    <span>단백질: ${food.protein}g</span>
                    <span>지방: ${food.fat}g</span>
                </div>
            `;
            
            foodItem.addEventListener('click', () => {
                document.querySelectorAll('.food-item').forEach(item => {
                    item.classList.remove('selected');
                });
                foodItem.classList.add('selected');
                this.gameState.selectedFood = { ...food };
                this.updateNutritionInfo();
            });
            
            grid.appendChild(foodItem);
        });
    }

    resetNutritionInfo() {
        document.getElementById('carbs-amount').textContent = '0';
        document.getElementById('protein-amount').textContent = '0';
        document.getElementById('fat-amount').textContent = '0';
        document.getElementById('fpu-amount').textContent = '0.0';
        document.getElementById('carb-insulin').textContent = '0';
        document.getElementById('fpu-insulin').textContent = '0';
        document.getElementById('total-insulin').textContent = '0';
    }

    updateNutritionInfo() {
        const food = this.gameState.selectedFood;
        if (!food) {
            this.resetNutritionInfo();
            return;
        }

        // Update nutrition display
        document.getElementById('carbs-amount').textContent = food.carbs;
        document.getElementById('protein-amount').textContent = food.protein;
        document.getElementById('fat-amount').textContent = food.fat;

        // Calculate FPU
        const fpu = this.calculateFPU(food.protein, food.fat);
        document.getElementById('fpu-amount').textContent = fpu.toFixed(1);

        // Calculate insulin requirements
        const carbInsulin = this.calculateCarbInsulin(food.carbs);
        const fpuInsulin = this.calculateFPUInsulin(fpu);
        const totalInsulin = carbInsulin + fpuInsulin;

        document.getElementById('carb-insulin').textContent = carbInsulin.toFixed(1);
        document.getElementById('fpu-insulin').textContent = fpuInsulin.toFixed(1);
        document.getElementById('total-insulin').textContent = totalInsulin.toFixed(1);
    }

    calculateFPU(protein, fat) {
        const proteinCal = protein * 4;
        const fatCal = fat * 9;
        return (proteinCal + fatCal) / 100;
    }

    calculateCarbInsulin(carbs) {
        // Insulin-to-carb ratio of 1:10
        return carbs / 10;
    }

    calculateFPUInsulin(fpu) {
        // 1 FPU = 1 unit of insulin
        return fpu;
    }

    confirmMeal() {
        const food = this.gameState.selectedFood;
        if (!food) {
            alert('음식을 선택해주세요.');
            return;
        }

        const bolusType = document.querySelector('input[name="bolus-type"]:checked').value;
        const fpu = this.calculateFPU(food.protein, food.fat);
        
        // Add macronutrient effects
        this.addMacronutrientEffect('carbohydrate', food.carbs);
        this.addMacronutrientEffect('protein', food.protein);
        this.addMacronutrientEffect('fat', food.fat);

        // Auto-inject calculated insulin
        const carbInsulin = this.calculateCarbInsulin(food.carbs);
        const fpuInsulin = this.calculateFPUInsulin(fpu);
        
        if (bolusType === 'normal') {
            this.addInsulinEffect('rapid_acting', carbInsulin + fpuInsulin);
            this.logEvent(`${food.name} 섭취 (일반 주입: ${(carbInsulin + fpuInsulin).toFixed(1)} units)`);
        } else {
            // Extended bolus
            this.addInsulinEffect('rapid_acting', carbInsulin + fpuInsulin * 0.3);
            this.addExtendedBolusEffect(fpuInsulin * 0.7, this.getExtendedBolusDuration(fpu));
            this.logEvent(`${food.name} 섭취 (연장 주입: 즉시 ${(carbInsulin + fpuInsulin * 0.3).toFixed(1)} units, 연장 ${(fpuInsulin * 0.7).toFixed(1)} units)`);
        }

        this.closeMealModal();
        this.updateDisplay();
    }

    addMacronutrientEffect(type, amount) {
        const macro = this.macronutrientData[type];
        if (amount === 0) return;

        const effect = {
            type: 'macronutrient',
            macroType: type,
            amount: amount,
            startTime: this.gameState.currentTime,
            onsetTime: this.gameState.currentTime + macro.onset_time,
            peakTime: this.gameState.currentTime + macro.peak_time,
            endTime: this.gameState.currentTime + macro.effect_duration,
            conversion: macro.glucose_conversion
        };

        this.gameState.activeEffects.push(effect);
    }

    addInsulinEffect(type, units) {
        if (units === 0) return;

        const insulin = this.insulinData[type];
        const effect = {
            type: 'insulin',
            insulinType: type,
            units: units,
            startTime: this.gameState.currentTime,
            onsetTime: this.gameState.currentTime + insulin.onset,
            endTime: this.gameState.currentTime + insulin.duration,
            effectiveness: insulin.effectiveness_curve
        };

        this.gameState.activeEffects.push(effect);
    }

    addExtendedBolusEffect(units, duration) {
        const effect = {
            type: 'extended_bolus',
            units: units,
            duration: duration,
            startTime: this.gameState.currentTime,
            endTime: this.gameState.currentTime + duration,
            unitsPerMinute: units / duration
        };

        this.gameState.activeEffects.push(effect);
    }

    getExtendedBolusDuration(fpu) {
        if (fpu >= 4) return 480; // 8 hours
        if (fpu >= 3) return 300; // 5 hours
        if (fpu >= 2) return 240; // 4 hours
        return 180; // 3 hours
    }

    confirmInsulin() {
        const rapidUnits = parseFloat(document.getElementById('rapid-insulin').value) || 0;
        const longUnits = parseFloat(document.getElementById('long-insulin').value) || 0;

        if (rapidUnits > 0) {
            this.addInsulinEffect('rapid_acting', rapidUnits);
            this.logEvent(`속효성 인슐린 ${rapidUnits} units 주입`);
        }

        if (longUnits > 0) {
            this.addInsulinEffect('long_acting', longUnits);
            this.logEvent(`지속형 인슐린 ${longUnits} units 주입`);
        }

        if (rapidUnits === 0 && longUnits === 0) {
            alert('인슐린 용량을 입력해주세요.');
            return;
        }

        this.closeInsulinModal();
        this.updateDisplay();
    }

    handleExercise() {
        // Simple exercise effect - lowers glucose
        const glucoseReduction = 20 + Math.random() * 20;
        this.gameState.currentGlucose = Math.max(50, this.gameState.currentGlucose - glucoseReduction);
        this.logEvent(`운동으로 혈당 ${glucoseReduction.toFixed(1)} mg/dL 감소`);
        this.updateDisplay();
        this.updateChart();
    }

    advanceTime() {
        const timeStep = 30; // 30 minutes
        this.gameState.currentTime += timeStep;
        
        // Limit to 24 hours
        if (this.gameState.currentTime >= 24 * 60) {
            this.gameState.currentTime = 0;
        }

        this.simulateGlucoseChange();
        this.updateActiveEffects();
        this.updateDisplay();
        this.updateChart();
        
        this.logEvent(`시간이 ${this.formatTime(this.gameState.currentTime)}로 진행되었습니다.`);
    }

    simulateGlucoseChange() {
        let glucoseChange = 0;
        let activeInsulin = 0;

        // Natural glucose rise (dawn phenomenon, etc.)
        const hour = Math.floor(this.gameState.currentTime / 60);
        if (hour >= 4 && hour <= 8) {
            glucoseChange += 2; // Dawn phenomenon
        }

        // Natural glucose drift
        glucoseChange += (Math.random() - 0.5) * 4; // Random variation

        // Calculate effects from active effects
        this.gameState.activeEffects.forEach(effect => {
            if (effect.type === 'macronutrient') {
                const macroEffect = this.calculateMacronutrientEffect(effect);
                glucoseChange += macroEffect;
            } else if (effect.type === 'insulin') {
                const insulinEffect = this.calculateInsulinEffect(effect);
                activeInsulin += insulinEffect;
            } else if (effect.type === 'extended_bolus') {
                const bolusEffect = this.calculateExtendedBolusEffect(effect);
                activeInsulin += bolusEffect;
            }
        });

        // Apply insulin effect (lowers glucose)
        glucoseChange -= activeInsulin * 3; // 1 unit of insulin effect = 3 mg/dL reduction

        // Apply glucose change
        this.gameState.currentGlucose += glucoseChange;
        this.gameState.currentGlucose = Math.max(40, Math.min(400, this.gameState.currentGlucose));
        this.gameState.activeInsulin = activeInsulin;

        // Add to history
        this.timeLabels.push(this.formatTime(this.gameState.currentTime));
        this.glucoseHistory.push(this.gameState.currentGlucose);

        // Keep only last 20 data points
        if (this.timeLabels.length > 20) {
            this.timeLabels.shift();
            this.glucoseHistory.shift();
        }
    }

    calculateMacronutrientEffect(effect) {
        const currentTime = this.gameState.currentTime;
        
        if (currentTime < effect.onsetTime || currentTime > effect.endTime) {
            return 0;
        }

        const macro = this.macronutrientData[effect.macroType];
        const timeSinceOnset = currentTime - effect.onsetTime;
        const effectDuration = effect.endTime - effect.onsetTime;
        const timeToPeak = effect.peakTime - effect.onsetTime;

        let intensity;
        if (timeSinceOnset <= timeToPeak) {
            // Rising phase
            intensity = timeSinceOnset / timeToPeak;
        } else {
            // Falling phase
            intensity = 1 - (timeSinceOnset - timeToPeak) / (effectDuration - timeToPeak);
        }

        intensity = Math.max(0, Math.min(1, intensity));

        const maxEffect = effect.amount * (effect.conversion / 100) * 0.8; // Scale for realism
        return maxEffect * intensity;
    }

    calculateInsulinEffect(effect) {
        const currentTime = this.gameState.currentTime;
        
        if (currentTime < effect.onsetTime || currentTime > effect.endTime) {
            return 0;
        }

        const timeSinceOnset = currentTime - effect.onsetTime;
        const effectDuration = effect.endTime - effect.onsetTime;
        const curveIndex = Math.min(
            Math.floor((timeSinceOnset / effectDuration) * (effect.effectiveness.length - 1)),
            effect.effectiveness.length - 1
        );
        const effectiveness = effect.effectiveness[curveIndex] || 0;

        return effect.units * (effectiveness / 100);
    }

    calculateExtendedBolusEffect(effect) {
        const currentTime = this.gameState.currentTime;
        
        if (currentTime < effect.startTime || currentTime > effect.endTime) {
            return 0;
        }

        return effect.unitsPerMinute * 30; // 30 minutes step
    }

    updateActiveEffects() {
        this.gameState.activeEffects = this.gameState.activeEffects.filter(effect => {
            return this.gameState.currentTime < effect.endTime;
        });
    }

    updateDisplay() {
        document.getElementById('current-time').textContent = this.formatTime(this.gameState.currentTime);
        document.getElementById('current-glucose').textContent = Math.round(this.gameState.currentGlucose);
        document.getElementById('active-insulin').textContent = this.gameState.activeInsulin.toFixed(1);

        // Update glucose color based on range
        const glucoseElement = document.getElementById('current-glucose');
        glucoseElement.className = '';
        
        if (this.gameState.currentGlucose < 80) {
            glucoseElement.classList.add('glucose-low');
        } else if (this.gameState.currentGlucose > 180) {
            glucoseElement.classList.add('glucose-high');
        } else {
            glucoseElement.classList.add('glucose-normal');
        }

        // Add pulse animation for significant changes
        glucoseElement.classList.add('update-animation');
        setTimeout(() => {
            glucoseElement.classList.remove('update-animation');
        }, 500);
    }

    updateChart() {
        if (this.gameState.chart) {
            this.gameState.chart.data.labels = [...this.timeLabels];
            this.gameState.chart.data.datasets[0].data = [...this.glucoseHistory];
            this.gameState.chart.update('none');
        }
    }

    formatTime(minutes) {
        const hours = Math.floor(minutes / 60) % 24;
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    logEvent(message) {
        const time = this.formatTime(this.gameState.currentTime);
        const logEntry = `<p><span class="log-time">[${time}]</span> ${message}</p>`;
        this.gameState.gameLog.push(logEntry);
        
        const logContent = document.getElementById('log-content');
        logContent.innerHTML = this.gameState.gameLog.slice(-10).join('');
        logContent.scrollTop = logContent.scrollHeight;
    }
}

// 컴포넌트 HTML을 동적으로 불러와서 각 영역에 삽입
async function loadComponent(id, path) {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

async function loadAllComponents() {
    await Promise.all([
        loadComponent('current-status', 'components/CurrentStatus.html'),
        loadComponent('glucose-chart-area', 'components/GlucoseChart.html'),
        loadComponent('action-panel', 'components/ActionPanel.html'),
        loadComponent('meal-modal-area', 'components/MealModal.html'),
        loadComponent('insulin-modal-area', 'components/InsulinModal.html'),
        loadComponent('education-panel', 'components/EducationPanel.html'),
        loadComponent('game-log', 'components/GameLog.html'),
    ]);
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadAllComponents();
    // 모달이 항상 hidden 상태로 시작하도록 보장
    document.getElementById('meal-modal').classList.add('hidden');
    document.getElementById('insulin-modal').classList.add('hidden');
    // 시뮬레이터 초기화
    new DiabetesSimulator();
});