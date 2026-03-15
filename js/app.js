// Dopamine Type Test - What's Your Dopamine Profile?
// 8 questions, 6 types, score-based classification

const QUESTIONS = [
    { id: 0, questionKey: 'q.0', options: ['0a', '0b', '0c', '0d'] },
    { id: 1, questionKey: 'q.1', options: ['1a', '1b', '1c', '1d'] },
    { id: 2, questionKey: 'q.2', options: ['2a', '2b', '2c', '2d'] },
    { id: 3, questionKey: 'q.3', options: ['3a', '3b', '3c', '3d'] },
    { id: 4, questionKey: 'q.4', options: ['4a', '4b', '4c', '4d'] },
    { id: 5, questionKey: 'q.5', options: ['5a', '5b', '5c', '5d'] },
    { id: 6, questionKey: 'q.6', options: ['6a', '6b', '6c', '6d'] },
    { id: 7, questionKey: 'q.7', options: ['7a', '7b', '7c', '7d'] }
];

// Each option maps to [thrillSeeker, deepDiver, socialSpark, comfortCreator, challengeChaser, noveltyHunter]
const SCORE_MAP = {
    // Q0: What energizes you most on a weekend?
    '0a': [3, 0, 1, 0, 2, 1], // extreme sports / thrill
    '0b': [0, 3, 0, 1, 1, 2], // deep focus project
    '0c': [1, 0, 3, 0, 0, 1], // big social gathering
    '0d': [0, 1, 0, 3, 1, 0], // cozy routine at home

    // Q1: How do you approach a new challenge?
    '1a': [2, 0, 0, 0, 3, 1], // set goals, compete
    '1b': [0, 2, 1, 0, 1, 3], // explore all angles first
    '1c': [3, 0, 1, 0, 2, 0], // dive in head-first
    '1d': [0, 1, 2, 3, 0, 0], // plan carefully, stay safe

    // Q2: What kind of content hooks you?
    '2a': [1, 0, 3, 0, 1, 2], // viral social trends
    '2b': [0, 3, 0, 1, 2, 0], // deep documentaries
    '2c': [2, 0, 0, 0, 3, 1], // competitive sports
    '2d': [0, 1, 0, 3, 0, 2], // calming ASMR / lo-fi

    // Q3: Your ideal vacation?
    '3a': [3, 0, 1, 0, 1, 2], // skydiving, bungee
    '3b': [0, 0, 3, 1, 0, 2], // party city with friends
    '3c': [0, 2, 0, 3, 1, 0], // cabin retreat, nature
    '3d': [1, 1, 0, 0, 0, 3], // unplanned backpacking

    // Q4: What motivates you at work/school?
    '4a': [0, 0, 0, 1, 3, 2], // beating targets, rankings
    '4b': [0, 3, 1, 0, 2, 0], // mastering a skill
    '4c': [1, 0, 3, 0, 0, 1], // team energy, praise
    '4d': [2, 0, 0, 3, 0, 1], // stable routine, comfort

    // Q5: How do you handle stress?
    '5a': [3, 0, 0, 1, 1, 1], // intense workout
    '5b': [0, 1, 3, 0, 0, 1], // talk it out with friends
    '5c': [0, 3, 0, 2, 1, 0], // meditate, journal
    '5d': [1, 0, 0, 0, 2, 3], // try something completely new

    // Q6: Pick a superpower
    '6a': [3, 0, 1, 0, 2, 0], // super speed
    '6b': [0, 3, 0, 1, 1, 1], // time freeze (deep focus)
    '6c': [0, 0, 3, 1, 0, 2], // telepathy
    '6d': [1, 0, 0, 0, 1, 3], // teleportation (explore)

    // Q7: What makes you happiest?
    '7a': [2, 0, 0, 0, 3, 1], // winning a competition
    '7b': [0, 1, 0, 3, 0, 1], // a perfect cozy evening
    '7c': [1, 0, 3, 0, 1, 1], // making everyone laugh
    '7d': [0, 3, 0, 0, 1, 2]  // discovering something new
};

const TYPE_ORDER = ['thrillSeeker', 'deepDiver', 'socialSpark', 'comfortCreator', 'challengeChaser', 'noveltyHunter'];

const TYPES = {
    thrillSeeker: {
        emoji: '\u26A1',
        nameKey: 'type.thrillSeeker.name',
        descKey: 'type.thrillSeeker.desc',
        color: '#ef4444'
    },
    deepDiver: {
        emoji: '\u{1F30A}',
        nameKey: 'type.deepDiver.name',
        descKey: 'type.deepDiver.desc',
        color: '#3b82f6'
    },
    socialSpark: {
        emoji: '\u2728',
        nameKey: 'type.socialSpark.name',
        descKey: 'type.socialSpark.desc',
        color: '#f59e0b'
    },
    comfortCreator: {
        emoji: '\u{1F3E1}',
        nameKey: 'type.comfortCreator.name',
        descKey: 'type.comfortCreator.desc',
        color: '#10b981'
    },
    challengeChaser: {
        emoji: '\u{1F3D4}\uFE0F',
        nameKey: 'type.challengeChaser.name',
        descKey: 'type.challengeChaser.desc',
        color: '#8b5cf6'
    },
    noveltyHunter: {
        emoji: '\u{1F52E}',
        nameKey: 'type.noveltyHunter.name',
        descKey: 'type.noveltyHunter.desc',
        color: '#ec4899'
    }
};

const METRICS = {
    thrillSeeker:    { dopamine: 95, serotonin: 40, adrenaline: 98, oxytocin: 35, endorphin: 85 },
    deepDiver:       { dopamine: 88, serotonin: 90, adrenaline: 30, oxytocin: 50, endorphin: 75 },
    socialSpark:     { dopamine: 85, serotonin: 70, adrenaline: 50, oxytocin: 95, endorphin: 80 },
    comfortCreator:  { dopamine: 70, serotonin: 95, adrenaline: 20, oxytocin: 85, endorphin: 90 },
    challengeChaser: { dopamine: 92, serotonin: 55, adrenaline: 80, oxytocin: 40, endorphin: 70 },
    noveltyHunter:   { dopamine: 90, serotonin: 45, adrenaline: 65, oxytocin: 55, endorphin: 60 }
};

class DopamineTypeApp {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = [0, 0, 0, 0, 0, 0]; // 6 types
        this.resultType = null;
        this.resultTypeKey = null;
    }

    async init() {
        try {
            if (window.i18n) {
                await window.i18n.init();
            }
        } catch (e) {
            // i18n init failed — continue without translations
        }

        this.bindEvents();
        this.initTheme();
        this.hideLoader();

        if (typeof gtag === 'function') {
            gtag('event', 'page_view', { page_title: 'Dopamine Type Test' });
        }
    }

    t(key) {
        if (window.i18n && typeof window.i18n.t === 'function') {
            return window.i18n.t(key);
        }
        return key;
    }

    bindEvents() {
        var self = this;

        var startBtn = document.getElementById('start-btn');
        if (startBtn) startBtn.addEventListener('click', function() { self.startQuiz(); });

        var restartBtn = document.getElementById('restart-btn');
        if (restartBtn) restartBtn.addEventListener('click', function() { self.restart(); });

        var themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.addEventListener('click', function() { self.toggleTheme(); });

        // Language
        var langToggle = document.getElementById('lang-toggle');
        var langMenu = document.getElementById('lang-menu');
        if (langToggle && langMenu) {
            langToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                langMenu.classList.toggle('hidden');
            });
            document.querySelectorAll('.lang-option').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var lang = btn.getAttribute('data-lang');
                    if (window.i18n) window.i18n.setLanguage(lang);
                    langMenu.classList.add('hidden');
                });
            });
            document.addEventListener('click', function() { langMenu.classList.add('hidden'); });
        }

        // Share buttons
        var shareKakao = document.getElementById('share-kakao');
        if (shareKakao) shareKakao.addEventListener('click', function() { self.shareKakao(); });

        var shareTwitter = document.getElementById('share-twitter');
        if (shareTwitter) shareTwitter.addEventListener('click', function() { self.shareTwitter(); });

        var shareFacebook = document.getElementById('share-facebook');
        if (shareFacebook) shareFacebook.addEventListener('click', function() { self.shareFacebook(); });

        var shareCopy = document.getElementById('share-copy');
        if (shareCopy) shareCopy.addEventListener('click', function() { self.shareCopy(); });
    }

    hideLoader() {
        var loader = document.getElementById('app-loader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('hidden');
                setTimeout(function() { loader.style.display = 'none'; }, 400);
            }, 600);
        }
    }

    initTheme() {
        var saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            var toggle = document.getElementById('theme-toggle');
            if (toggle) toggle.textContent = '\u2600';
        }
    }

    toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        var toggle = document.getElementById('theme-toggle');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            if (toggle) toggle.textContent = '\u{1F319}';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (toggle) toggle.textContent = '\u2600';
            localStorage.setItem('theme', 'light');
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
        var screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = [0, 0, 0, 0, 0, 0];
        this.showScreen('question-screen');
        this.renderQuestion();

        if (typeof gtag === 'function') {
            gtag('event', 'quiz_start', { event_category: 'dopamine_type' });
        }
    }

    renderQuestion() {
        var q = QUESTIONS[this.currentQuestion];
        var self = this;

        // Progress
        var fill = document.getElementById('progress-fill');
        if (fill) fill.style.width = ((this.currentQuestion / QUESTIONS.length) * 100) + '%';

        var counter = document.getElementById('q-current');
        if (counter) counter.textContent = this.currentQuestion + 1;

        var total = document.getElementById('q-total');
        if (total) total.textContent = QUESTIONS.length;

        // Question text
        var text = document.getElementById('question-text');
        if (text) text.textContent = this.t(q.questionKey);

        // Options
        var container = document.getElementById('options-container');
        if (!container) return;
        container.innerHTML = '';

        var labels = ['A', 'B', 'C', 'D'];
        q.options.forEach(function(optKey, idx) {
            var btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = '<span class="option-label">' + labels[idx] + '</span><span class="option-text">' + self.t('q.' + optKey) + '</span>';
            btn.addEventListener('click', function() { self.selectOption(q.id, idx, btn); });
            container.appendChild(btn);
        });
    }

    selectOption(questionId, optionIdx, btn) {
        // Prevent double-click
        if (this._transitioning) return;
        this._transitioning = true;

        // Visual feedback
        document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');

        // Add scores
        var scoreKey = questionId + String.fromCharCode(97 + optionIdx);
        var scoreAdd = SCORE_MAP[scoreKey];
        if (scoreAdd) {
            for (var i = 0; i < 6; i++) {
                this.scores[i] += scoreAdd[i];
            }
        }

        this.answers.push({ question: questionId, option: optionIdx });

        var self = this;
        setTimeout(function() {
            self._transitioning = false;
            self.currentQuestion++;
            if (self.currentQuestion < QUESTIONS.length) {
                self.renderQuestion();
            } else {
                self.showAnalyzing();
            }
        }, 400);
    }

    showAnalyzing() {
        this.showScreen('analyzing-screen');

        var fill = document.getElementById('analyzing-fill');
        var percent = document.getElementById('analyzing-percent');
        var detail = document.getElementById('analyzing-detail');
        var self = this;

        var stepEls = [
            document.getElementById('step-1'),
            document.getElementById('step-2'),
            document.getElementById('step-3')
        ];
        var pcts = [30, 65, 100];

        var step = 0;
        var interval = setInterval(function() {
            if (step >= 3) {
                clearInterval(interval);
                setTimeout(function() { self.showResult(); }, 500);
                return;
            }
            if (fill) fill.style.width = pcts[step] + '%';
            // Activate current step, mark previous as done
            stepEls.forEach(function(el, idx) {
                if (!el) return;
                el.classList.remove('active', 'done');
                if (idx < step) el.classList.add('done');
                if (idx === step) el.classList.add('active');
            });
            step++;
        }, 800);
    }

    calculateResult() {
        var maxScore = -1;
        var maxIdx = 0;
        for (var i = 0; i < 6; i++) {
            if (this.scores[i] > maxScore) {
                maxScore = this.scores[i];
                maxIdx = i;
            }
        }
        return TYPE_ORDER[maxIdx];
    }

    showResult() {
        this.resultTypeKey = this.calculateResult();
        this.resultType = TYPES[this.resultTypeKey];
        var type = this.resultType;
        var typeKey = this.resultTypeKey;

        this.showScreen('result-screen');

        // Emoji
        var emoji = document.getElementById('result-emoji');
        if (emoji) emoji.textContent = type.emoji;

        // Title
        var title = document.getElementById('result-title');
        if (title) title.textContent = this.t(type.nameKey);

        // Description
        var desc = document.getElementById('result-description');
        if (desc) desc.textContent = this.t(type.descKey);

        // Metrics bars
        var metricsGrid = document.getElementById('metrics-grid');
        if (metricsGrid) {
            metricsGrid.innerHTML = '';
            var metrics = METRICS[typeKey];
            var metricKeys = ['dopamine', 'serotonin', 'adrenaline', 'oxytocin', 'endorphin'];
            var self = this;

            metricKeys.forEach(function(key) {
                var val = metrics[key];
                var row = document.createElement('div');
                row.className = 'metric-row';
                row.innerHTML =
                    '<span class="metric-label">' + self.t('metric.' + key) + '</span>' +
                    '<div class="metric-bar-bg"><div class="metric-bar-fill" style="background:' + type.color + '"></div></div>' +
                    '<span class="metric-value">' + val + '</span>';
                metricsGrid.appendChild(row);

                // Animate bar after append
                setTimeout(function() {
                    var barFill = row.querySelector('.metric-bar-fill');
                    if (barFill) barFill.style.width = val + '%';
                }, 100);
            });
        }

        // Confetti
        this.spawnConfetti();

        // GA4
        if (typeof gtag === 'function') {
            gtag('event', 'quiz_complete', {
                event_category: 'dopamine_type',
                event_label: typeKey,
                value: 1
            });
        }
    }

    spawnConfetti() {
        var container = document.getElementById('confetti-container');
        if (!container) return;
        container.innerHTML = '';

        var colors = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#FFD93D', '#00D4AA'];
        for (var i = 0; i < 50; i++) {
            var piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 2) + 's';
            piece.style.animationDuration = (2 + Math.random() * 2) + 's';
            container.appendChild(piece);
        }
    }

    restart() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = [0, 0, 0, 0, 0, 0];
        this.resultType = null;
        this.resultTypeKey = null;
        this.showScreen('start-screen');
        window.scrollTo(0, 0);
    }

    // Share helpers
    getShareText() {
        if (!this.resultType) return '';
        return this.t('share.text').replace('{type}', this.t(this.resultType.nameKey));
    }

    getShareUrl() {
        return 'https://dopabrain.com/dopamine-type/';
    }

    shareKakao() {
        if (typeof gtag === 'function') {
            gtag('event', 'share_click', { method: 'kakao', app_name: 'dopamine-type' });
        }
        var text = this.getShareText();
        var url = 'https://sharer.kakao.com/talk/friends/picker/link?url=' + encodeURIComponent(this.getShareUrl()) + '&text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'width=600,height=400');
    }

    shareTwitter() {
        if (typeof gtag === 'function') {
            gtag('event', 'share_click', { method: 'twitter', app_name: 'dopamine-type' });
        }
        var text = this.getShareText();
        var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(this.getShareUrl());
        window.open(url, '_blank', 'width=600,height=400');
    }

    shareFacebook() {
        if (typeof gtag === 'function') {
            gtag('event', 'share_click', { method: 'facebook', app_name: 'dopamine-type' });
        }
        var url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.getShareUrl());
        window.open(url, '_blank', 'width=600,height=400');
    }

    shareCopy() {
        if (typeof gtag === 'function') {
            gtag('event', 'share_click', { method: 'copy', app_name: 'dopamine-type' });
        }
        var text = this.getShareText() + ' ' + this.getShareUrl();
        var btn = document.getElementById('share-copy');
        try {
            navigator.clipboard.writeText(text).then(function() {
                if (btn) {
                    var original = btn.innerHTML;
                    btn.textContent = '\u2705 Copied!';
                    setTimeout(function() { btn.innerHTML = original; }, 2000);
                }
            }).catch(function() {
                fallbackCopy(text, btn);
            });
        } catch (e) {
            fallbackCopy(text, btn);
        }
    }
}

function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (btn) {
        var original = btn.innerHTML;
        btn.textContent = '\u2705 Copied!';
        setTimeout(function() { btn.innerHTML = original; }, 2000);
    }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        var app = new DopamineTypeApp();
        app.init();
    } catch (e) {
        // Ensure loader hides even on error
        var loader = document.getElementById('app-loader');
        if (loader) {
            loader.classList.add('hidden');
            loader.style.display = 'none';
        }
    }
});
