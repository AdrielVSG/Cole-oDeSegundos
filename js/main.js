console.log('Arquivo main.js carregado com sucesso!');

// Dados dos vídeos
const capsulesData = [
    {
        id: 'T-ASTRO',
        title: 'Viagem Espacial',
        description: 'Um astronauta deriva no silêncio cósmico enquanto nebulosas pulsantes iluminam a eternidade. Segure um fragmento do infinito em suas mãos.',
        image: 'https://source.unsplash.com/640x360/?astronaut,space',
        previewVideo: 'videos/Astrounata.mp4',
        fullVideo: 'videos/Astrounata.mp4',
        price: 39.99,
        year: 2025
    },
    {
        id: 'T-BLACK',
        title: 'O Buraco Negro',
        description: 'Horizontes de eventos dançam em espirais vorazes. Sinta a gravidade dobrar o destino — um sussurro do desconhecido absoluto.',
        image: 'https://source.unsplash.com/640x360/?black,hole,space',
        previewVideo: 'videos/BlackRole.mp4',
        fullVideo: 'videos/BlackRole.mp4',
        price: 49.99,
        year: 2025
    },
    {
        id: 'T-GATO',
        title: 'Gato Brincalhão',
        description: 'Entre dimensões, um felino ancestral caça constelações de lã. Doçura e mistério em um segundo eterno.',
        image: 'https://source.unsplash.com/640x360/?cat,playing',
        previewVideo: 'videos/cat.mp4',
        fullVideo: 'videos/cat.mp4',
        price: 24.99,
        year: 2025
    },
    {
        id: 'T-CACHORROS',
        title: 'Alegria Canina',
        description: 'Línguas ao vento, corações em hipersalto. Uma explosão de felicidade que atravessa eras.',
        image: 'https://source.unsplash.com/640x360/?dogs,playing',
        previewVideo: 'videos/Dogs.mp4',
        fullVideo: 'videos/Dogs.mp4',
        price: 29.99,
        year: 2025
    },
    {
        id: 'T-GOTA',
        title: 'A Queda da Gota',
        description: 'Uma gota desafia a gravidade e abre portais em vidro líquido. Poética, hipnótica, infinita.',
        image: 'https://source.unsplash.com/640x360/?water,drop',
        previewVideo: 'videos/Gota.mp4',
        fullVideo: 'videos/Gota.mp4',
        price: 19.99,
        year: 2025
    },
    {
        id: 'T-FOGO',
        title: 'Chamas Dançantes',
        description: 'Chamas sussurram segredos antigos enquanto moldam sombras no tecido do tempo. Um rito de luz e energia.',
        image: 'https://source.unsplash.com/640x360/?fire,flames',
        previewVideo: 'videos/fire.mp4',
        fullVideo: 'videos/fire.mp4',
        price: 27.99,
        year: 2025
    },
    {
        id: 'T-FELIZ',
        title: 'Momento de Alegria',
        description: 'Risos que furam a linha do tempo. A faísca rara da euforia humana, preservada em uma cápsula.',
        image: 'https://source.unsplash.com/640x360/?happy,celebration',
        previewVideo: 'videos/happyBardey.mp4',
        fullVideo: 'videos/happyBardey.mp4',
        price: 34.99,
        year: 2025
    },
    {
        id: 'T-VELA',
        title: 'Luz na Escuridão',
        description: 'Uma vela rasga a noite e desenha esperança no breu. Um farol íntimo na tempestade do universo.',
        image: 'https://source.unsplash.com/640x360/?candle,flame',
        previewVideo: 'videos/vela.mp4',
        fullVideo: 'videos/vela.mp4',
        price: 22.99,
        year: 2025
    }
];

// -----------------------------
// MODAL DO CARRINHO (sobreposto)
// -----------------------------
function openCartModal() {
    try { cart.updateUI(); } catch (_) {}
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;
    // Fecha outros modais
    try { closeCheckoutModal(); } catch (_) {}
    
    const closeBtn = cartModal.querySelector('.modal-close-button');
    if (closeBtn) closeBtn.onclick = closeCartModal;
    
    cartModal.classList.remove('hidden');
    cartModal.classList.add('active');
    Object.assign(cartModal.style, {
        display: 'flex',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '3000',
        justifyContent: 'center',
        alignItems: 'center'
    });
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch(_) { window.scrollTo(0,0); }
    document.body.classList.add('modal-open');
    // Clique fora fecha
    const outsideHandler = (e) => { if (e.target === cartModal) closeCartModal(); };
    cartModal._outsideHandler = outsideHandler;
    cartModal.addEventListener('click', outsideHandler);
}

// -----------------------------
// MÓDULO "VENDER SEU SEGUNDO"
// -----------------------------
function setupSellModal() {
    const form = document.getElementById('sell-form');
    const addBtn = document.getElementById('sell-add');
    const publishBtn = document.getElementById('sell-publish');
    const listEl = document.getElementById('sell-list');
    const countEl = document.getElementById('sell-count');
    if (!form || !addBtn || !publishBtn || !listEl || !countEl) {
        console.warn('SellModal: elementos não encontrados.');
        return;
    }

    function readForm() {
        const title = document.getElementById('sell-title')?.value?.trim() || '';
        const price = parseFloat(document.getElementById('sell-price')?.value || '0');
        const description = document.getElementById('sell-description')?.value?.trim() || '';
        const videoUrl = document.getElementById('sell-video-url')?.value?.trim() || '';
        return { title, price, description, videoUrl };
    }

    function clearForm() {
        form.reset();
    }

    function updateCount() {
        countEl.textContent = `${sellQueue.length} itens na fila`;
    }

    function renderSellList() {
        listEl.innerHTML = '';
        if (!sellQueue.length) {
            listEl.innerHTML = '<p class="text-sm text-gray-500">Nenhum item na fila. Adicione um segundo para publicar.</p>';
            updateCount();
            return;
        }
        sellQueue.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'cart-item flex items-start justify-between gap-4';
            div.innerHTML = `
                <div class="flex-1">
                    <div class="font-bold text-blue-300">${item.title || 'Segundo Sem Título'}</div>
                    <div class="text-xs text-gray-400 mt-1 line-clamp-2">${item.description || 'Sem descrição.'}</div>
                    <div class="text-xs text-gray-500 mt-1">Vídeo: ${item.videoUrl ? item.videoUrl : '—'}</div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-blue-200 font-mono">R$ ${(isNaN(item.price) ? 0 : item.price).toFixed(2)}</span>
                    <button class="remove-sell px-2 py-1 rounded bg-red-700/40 border border-red-500 text-red-200 hover:bg-red-700/60 transition text-xs" data-idx="${idx}">Remover</button>
                </div>
            `;
            listEl.appendChild(div);
        });
        if (window.feather) feather.replace();
        updateCount();
    }

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const item = readForm();
        if (!item.title || isNaN(item.price) || item.price < 0 || !item.description || !item.videoUrl) {
            // Apenas feedback visual simples
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
            playSound('glitch');
            return;
        }
        sellQueue.push(item);
        renderSellList();
        clearForm();
        playSound('upload');
    });

    // Remover item da fila
    listEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.remove-sell');
        if (!btn) return;
        const idx = parseInt(btn.getAttribute('data-idx') || '-1', 10);
        if (idx >= 0 && idx < sellQueue.length) {
            sellQueue.splice(idx, 1);
            renderSellList();
            playSound('click');
        }
    });

    // Publicar tudo (simulação animada)
    publishBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!sellQueue.length) {
            openTerminalModal('Publicação de Segundos', '<div class="text-center text-gray-400 font-mono">Nenhum item na fila para publicar.</div>');
            playSound('click');
            return;
        }

        const total = sellQueue.length;
        let html = `
            <div class="font-mono text-sm space-y-2">
                <div class="text-blue-300">Iniciando pipeline de publicação...</div>
                <div class="text-gray-300">Itens: ${total}</div>
                <div id="pub-steps" class="space-y-1 mt-3"></div>
                <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                    <div id="pub-progress" class="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style="width: 0%;"></div>
                </div>
            </div>
        `;
        openTerminalModal('Publicação de Segundos', html);

        const steps = [
            { text: 'Validando metadados...', delay: 600, sound: 'process' },
            { text: 'Transcodificando prévias...', delay: 900, sound: 'process' },
            { text: 'Gerando miniaturas holográficas...', delay: 900, sound: 'process' },
            { text: 'Assinando cápsulas temporais...', delay: 800, sound: 'process' },
            { text: 'Publicando no continuum...', delay: 800, sound: 'process' },
        ];

        const pubStepsEl = document.getElementById('pub-steps');
        const progressEl = document.getElementById('pub-progress');
        let i = 0;
        let progress = 0;

        function runNext() {
            if (!pubStepsEl || !progressEl) return;
            if (i >= steps.length) {
                progress = 100;
                progressEl.style.width = progress + '%';
                pubStepsEl.insertAdjacentHTML('beforeend', `<div class="text-green-400">Concluído! ${total} item(ns) publicado(s).</div>`);
                playSound('checkout');
                // Limpa fila após pequeno delay
                setTimeout(() => {
                    sellQueue = [];
                    renderSellList();
                }, 600);
                return;
            }
            const step = steps[i];
            pubStepsEl.insertAdjacentHTML('beforeend', `<div class="text-gray-300">[${String(i+1).padStart(2,'0')}] ${step.text}</div>`);
            playSound(step.sound);
            progress += Math.round(100 / (steps.length + 1));
            progressEl.style.width = Math.min(progress, 95) + '%';
            i++;
            setTimeout(runNext, step.delay);
        }

        runNext();
    });

    // Render inicial
    renderSellList();
}

// Delegação global: remover item do carrinho em qualquer estado do DOM
document.addEventListener('click', (e) => {
    const removeBtn = e.target.closest?.('.remove-item');
    if (removeBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = removeBtn.getAttribute('data-id');
        if (id && typeof cart?.removeItem === 'function') {
            cart.removeItem(id);
            try { playSound(sounds.remove); } catch(_) {}
        }
    }
});

// -----------------------------
// CONSOLE CRONOLÓGICO (Status/Logs/Cache)
// -----------------------------
function setupConsoleModules() {
    console.log('Inicializando módulos do console...');
    const statusModule = document.getElementById('status-module');
    const logsModule = document.getElementById('logs-module');
    const cacheModule = document.getElementById('cache-module');

    statusModule?.addEventListener('click', () => {
        const uptime = (performance.now() / 1000).toFixed(1) + 's';
        const content = `
            <div class="space-y-3 font-mono text-sm">
                <div class="flex items-center justify-between"><span class="text-blue-300">Estado do Sistema</span><span class="text-green-400 font-bold">OPERACIONAL</span></div>
                <div class="flex items-center justify-between"><span class="text-blue-300">Sincronização Temporal</span><span class="text-cyan-300">OK</span></div>
                <div class="flex items-center justify-between"><span class="text-blue-300">Uptime</span><span class="text-gray-300">${uptime}</span></div>
                <div class="flex items-center justify-between"><span class="text-blue-300">Cápsulas Disponíveis</span><span class="text-gray-300">${capsulesData.length}</span></div>
            </div>
        `;
        openTerminalModal('Status do Sistema', content);
    });

    logsModule?.addEventListener('click', () => {
        const now = new Date();
        const ts = () => new Date().toLocaleTimeString();
        const content = `
            <div class="terminal-output font-mono text-sm leading-relaxed">
                <div class="text-green-400">[${ts()}] INIT   :: Chronos OS carregado</div>
                <div class="text-cyan-300">[${ts()}] RENDER :: Cápsulas: ${capsulesData.length} renderizadas</div>
                <div class="text-yellow-300">[${ts()}] UX     :: Hover loop ativo (2s), modal de vídeo pronto</div>
                <div class="text-purple-300">[${ts()}] CART   :: Carrinho em modo itens únicos</div>
                <div class="text-blue-300">[${ts()}] UI     :: Modais sobrepostos habilitados</div>
            </div>
        `;
        openTerminalModal('Logs do Continuum', content);
    });

    cacheModule?.addEventListener('click', () => {
        const cartRaw = localStorage.getItem('timeCapsuleCart') || '{}';
        const size = (new Blob([cartRaw]).size / 1024).toFixed(2);
        const used = 98.7; // demonstrativo
        const content = `
            <div class="space-y-4">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-blue-300 font-mono text-sm">Uso de Cache</span>
                        <span class="text-orange-400 font-mono text-sm">${used}%</span>
                    </div>
                    <div class="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-yellow-400 to-red-500" style="width: ${used}%;"></div>
                    </div>
                </div>
                <div class="font-mono text-sm text-gray-300">
                    LocalStorage: ${size} KB • Chave: timeCapsuleCart
                </div>
                <div class="flex gap-2">
                    <button id="purge-cache" class="px-4 py-2 rounded bg-red-700/50 border border-red-500 text-red-200 hover:bg-red-700/70 transition">Purgar Cache</button>
                    <button id="export-cache" class="px-4 py-2 rounded bg-blue-700/40 border border-blue-500 text-blue-200 hover:bg-blue-700/60 transition">Exportar</button>
                </div>
            </div>
        `;
        openTerminalModal('Arquivos em Cache', content);
        // Ações dos botões
        setTimeout(() => {
            document.getElementById('purge-cache')?.addEventListener('click', () => {
                localStorage.removeItem('timeCapsuleCart');
                cart?.clear?.();
                openTerminalModal('Arquivos em Cache', '<p class="text-center text-green-400 font-mono">Cache purgado com sucesso.</p>');
            });
            document.getElementById('export-cache')?.addEventListener('click', () => {
                const data = localStorage.getItem('timeCapsuleCart') || '{}';
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'timeCapsuleCart.json';
                a.click();
                URL.revokeObjectURL(url);
            });
        }, 0);
    });

    // --------- Painéis ao vivo no próprio dashboard ---------
    try {
        // Se os elementos ainda não estiverem no DOM (timing), re-tenta por alguns ciclos
        let retries = 0;
        const ensureEls = (cb) => {
            const logsTxEl = document.getElementById('logs-tx');
            const logsNextEl = document.getElementById('logs-next');
            const statusMainEl = document.getElementById('status-main');
            const statusSubEl = document.getElementById('status-sub');
            const cacheMainEl = document.getElementById('cache-main');
            const cacheSubEl = document.getElementById('cache-sub');
            if (logsModule && logsTxEl && logsNextEl && statusModule && statusMainEl && statusSubEl && cacheModule && cacheMainEl && cacheSubEl) {
                cb({ logsTxEl, logsNextEl, statusMainEl, statusSubEl, cacheMainEl, cacheSubEl });
            } else if (retries < 20) { // tenta por ~2s
                retries++;
                setTimeout(() => ensureEls(cb), 100);
            } else {
                console.warn('ConsoleModules: elementos não encontrados para atualização ao vivo.');
            }
        };

        ensureEls(({ logsTxEl, logsNextEl, statusMainEl, statusSubEl, cacheMainEl, cacheSubEl }) => {
        // LOGS: Atualiza TX e próxima sincronização (countdown)
        let nextSync = 83; // segundos
        const txBase = 7.2; // PB/nano-segundo (base)
        if (logsModule && logsTxEl && logsNextEl) {
            setInterval(() => {
                // Simula pequena variação na TX
                const tx = (txBase + (Math.random() - 0.5) * 0.2).toFixed(2);
                logsTxEl.textContent = `TX: ${tx} PB/nano-segundo`;
                // Countdown
                nextSync = (nextSync - 1 + 9999) % 9999;
                if (nextSync <= 0) nextSync = 90; // reinicia a cada 90s
                const mm = String(Math.floor(nextSync / 60)).padStart(2, '0');
                const ss = String(nextSync % 60).padStart(2, '0');
                logsNextEl.textContent = `Próxima Sincronização: 00:${mm}:${ss}`;
            }, 1000);

            // Loop de mudança do texto de TX (reforça a sensação de variação)
            setInterval(() => {
                const tx = (txBase + (Math.random() - 0.5) * 0.4).toFixed(2);
                logsTxEl.textContent = `TX: ${tx} PB/nano-segundo`;
            }, 1800);
        }

        // STATUS: Diagnóstico ao clicar
        statusModule?.addEventListener('dblclick', (e) => {
            if (!statusMainEl || !statusSubEl) return;
            const originalMain = statusMainEl.textContent;
            const originalSub = statusSubEl.textContent;
            statusMainEl.textContent = 'RODANDO DIAGNÓSTICO...';
            statusMainEl.classList.remove('text-green-400');
            statusMainEl.classList.add('text-blue-400');
            statusSubEl.textContent = 'Verificando sincronização, partições e buffers...';
            setTimeout(() => {
                statusMainEl.textContent = 'OPERACIONAL & OTIMIZADO';
                statusMainEl.classList.remove('text-blue-400');
                statusMainEl.classList.add('text-green-400');
                statusSubEl.textContent = 'Fluxo Temporal: Sincronizado';
            }, 1800);
        });

        // CACHE: Mostrar % de uso e permitir purga com clique secundário
        function getLocalStorageSizeKB() {
            let total = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key) || '';
                total += key.length + value.length;
            }
            return total / 1024;
        }
        function refreshCacheCard() {
            if (!cacheMainEl || !cacheSubEl) return;
            const size = getLocalStorageSizeKB();
            // Demo: mapeia tamanho em % (arbitrário para visual) até ~2MB, com oscilação sutil
            let used = Math.min(99.9, (size / 2048) * 100);
            used += (Math.random() - 0.5) * 0.6; // oscila +-0.3%
            used = Math.max(0, Math.min(99.9, used));
            cacheMainEl.textContent = `${used.toFixed(1)}% UTILIZADO`;
            cacheSubEl.textContent = 'Purga Automática: Programada';
        }
        refreshCacheCard();
        setInterval(refreshCacheCard, 5000);
        // Clique com botão do meio ou direito purga cache diretamente
        cacheModule?.addEventListener('auxclick', (e) => {
            if (e.button !== 1 && e.button !== 2) return;
            e.preventDefault();
            localStorage.removeItem('timeCapsuleCart');
            cart?.clear?.();
            refreshCacheCard();
            openTerminalModal('Arquivos em Cache', '<p class="text-center text-green-400 font-mono">Cache purgado com sucesso.</p>');
        });
        cacheModule?.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            localStorage.removeItem('timeCapsuleCart');
            cart?.clear?.();
            refreshCacheCard();
            openTerminalModal('Arquivos em Cache', '<p class="text-center text-green-400 font-mono">Cache purgado com sucesso.</p>');
        });
        // --------- Loop automático entre os três módulos (destaque/spotlight) ---------
        try {
            const modules = [statusModule, logsModule, cacheModule].filter(Boolean);
            let idx = 0;
            function applyActive(i) {
                modules.forEach(m => m.classList.remove('console-active'));
                const m = modules[i % modules.length];
                if (m) m.classList.add('console-active');
            }
            applyActive(idx);
            setInterval(() => {
                idx = (idx + 1) % modules.length;
                applyActive(idx);
           }, 4000);

            // Executa um diagnóstico do STATUS automaticamente a cada ~30s
            setInterval(() => {
                if (!statusModule) return;
                if (!statusMainEl || !statusSubEl) return;
                statusMainEl.textContent = 'RODANDO DIAGNÓSTICO...';
                statusMainEl.classList.remove('text-green-400');
                statusMainEl.classList.add('text-blue-400');
                statusSubEl.textContent = 'Verificando sincronização, partições e buffers...';
                setTimeout(() => {
                    statusMainEl.textContent = 'OPERACIONAL & OTIMIZADO';
                    statusMainEl.classList.remove('text-blue-400');
                    statusMainEl.classList.add('text-green-400');
                    statusSubEl.textContent = 'Fluxo Temporal: Sincronizado';
                }, 1800);
            }, 30000);

            // Loop de mudança do texto do STATUS a cada 4s (entre 3 mensagens)
            const statusCycle = [
                'OPERACIONAL & OTIMIZADO',
                'SINCRONIZADO',
                'COEF. DE ERRO: 0.00%'
            ];
            let sIdx = 0;
            setInterval(() => {
                sIdx = (sIdx + 1) % statusCycle.length;
                if (!statusMainEl) return;
                statusMainEl.textContent = statusCycle[sIdx];
            }, 4000);
        } catch (err) {
            console.warn('Falha ao iniciar loop dos módulos:', err);
        }
        });
    } catch (err) {
        console.warn('Falha ao inicializar painéis do console:', err);
    }
}

function openTerminalModal(title, innerHtml) {
    const terminalModal = document.getElementById('terminal-modal');
    const terminalTitle = document.getElementById('terminal-title');
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalModal || !terminalTitle || !terminalOutput) return;
    terminalTitle.textContent = title || 'Terminal';
    terminalOutput.innerHTML = innerHtml || '';
    const closeBtn = terminalModal.querySelector('.modal-close-button');
    if (closeBtn) closeBtn.onclick = closeTerminalModal;

    terminalModal.classList.remove('hidden');
    terminalModal.classList.add('active');
    Object.assign(terminalModal.style, {
        display: 'flex', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '3000', justifyContent: 'center', alignItems: 'center'
    });
    document.body.classList.add('modal-open');
    const outsideHandler = (e) => { if (e.target === terminalModal) closeTerminalModal(); };
    terminalModal._outsideHandler = outsideHandler;
    terminalModal.addEventListener('click', outsideHandler);
}

function closeTerminalModal() {
    const terminalModal = document.getElementById('terminal-modal');
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    terminalModal.classList.add('hidden');
    Object.assign(terminalModal.style, { display: '', position: '', top: '', left: '', width: '', height: '', zIndex: '' });
    if (terminalModal._outsideHandler) {
        terminalModal.removeEventListener('click', terminalModal._outsideHandler);
        terminalModal._outsideHandler = null;
    }
    document.body.classList.remove('modal-open');
}
function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;
    cartModal.classList.remove('active');
    cartModal.classList.add('hidden');
    Object.assign(cartModal.style, { display: '', position: '', top: '', left: '', width: '', height: '', zIndex: '' });
    if (cartModal._outsideHandler) {
        cartModal.removeEventListener('click', cartModal._outsideHandler);
        cartModal._outsideHandler = null;
    }
    document.body.classList.remove('modal-open');
}

// -----------------------------
// MODAL DE CHECKOUT (sobreposto)
// -----------------------------
function openCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (!checkoutModal) return;
    try { if (window.checkout && typeof checkout.start === 'function') checkout.start(); } catch (_) {}
    
    const closeBtn = checkoutModal.querySelector('.modal-close-button');
    if (closeBtn) closeBtn.onclick = closeCheckoutModal;
    
    // Fecha o carrinho se estiver aberto
    try { closeCartModal(); } catch (_) {}
    
    checkoutModal.classList.remove('hidden');
    checkoutModal.classList.add('active');
    Object.assign(checkoutModal.style, {
        display: 'flex',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '3000'
    });
    document.body.classList.add('modal-open');
    const outsideHandler = (e) => { if (e.target === checkoutModal) closeCheckoutModal(); };
    checkoutModal._outsideHandler = outsideHandler;
    checkoutModal.addEventListener('click', outsideHandler);
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (!checkoutModal) return;
    checkoutModal.classList.remove('active');
    checkoutModal.classList.add('hidden');
    Object.assign(checkoutModal.style, { display: '', position: '', top: '', left: '', width: '', height: '', zIndex: '' });
    if (checkoutModal._outsideHandler) {
        checkoutModal.removeEventListener('click', checkoutModal._outsideHandler);
        checkoutModal._outsideHandler = null;
    }
    document.body.classList.remove('modal-open');
}
// Elementos do DOM
const capsulesGrid = document.getElementById('capsules-grid');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutModal = document.getElementById('checkout-modal');
const videoModal = document.getElementById('video-modal');
const videoPlayerContainer = document.getElementById('video-player-container');
const sellModal = document.getElementById('sell-modal');
const terminalModal = document.getElementById('terminal-modal');
const terminalOutput = document.getElementById('terminal-output');
const terminalTitle = document.getElementById('terminal-title');

// Dados do carrinho
let cart;
// Fila de venda (visual)
let sellQueue = [];

// Efeitos de Som
const sounds = {
    click: document.getElementById('click-sound'),
    addToCart: document.getElementById('add-to-cart-sound'),
    checkout: document.getElementById('checkout-sound'),
    upload: document.getElementById('upload-sound'),
    process: document.getElementById('process-sound'),
    glitch: document.getElementById('glitch-sound'),
    timeTravel: document.getElementById('time-travel-sound'),
    hover: document.getElementById('hover-sound')
};

function playSound(soundOrKey) {
    try {
        const el = typeof soundOrKey === 'string' ? sounds[soundOrKey] : soundOrKey;
        if (el && typeof el.play === 'function') {
            el.currentTime = 0;
            const p = el.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
        }
    } catch (err) {
        console.warn('Falha ao reproduzir som:', err);
    }
}

// ---------------------------------
// Funções de Inicialização e Lógica
// ---------------------------------

// Inicializa o fundo 3D
function initThreeJSBackground() {
    console.log('Inicializando fundo 3D...');
    
    // Verifica se o Three.js está disponível
    if (typeof THREE === 'undefined') {
        console.warn('Three.js não está disponível. O fundo 3D não será carregado.');
        return;
    }
    
    try {
        // Cria a cena
        const scene = new THREE.Scene();
        
        // Cria a câmera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;
        
        // Cria o renderizador
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        
        // Adiciona o renderizador ao DOM
        const container = document.getElementById('threejs-container');
        if (container) {
            container.appendChild(renderer.domElement);
        } else {
            console.warn('Elemento #threejs-container não encontrado. O fundo 3D não será exibido.');
            return;
        }
        
        // Cria a geometria das partículas
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Cria o material das partículas
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x00ffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Cria o sistema de partículas
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Configura a animação
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotação suave
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            renderer.render(scene, camera);
        }
        
        // Manipulador de redimensionamento da janela
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        // Adiciona o manipulador de redimensionamento
        window.addEventListener('resize', onWindowResize, false);
        
        // Inicia a animação
        animate();
        
        console.log('Fundo 3D inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar o fundo 3D:', error);
    }
}

// Função principal de inicialização
function initializeApp() {
    console.log('Inicializando aplicação...');
    console.log('Cápsulas carregadas:', capsulesData.length);
    console.log('Inicializando aplicação...');
    
    // Inicializa os ícones
    if (window.feather) {
        feather.replace();
    }
    
    // Inicializa o fundo 3D
    initThreeJSBackground();
    
    // Inicializa os componentes da interface
    renderCapsules();
    setupModals();
    setupCart();
    setupSellModal();
    setupConsoleModules();
    setupTimeMachine();
    setupEventListeners();
    
    // Inicializa o contínuo do tempo
    const timeContinuum = new TimeContinuum();
    timeContinuum.init();
    
    console.log('Aplicação inicializada com sucesso!');
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeApp);

// Configuração da Máquina do Tempo
function setupTimeMachine() {
    // Adiciona indicadores de linha do tempo
    const timeMachineUI = document.createElement('div');
    timeMachineUI.className = 'time-machine-ui fixed bottom-8 right-8 z-50';
    timeMachineUI.innerHTML = `
        <div class="bg-gray-900 bg-opacity-80 p-4 rounded-lg border border-blue-500">
            <div class="flex items-center space-x-4">
                <button id="time-past" class="time-travel-btn" data-timeline="past">
                    <i data-feather="rewind" class="w-5 h-5"></i>
                </button>
                <div class="timeline-display text-center">
                    <div class="text-xs text-gray-400">LINHA DO TEMPO</div>
                    <div class="timeline-indicator text-blue-400 font-bold">PRESENTE</div>
                </div>
                <button id="time-future" class="time-travel-btn" data-timeline="future">
                    <i data-feather="fast-forward" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(timeMachineUI);
    feather.replace();
    
    // Adiciona o efeito de viagem no tempo
    const timeTravelEffect = document.createElement('div');
    timeTravelEffect.className = 'time-travel-effect fixed inset-0 bg-black bg-opacity-70 z-50 pointer-events-none opacity-0';
    document.body.appendChild(timeTravelEffect);
}

// Configuração dos Modais
function setupModals() {
    console.log('Configurando modais...');
    
    // Fechar modais ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    });
    
    // Fechar modais ao clicar no botão de fechar
    document.querySelectorAll('.modal-close-button').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                playSound('click');
                
                // Limpa o player de vídeo se estiver no modal de vídeo
                if (modal.id === 'video-modal') {
                    const video = modal.querySelector('video');
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }
                    document.getElementById('video-player-container').innerHTML = '';
                }
            }
        });
    });
    
    // Fechar modais ao clicar fora do conteúdo
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                playSound('click');
                
                // Limpa o player de vídeo se estiver no modal de vídeo
                if (modal.id === 'video-modal') {
                    const video = modal.querySelector('video');
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }
                    document.getElementById('video-player-container').innerHTML = '';
                }
            }
        });
    });

    // Garante que o modal de venda comece oculto
    const sellModal = document.getElementById('sell-modal');
    if (sellModal && !sellModal.classList.contains('hidden')) {
        sellModal.classList.add('hidden');
    }
}

// -----------------------------
// MODAL DE VENDA (sobreposto)
// -----------------------------
function openSellModal() {
    const modal = document.getElementById('sell-modal');
    if (!modal) return;
    const closeBtn = modal.querySelector('.modal-close-button');
    if (closeBtn) closeBtn.onclick = closeSellModal;

    modal.classList.remove('hidden');
    modal.classList.add('active');
    Object.assign(modal.style, {
        display: 'flex',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '3000',
        justifyContent: 'center',
        alignItems: 'center'
    });
    document.body.classList.add('modal-open');
    const outsideHandler = (e) => { if (e.target === modal) closeSellModal(); };
    modal._outsideHandler = outsideHandler;
    modal.addEventListener('click', outsideHandler);
}

function closeSellModal() {
    const modal = document.getElementById('sell-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.classList.add('hidden');
    Object.assign(modal.style, { display: '', position: '', top: '', left: '', width: '', height: '', zIndex: '', justifyContent: '', alignItems: '' });
    if (modal._outsideHandler) {
        modal.removeEventListener('click', modal._outsideHandler);
        modal._outsideHandler = null;
    }
    document.body.classList.remove('modal-open');
}

// Configuração dos Ouvintes de Eventos
function setupEventListeners() {
    console.log('Configurando ouvintes de eventos...');
    
    // Navegação da Máquina do Tempo
    document.getElementById('time-past')?.addEventListener('click', () => {
        if (window.timeMachine && typeof timeMachine.prev === 'function') {
            timeMachine.prev();
        } else if (window.timeMachine) {
            timeMachine.travelToTimeline('passado');
        }
        playSound('click');
    });
    
    document.getElementById('time-present')?.addEventListener('click', () => {
        if (window.timeMachine) timeMachine.travelToTimeline('presente');
        playSound('click');
    });
    
    document.getElementById('time-future')?.addEventListener('click', () => {
        if (window.timeMachine && typeof timeMachine.next === 'function') {
            timeMachine.next();
        } else if (window.timeMachine) {
            timeMachine.travelToTimeline('futuro');
        }
        playSound('click');
    });
    
    // Efeito de hover nas cápsulas
    document.querySelectorAll('.holographic-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            playSound('hover');
            card.classList.add('time-glow');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('time-glow');
        });
    });
    
    // Configura o botão do carrinho (abre como modal sobreposto)
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
            playSound('click');
        });
    }
    
    // Fecha o modal ao clicar fora
    window.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal && !cartModal.contains(e.target) && !e.target.closest('#cart-button')) {
            cartModal.classList.add('hidden');
        }
        
        const sellModal = document.getElementById('sell-modal');
        const sellButton = document.getElementById('sell-button');
        if (sellModal && !sellModal.contains(e.target) && !e.target.closest('#sell-button')) {
            sellModal.classList.add('hidden');
        }
    });
    
    // Configura o botão de vender segundos
    const sellButton = document.getElementById('sell-button');
    if (sellButton) {
        sellButton.addEventListener('click', () => {
            openSellModal();
            playSound('click');
        });
    }
    
    // Fechamento do modal de venda é tratado pelo botão .modal-close-button e pelo outside click em openSellModal()
}

// Sistema de Navegação Temporal
class TimeMachine {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.timeAnchors = [];
        // Ordem de navegação da linha do tempo
        this.timelines = ['passado', 'presente', 'futuro'];
        this.index = 1; // começa em "presente"
        this.currentTimeline = this.timelines[this.index];
    }

    addTimeAnchor(anchor) {
        this.timeAnchors.push(anchor);
    }

    travelToTimeline(timeline) {
        // Ajusta o índice se for uma timeline válida
        const i = this.timelines.indexOf(String(timeline).toLowerCase());
        if (i !== -1) {
            this.index = i;
            this.currentTimeline = this.timelines[this.index];
        } else {
            this.currentTimeline = timeline;
        }
        this.updateInterface();
    }

    prev() {
        // Vai para trás na ordem passado <- presente <- futuro
        this.index = (this.index - 1 + this.timelines.length) % this.timelines.length;
        this.currentTimeline = this.timelines[this.index];
        this.updateInterface();
    }

    next() {
        // Vai para frente na ordem passado -> presente -> futuro
        this.index = (this.index + 1) % this.timelines.length;
        this.currentTimeline = this.timelines[this.index];
        this.updateInterface();
    }

    updateInterface() {
        // Atualiza a interface com base na linha do tempo atual
        document.querySelectorAll('.timeline-indicator').forEach(indicator => {
            indicator.textContent = this.currentTimeline.toUpperCase();
        });
        
        // Adiciona efeitos visuais de viagem no tempo
        this.animateTimeTravel();
    }

    animateTimeTravel() {
        // Efeito de distorção temporal
        const container = document.querySelector('.time-travel-effect');
        if (!container) return;
        
        container.style.opacity = '1';
        container.style.animation = 'timeDistortion 1.5s forwards';
        
        setTimeout(() => {
            container.style.opacity = '0';
            container.style.animation = '';
        }, 1500);
    }
}

// Inicializa a máquina do tempo
const timeMachine = new TimeMachine();
// expõe globalmente para os listeners que verificam window.timeMachine
window.timeMachine = timeMachine;

// Renderiza as cápsulas temporais
function renderCapsules() {
    // Renderiza as cápsulas de tempo na interface
    console.log('Renderizando cápsulas de tempo...');
    const capsulesGrid = document.getElementById('capsules-grid');
    if (!capsulesGrid) return;
    
    // Limpa o grid antes de renderizar
    capsulesGrid.innerHTML = '';
    
    // Renderiza cada cápsula
    capsulesData.forEach((capsule, index) => {
        const capsuleElement = document.createElement('div');
        capsuleElement.className = 'holographic-card rounded-3xl p-8 relative scanline-effect group time-capsule';
        capsuleElement.dataset.id = capsule.id;
        capsuleElement.dataset.title = capsule.title;
        capsuleElement.dataset.price = capsule.price;
        // Usa o vídeo completo no dataset para o modal
        capsuleElement.dataset.video = capsule.fullVideo;
        
        capsuleElement.innerHTML = `
            <div class="absolute inset-0 rounded-3xl border-2 border-blue-500 opacity-20 group-hover:opacity-40 transition-opacity"></div>
            
            <div class="relative z-10 flex flex-col h-full">
                <div class="capsule-container flex-1 flex flex-col">
                    <div class="capsule-media relative overflow-hidden rounded-xl mb-4 flex-1 flex items-center justify-center">
                        <video src="${capsule.previewVideo}" poster="${capsule.image}" muted playsinline preload="metadata" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"></video>
                        <button class="play-button absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors" data-video="${capsule.fullVideo}" aria-label="Abrir vídeo">
                            <i data-feather="play" class="w-5 h-5"></i>
                        </button>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                            <span class="text-white text-sm font-medium">${capsule.year}</span>
                        </div>
                    </div>
                    
                    <div class="px-2">
                        <h3 class="text-2xl font-bold text-white mb-2">${capsule.title}</h3>
                        <p class="text-sm text-blue-200 mb-4 line-clamp-3">${capsule.description}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-blue-300 font-bold text-lg">R$ ${capsule.price.toFixed(2)}</span>
                            <button class="add-to-cart-btn bg-transparent border border-blue-500 hover:bg-blue-500/20 text-blue-400 hover:text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors" data-id="${capsule.id}" data-title="${capsule.title}" data-price="${capsule.price}" data-image="${capsule.image}" data-preview="${capsule.previewVideo}" data-full="${capsule.fullVideo}">
                                <i data-feather="shopping-cart" class="w-4 h-4 mr-2 inline"></i> Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        capsulesGrid.appendChild(capsuleElement);
    });
    
    // Atualiza os ícones do feather
    if (window.feather) {
        feather.replace();
    }

    // Controla a reprodução no hover: loop curto (máx 2s) e pausa ao sair
    const MAX_LOOP_SECONDS = 2;
    document.querySelectorAll('.capsule-media video').forEach((video) => {
        let looping = false;
        let onTimeUpdate;

        const startHover = () => {
            try {
                // começa sempre do início
                video.currentTime = 0;
                video.play();
                looping = true;
                // handler de loop curto
                onTimeUpdate = () => {
                    if (video.currentTime >= MAX_LOOP_SECONDS) {
                        video.currentTime = 0;
                    }
                };
                video.addEventListener('timeupdate', onTimeUpdate);
            } catch (e) { /* ignora erros de autoplay em alguns navegadores */ }
        };

        const endHover = () => {
            looping = false;
            try { video.pause(); } catch (_) {}
            try { video.currentTime = 0; } catch (_) {}
            if (onTimeUpdate) video.removeEventListener('timeupdate', onTimeUpdate);
        };

        // Eventos de mouse
        video.addEventListener('mouseenter', startHover);
        video.addEventListener('mouseleave', endHover);

        // Para garantir que o hover na área da cápsula também funcione
        const media = video.closest('.capsule-media');
        media?.addEventListener('mouseenter', startHover);
        media?.addEventListener('mouseleave', endHover);
    });
    
    // Adiciona os event listeners para os botões de reprodução de vídeo
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoUrl = e.currentTarget.dataset.video;
            if (videoUrl) {
                openVideoModal(videoUrl);
            }
        });
    });
    
    // Configura os eventos das cápsulas
    setupCapsuleEvents();
}

// Configura os eventos das cápsulas
function setupCapsuleEvents() {
    console.log('Configurando eventos das cápsulas...');
    
    // Hover: loop curto de até 2s
    const MAX_LOOP_SECONDS = 2;
    document.querySelectorAll('.capsule-media video').forEach((video) => {
        let onTimeUpdate;
        const startHover = () => {
            try {
                video.currentTime = 0;
                onTimeUpdate = () => {
                    if (video.currentTime >= MAX_LOOP_SECONDS) {
                        video.currentTime = 0;
                    }
                };
                video.addEventListener('timeupdate', onTimeUpdate);
                const p = video.play();
                if (p && typeof p.catch === 'function') p.catch(() => {});
            } catch (_) {}
        };
        const endHover = () => {
            try { video.pause(); } catch (_) {}
            try { video.currentTime = 0; } catch (_) {}
            if (onTimeUpdate) video.removeEventListener('timeupdate', onTimeUpdate);
            onTimeUpdate = null;
        };
        const media = video.closest('.capsule-media');
        media?.addEventListener('mouseenter', startHover);
        media?.addEventListener('mouseleave', endHover);
    });
    
    // Play: abre modal com vídeo completo
    document.querySelectorAll('.play-button').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoUrl = btn.dataset.video;
            if (videoUrl) openVideoModal(videoUrl);
        });
    });
    
    // Adicionar ao carrinho
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const id = button.dataset.id || button.closest('.holographic-card')?.dataset.id;
            const title = button.dataset.title || button.closest('.holographic-card')?.dataset.title;
            const price = parseFloat(button.dataset.price || button.closest('.holographic-card')?.dataset.price || '0');
            const image = button.dataset.image;
            const previewVideo = button.dataset.preview;
            const fullVideo = button.dataset.full;
            if (id && title && !isNaN(price)) {
                cart.addItem({ id, title, price, image, previewVideo, fullVideo });
                playSound(sounds.addToCart);
            }
        });
    });
}

function openVideoModal(videoUrl) {
    videoPlayerContainer.innerHTML = `
        <div class="relative w-full h-full">
            <video controls autoplay class="w-full h-full object-cover rounded-xl video-unfold">
                <source src="${videoUrl}" type="video/mp4">
            </video>
            <button id="close-video-modal" class="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-colors">
                <i data-feather="x" class="w-6 h-6"></i>
            </button>
        </div>
    `;
    
    // Atualiza os ícones do feather
    if (window.feather) {
        feather.replace();
    }
    
    // Configura o botão de fechar
    const closeButton = document.getElementById('close-video-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeVideoModal);
    }
    
    // Garante que o modal não esteja oculto por 'hidden' e sobreponha tudo
    videoModal.classList.remove('hidden');
    videoModal.classList.add('active');
    // Fallback forçado via estilos inline (caso alguma classe conflite)
    Object.assign(videoModal.style, {
        display: 'flex',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '3000'
    });
    // Garante foco visual no topo
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch(_) { window.scrollTo(0,0); }
    console.log('Abrindo modal de vídeo com URL:', videoUrl);
    // Bloqueia o scroll do body enquanto o modal está aberto
    document.body.classList.add('modal-open');
    playSound(sounds.process);
}

// Fecha o modal de vídeo
function closeVideoModal() {
    // Pausa o vídeo antes de fechar
    const video = videoPlayerContainer.querySelector('video');
    if (video) {
        video.pause();
    }
    
    videoModal.classList.remove('active');
    videoModal.classList.add('hidden');
    // Limpa estilos inline aplicados como fallback
    Object.assign(videoModal.style, {
        display: '',
        position: '',
        top: '',
        left: '',
        width: '',
        height: '',
        zIndex: ''
    });
    videoPlayerContainer.innerHTML = '';
    // Libera o scroll do body
    document.body.classList.remove('modal-open');
    playSound(sounds.click);
}

// Fecha o modal ao clicar fora do conteúdo
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

// ---------------------------------
// =================================
// SISTEMA DE CARRINHO DE COMPRAS
// =================================
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.loadFromLocalStorage();
    }

    addItem(item) {
        // Itens são únicos: se já está no carrinho, não adiciona novamente
        const exists = this.items.some(i => i.id === item.id);
        if (exists) {
            this.showAddToCartEffect({ title: `${item.title} já está no carrinho` });
            return;
        }
        this.items.push({ ...item, quantity: 1 });
        this.calculateTotal();
        this.saveToLocalStorage();
        this.updateUI();
        this.showAddToCartEffect(item);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.calculateTotal();
        this.saveToLocalStorage();
        this.updateUI();
    }

    updateQuantity(itemId, quantity) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.calculateTotal();
            this.saveToLocalStorage();
            this.updateUI();
        }
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    clear() {
        this.items = [];
        this.total = 0;
        this.saveToLocalStorage();
        this.updateUI();
    }

    saveToLocalStorage() {
        localStorage.setItem('timeCapsuleCart', JSON.stringify({
            items: this.items,
            total: this.total
        }));
    }

    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('timeCapsuleCart');
        if (savedCart) {
            const { items, total } = JSON.parse(savedCart);
            this.items = items || [];
            this.total = total || 0;
            this.updateUI();
        }
    }

    updateUI() {
        // Atualiza o contador do carrinho
        const cartCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            cartCountEl.textContent = cartCount;
            cartCountEl.style.opacity = cartCount > 0 ? '1' : '0';
            cartCountEl.style.transform = cartCount > 0 ? 'scale(1)' : 'scale(0)';
        }

        // Desabilita botões de compra de itens já no carrinho (itens únicos)
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            const id = btn.getAttribute('data-id');
            const isInCart = this.items.some(i => i.id === id);
            if (isInCart) {
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
                btn.textContent = 'Reservado';
            } else {
                btn.disabled = false;
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
                if (btn.dataset.originalText) btn.textContent = btn.dataset.originalText;
            }
        });

        // Atualiza o modal do carrinho se estiver aberto
        this.updateCartModal();
    }

    updateCartModal() {
        const cartItemsEl = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        
        if (!cartItemsEl || !cartTotalEl) return;

        // Migração: se o item do localStorage não tiver previewVideo/fullVideo, preencher a partir de capsulesData
        this.items = this.items.map(it => {
            if (!it.previewVideo || !it.fullVideo) {
                const cap = (Array.isArray(capsulesData) ? capsulesData : []).find(c => c.id === it.id);
                if (cap) {
                    return { ...it, previewVideo: cap.previewVideo, fullVideo: cap.fullVideo, image: it.image || cap.image };
                }
            }
            return it;
        });

        if (this.items.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="text-center py-8">
                    <i data-feather="clock" class="w-12 h-12 mx-auto text-blue-400 mb-4"></i>
                    <p class="text-gray-400">Seu carrinho está vazio</p>
                    <p class="text-sm text-gray-500 mt-2">Explore nossos momentos temporais</p>
                </div>
            `;
            feather.replace();
            cartTotalEl.textContent = 'R$ 0,00';
            return;
        }

        cartItemsEl.innerHTML = this.items.map(item => `
            <div class="cart-item flex items-center justify-between py-4 border-b border-gray-800">
                <div class="flex items-center">
                    <div class="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden mr-4">
                        ${item.previewVideo ? `
                        <video src="${item.previewVideo}" muted playsinline autoplay loop class="w-full h-full object-cover"></video>
                        ` : `
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                        `}
                    </div>
                    <div>
                        <h4 class="font-medium text-blue-300">${item.title}</h4>
                        <p class="text-sm text-gray-400">${(item.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <button class="remove-item ml-4 text-red-400 hover:text-red-300" data-id="${item.id}" title="Remover">
                        <i data-feather="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `).join('');

        cartTotalEl.textContent = this.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        feather.replace();
        
        // Não há controles de quantidade para itens únicos

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.currentTarget.getAttribute('data-id');
                this.removeItem(itemId);
                playSound(sounds.remove);
            });
        });

        // Botão de finalizar compra abre modal de checkout
        const checkoutBtn = document.getElementById('checkout-button');
        if (checkoutBtn) {
            checkoutBtn.onclick = (e) => {
                e.preventDefault();
                openCheckoutModal();
                playSound(sounds.checkout);
            };
        }
    }

    showAddToCartEffect(item) {
        // Cria o efeito de item adicionado ao carrinho
        const effect = document.createElement('div');
        effect.className = 'fixed z-50 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center';
        effect.style.left = '50%';
        effect.style.top = '20px';
        effect.style.transform = 'translateX(-50%) translateY(-100%)';
        effect.style.opacity = '0';
        effect.style.transition = 'all 0.3s ease-out';
        
        effect.innerHTML = `
            <i data-feather="check" class="w-4 h-4 mr-2"></i>
            ${item.title} adicionado ao carrinho
        `;
        
        document.body.appendChild(effect);
        feather.replace();
        
        // Anima a entrada
        setTimeout(() => {
            effect.style.transform = 'translateX(-50%) translateY(20px)';
            effect.style.opacity = '1';
        }, 10);
        
        // Remove após a animação
        setTimeout(() => {
            effect.style.transform = 'translateX(-50%) translateY(-100%)';
            effect.style.opacity = '0';
            setTimeout(() => effect.remove(), 300);
        }, 3000);
    }
}

// Instancia o carrinho após a classe estar definida
cart = new ShoppingCart();

// Carrinho já inicializado acima
// ---------------------------------

function setupCart() {
    console.log('Configurando carrinho de compras...');
    
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) {
                cartModal.classList.toggle('hidden');
                playSound(sounds.click);
                // O ShoppingCart já atualiza a UI automaticamente
            }
        });
    }
    
    // Fecha o modal ao clicar no botão de fechar
    const closeButton = document.querySelector('.cart-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) {
                cartModal.classList.add('hidden');
                playSound(sounds.click);
            }
        });
    }
    
    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal && !cartModal.contains(e.target) && !e.target.closest('#cart-button')) {
            cartModal.classList.add('hidden');
        }
    });
    
    // Botão de finalizar compra
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.items.length > 0) {
                const cartModal = document.getElementById('cart-modal');
                if (cartModal) {
                    cartModal.classList.add('hidden');
                }
                startCheckoutProcess();
            } else {
                alert('Seu carrinho está vazio!');
            }
        });
    }
}

// ---------------------------------
// =================================
// TESTES DE FUNCIONALIDADE DO CARRINHO
// =================================
function testCartFunctionality() {
    console.log('Iniciando testes do carrinho...');
    
    // Teste 1: Adicionar item ao carrinho
    const testItem = {
        id: 'test-1',
        title: 'Item de Teste',
        price: 9.99,
        image: 'https://via.placeholder.com/100'
    };
    
    // Adiciona o item
    cart.addItem(testItem);
    console.log('Item adicionado ao carrinho:', cart.items);
    
    // Verifica se o item foi adicionado
    if (cart.items.length === 1 && cart.items[0].id === 'test-1') {
        console.log('✅ Teste 1: Adicionar item - OK');
    } else {
        console.error('❌ Teste 1: Falha ao adicionar item');
    }
    
    // Teste 2: Atualizar quantidade
    cart.updateQuantity('test-1', 3);
    console.log('Quantidade atualizada:', cart.items[0].quantity);
    
    if (cart.items[0].quantity === 3) {
        console.log('✅ Teste 2: Atualizar quantidade - OK');
    } else {
        console.error('❌ Teste 2: Falha ao atualizar quantidade');
    }
    
    // Teste 3: Remover item
    cart.removeItem('test-1');
    console.log('Carrinho após remoção:', cart.items);
    
    if (cart.items.length === 0) {
        console.log('✅ Teste 3: Remover item - OK');
    } else {
        console.error('❌ Teste 3: Falha ao remover item');
    }
    
    // Limpa o carrinho após os testes
    cart.clear();
}

// =================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =================================
document.addEventListener('DOMContentLoaded', () => {
    // Executa os testes do carrinho apenas em ambiente de desenvolvimento
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        testCartFunctionality();
    }
    setupCart();
});

// Loops passivos e resilientes para os cartões do console
function startPassiveLoops() {
    if (window._passiveLoopsStarted) return;
    window._passiveLoopsStarted = true;

    // STATUS: ciclo de mensagens
    const statusCycle = [
        'OPERACIONAL & OTIMIZADO',
        'SINCRONIZADO',
        'COEF. DE ERRO: 0.00%'
    ];
    let sIdx = 0;
    setInterval(() => {
        const el = document.getElementById('status-main');
        if (el) {
            sIdx = (sIdx + 1) % statusCycle.length;
            el.textContent = statusCycle[sIdx];
        }
    }, 4000);

    // LOGS: TX oscilando e countdown
    let nextSync = 59;
    const txBase = 7.2;
    setInterval(() => {
        const txEl = document.getElementById('logs-tx');
        const nextEl = document.getElementById('logs-next');
        if (txEl) {
            const tx = (txBase + (Math.random() - 0.5) * 0.4).toFixed(2);
            txEl.textContent = `TX: ${tx} PB/nano-segundo`;
        }
        if (nextEl) {
            nextSync = (nextSync - 1 + 3600) % 3600;
            const mm = String(Math.floor(nextSync / 60)).padStart(2, '0');
            const ss = String(nextSync % 60).padStart(2, '0');
            nextEl.textContent = `Próxima Sincronização: 00:${mm}:${ss}`;
        }
    }, 1000);

    // CACHE: oscilação sutil da %
    function getLocalStorageSizeKB() {
        let total = 0;
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key) || '';
                total += key.length + value.length;
            }
        } catch (_) {}
        return total / 1024;
    }
    setInterval(() => {
        const cacheEl = document.getElementById('cache-main');
        if (cacheEl) {
            const size = getLocalStorageSizeKB();
            let used = Math.min(99.9, (size / 2048) * 100);
            used += (Math.random() - 0.5) * 0.6;
            used = Math.max(0, Math.min(99.9, used));
            cacheEl.textContent = `${used.toFixed(1)}% UTILIZADO`;
        }
    }, 2000);
}

// =================================
// PROCESSO DE CHECKOUT
// =================================
class CheckoutProcess {
    constructor() {
        this.currentStep = 0;
        this.steps = [
            { id: 'shipping', title: 'Informações de Entrega' },
            { id: 'payment', title: 'Pagamento' },
            { id: 'review', title: 'Revisão do Pedido' },
            { id: 'confirmation', title: 'Confirmação' }
        ];
        this.orderData = {};
    }

    start() {
        this.currentStep = 0;
        this.orderData = {};
        this.renderSteps();
        this.showStep(0);
        document.getElementById('checkout-modal').classList.add('active');
        playSound(sounds.checkout);
    }

    renderSteps() {
        const stepsContainer = document.createElement('div');
        stepsContainer.className = 'checkout-steps mb-8';
        
        stepsContainer.innerHTML = `
            <div class="flex justify-between items-center mb-8 relative">
                ${this.steps.map((step, index) => `
                    <div class="step-item ${index === 0 ? 'active' : ''} ${index < this.currentStep ? 'completed' : ''}" data-step="${index}">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-title">${step.title}</div>
                    </div>
                `).join('')}
                <div class="step-connector"></div>
            </div>
        `;
        
        const checkoutSteps = document.getElementById('checkout-steps');
        if (checkoutSteps) {
            checkoutSteps.innerHTML = '';
            checkoutSteps.appendChild(stepsContainer);
            checkoutSteps.appendChild(this.getStepContent(0));
            
            // Adiciona os event listeners para os passos
            document.querySelectorAll('.step-item').forEach((step, index) => {
                step.addEventListener('click', () => {
                    if (index < this.steps.length - 1) {
                        this.showStep(index);
                    }
                });
            });
        }
    }

    getStepContent(stepIndex) {
        const content = document.createElement('div');
        content.className = 'step-content';
        
        switch(stepIndex) {
            case 0: // Endereço de entrega
                content.innerHTML = this.getShippingStep();
                break;
            case 1: // Pagamento
                content.innerHTML = this.getPaymentStep();
                break;
            case 2: // Revisão
                content.innerHTML = this.getReviewStep();
                break;
            case 3: // Confirmação
                content.innerHTML = this.getConfirmationStep();
                break;
            default:
                content.innerHTML = '<p>Etapa não encontrada</p>';
        }
        
        // Adiciona os botões de navegação
        if (stepIndex < this.steps.length - 1) {
            const navButtons = document.createElement('div');
            navButtons.className = 'flex justify-between mt-8';
            
            navButtons.innerHTML = `
                <button class="secondary-button ${stepIndex === 0 ? 'invisible' : ''}" id="prev-step">
                    <i data-feather="arrow-left" class="w-4 h-4 mr-2"></i> Voltar
                </button>
                <button class="primary-button" id="next-step">
                    ${stepIndex === this.steps.length - 2 ? 'Finalizar Compra' : 'Próximo'}
                    <i data-feather="${stepIndex === this.steps.length - 2 ? 'check' : 'arrow-right'}" class="w-4 h-4 ml-2"></i>
                </button>
            `;
            
            content.appendChild(navButtons);
            feather.replace();
            
            // Adiciona os event listeners
            document.getElementById('prev-step')?.addEventListener('click', () => this.prevStep());
            document.getElementById('next-step')?.addEventListener('click', () => this.nextStep());
        }
        
        return content;
    }

    getShippingStep() {
        return `
            <h3 class="text-xl font-bold mb-6 text-blue-300">Informações de Entrega</h3>
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                        <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
                        <input type="email" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Endereço</label>
                    <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">CEP</label>
                        <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">Cidade</label>
                        <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">Estado</label>
                        <select class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Selecione...</option>
                            ${['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => 
                                `<option value="${uf}">${uf}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    getPaymentStep() {
        return `
            <h3 class="text-xl font-bold mb-6 text-blue-300">Pagamento</h3>
            <div class="space-y-6">
                <div class="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800">
                    <h4 class="font-medium text-gray-300 mb-4">Método de Pagamento</h4>
                    <div class="space-y-3">
                        <label class="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors">
                            <input type="radio" name="payment-method" class="form-radio text-blue-500" checked>
                            <span class="ml-3">Cartão de Crédito</span>
                            <i data-feather="credit-card" class="ml-auto w-5 h-5 text-blue-400"></i>
                        </label>
                        <label class="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors">
                            <input type="radio" name="payment-method" class="form-radio text-blue-500">
                            <span class="ml-3">PIX</span>
                            <i data-feather="dollar-sign" class="ml-auto w-5 h-5 text-blue-400"></i>
                        </label>
                        <label class="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors">
                            <input type="radio" name="payment-method" class="form-radio text-blue-500">
                            <span class="ml-3">Boleto Bancário</span>
                            <i data-feather="file-text" class="ml-auto w-5 h-5 text-blue-400"></i>
                        </label>
                    </div>
                </div>
                
                <div id="credit-card-fields" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">Número do Cartão</label>
                        <div class="relative">
                            <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0000 0000 0000 0000" required>
                            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <i data-feather="credit-card" class="w-5 h-5"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-400 mb-1">Nome no Cartão</label>
                        <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-400 mb-1">Validade</label>
                            <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/AA" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-400 mb-1">CVV</label>
                            <div class="relative">
                                <input type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="000" required>
                                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <i data-feather="help-circle" class="w-5 h-5"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getReviewStep() {
        const orderItems = cart.items.map(item => `
            <div class="flex justify-between items-center py-3 border-b border-gray-800">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden mr-3">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="text-sm font-medium">${item.title}</h4>
                        <p class="text-xs text-gray-400">Quantidade: ${item.quantity}</p>
                    </div>
                </div>
                <span class="text-blue-300 font-medium">${(item.price * item.quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        `).join('');
        
        return `
            <h3 class="text-xl font-bold mb-6 text-blue-300">Revisão do Pedido</h3>
            <div class="space-y-6">
                <div class="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800">
                    <h4 class="font-medium text-gray-300 mb-4">Itens do Pedido</h4>
                    <div class="space-y-3 mb-4">
                        ${orderItems}
                    </div>
                    <div class="border-t border-gray-800 pt-4 mt-4">
                        <div class="flex justify-between text-gray-300 mb-2">
                            <span>Subtotal</span>
                            <span>${cart.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        <div class="flex justify-between text-gray-300 mb-2">
                            <span>Frete</span>
                            <span>Grátis</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold text-blue-300 mt-4 pt-4 border-t border-gray-800">
                            <span>Total</span>
                            <span>${cart.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800">
                    <h4 class="font-medium text-gray-300 mb-4">Endereço de Entrega</h4>
                    <p class="text-gray-400">João da Silva<br>
                    Rua das Flores, 123, Apto 101<br>
                    Centro, São Paulo - SP<br>
                    CEP: 01001-000</p>
                </div>
                
                <div class="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800">
                    <h4 class="font-medium text-gray-300 mb-4">Método de Pagamento</h4>
                    <div class="flex items-center">
                        <div class="w-10 h-6 bg-blue-500 rounded flex items-center justify-center mr-3">
                            <i data-feather="credit-card" class="w-4 h-4 text-white"></i>
                        </div>
                        <span class="text-gray-300">Cartão de Crédito finalizado em 4242</span>
                    </div>
                </div>
                
                <div class="flex items-start">
                    <input type="checkbox" id="terms" class="mt-1 mr-2 rounded border-gray-600 text-blue-500 focus:ring-blue-500">
                    <label for="terms" class="text-sm text-gray-400">
                        Concordo com os <a href="#" class="text-blue-400 hover:underline">Termos de Serviço</a> e 
                        <a href="#" class="text-blue-400 hover:underline">Política de Privacidade</a> da Coleção de Segundos.
                    </label>
                </div>
            </div>
        `;
    }

    getConfirmationStep() {
        return `
            <div class="text-center py-8">
                <div class="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-feather="check" class="w-10 h-10 text-green-400"></i>
                </div>
                <h3 class="text-2xl font-bold text-green-400 mb-2">Compra Concluída!</h3>
                <p class="text-gray-400 mb-6 max-w-md mx-auto">
                    Obrigado por adquirir seus momentos temporais. Um e-mail de confirmação foi enviado para seu endereço de e-mail.
                </p>
                <div class="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800 max-w-md mx-auto mb-8">
                    <div class="flex justify-between py-2 border-b border-gray-800">
                        <span>Número do Pedido:</span>
                        <span>#{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-800">
                        <span>Data:</span>
                        <span>${new Date().toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div class="flex justify-between py-2">
                        <span>Total:</span>
                        <span>${cart.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                </div>
                <div class="space-x-4">
                    <a href="#" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Acompanhar Pedido
                    </a>
                    <a href="/" class="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Voltar à Loja
                    </a>
                </div>
            </div>
        `;
    }

    showStep(stepIndex) {
        this.currentStep = stepIndex;
        const stepContent = this.getStepContent(stepIndex);
        const contentContainer = document.querySelector('#checkout-steps .step-content');
        
        if (contentContainer) {
            contentContainer.style.opacity = '0';
            contentContainer.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                contentContainer.replaceWith(stepContent);
                const newContent = document.querySelector('#checkout-steps .step-content');
                newContent.style.opacity = '0';
                newContent.style.transform = 'translateY(10px)';
                newContent.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    newContent.style.opacity = '1';
                    newContent.style.transform = 'translateY(0)';
                }, 10);
            }, 200);
        }
        
        // Atualiza os indicadores de passo
        document.querySelectorAll('.step-item').forEach((item, index) => {
            item.classList.remove('active', 'completed');
            
            if (index === stepIndex) {
                item.classList.add('active');
            } else if (index < stepIndex) {
                item.classList.add('completed');
            }
        });
        
        // Rola para o topo do conteúdo
        document.querySelector('#checkout-steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    nextStep() {
        // Valida o formulário atual antes de prosseguir
        if (!this.validateCurrentStep()) {
            return;
        }
        
        // Salva os dados do passo atual
        this.saveStepData();
        
        // Avança para o próximo passo
        if (this.currentStep < this.steps.length - 1) {
            // Se for o último passo, finaliza o pedido
            if (this.currentStep === this.steps.length - 2) {
                this.completeOrder();
            }
            this.showStep(this.currentStep + 1);
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }

    validateCurrentStep() {
        // Implemente a validação do formulário aqui
        // Retorne true se o formulário for válido, false caso contrário
        return true;
    }

    saveStepData() {
        // Salva os dados do formulário atual
        // Implemente conforme necessário
    }

    completeOrder() {
        // Processa o pedido
        // Limpa o carrinho
        cart.clear();
        
        // Registra o pedido
        this.orderData = {
            orderId: Math.random().toString(36).substr(2, 8).toUpperCase(),
            date: new Date(),
            total: cart.total,
            items: [...cart.items]
        };
        
        // Salva o histórico de pedidos
        this.saveOrderHistory();
    }

    saveOrderHistory() {
        const orders = JSON.parse(localStorage.getItem('timeCapsuleOrders') || '[]');
        orders.push(this.orderData);
        localStorage.setItem('timeCapsuleOrders', JSON.stringify(orders));
    }
}

// Inicializa o processo de checkout
const checkout = new CheckoutProcess();
// ---------------------------------

function startCheckoutProcess() {
    playSound(sounds.checkout);
    const checkoutStepsEl = document.getElementById('checkout-steps');
    checkoutStepsEl.innerHTML = `
        <div id="step-1" class="text-center">
            <h4 class="text-xl font-bold mb-4 text-cyan-400">1. Sincronização de Assinaturas Temporais</h4>
            <p class="text-gray-400 mb-4">Validando a integridade das cápsulas no seu carrinho...</p>
            <div class="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div id="checkout-progress-1" class="h-full bg-blue-500" style="width: 0%;"></div>
            </div>
        </div>
    `;

    animateCheckoutProgress('checkout-progress-1', 1000, () => {
        document.getElementById('step-1').innerHTML = `
            <h4 class="text-xl font-bold mb-4 text-cyan-400">2. Estabelecendo Vínculo Quântico</h4>
            <p class="text-gray-400 mb-4">Garantindo a transferência segura e instantânea.</p>
            <div class="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div id="checkout-progress-2" class="h-full bg-blue-500" style="width: 0%;"></div>
            </div>
        `;
        animateCheckoutProgress('checkout-progress-2', 1500, () => {
            document.getElementById('step-1').innerHTML = `
                <h4 class="text-xl font-bold mb-4 text-cyan-400">3. Processando Transação</h4>
                <p class="text-gray-400 mb-4">Iniciando a transferência de créditos quânticos. Aguarde...</p>
                <div class="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div id="checkout-progress-3" class="h-full bg-blue-500" style="width: 0%;"></div>
                </div>
            `;
            animateCheckoutProgress('checkout-progress-3', 1000, () => {
                document.getElementById('step-1').innerHTML = `
                    <h4 class="text-xl font-bold mb-4 text-green-400">TRANSAÇÃO APROVADA!</h4>
                    <p class="text-gray-400 mb-4">Seu arquivo temporal já está disponível em seu repositório pessoal.</p>
                    <i data-feather="check-circle" class="w-16 h-16 text-green-400 animate-bounce"></i>
                `;
                feather.replace();
                cart = [];
                updateCartDisplay();
                playSound(sounds.addToCart);
                setTimeout(() => {
                    checkoutModal.classList.remove('active');
                }, 3000);
            });
        });
    });
}

function animateCheckoutProgress(elementId, duration, onComplete) {
    const el = document.getElementById(elementId);
    anime({
        targets: el,
        width: ['0%', '100%'],
        easing: 'linear',
        duration: duration,
        complete: onComplete
    });
}

// ---------------------------------
// =================================
// MÓDULOS DE CONTROLE CRONOLÓGICO
// =================================
class ChronoModule {
    constructor(id, name, icon, status, value, subtext) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.status = status;
        this.value = value;
        this.subtext = subtext;
        this.element = null;
    }

    init() {
        this.element = document.getElementById(this.id);
        if (this.element) {
            this.render();
            this.setupEventListeners();
        }
        return this;
    }

    render() {
        this.element.innerHTML = `
            <div class="flex items-center mb-4 text-${this.getStatusColor()}-400">
                <i data-feather="${this.icon}" class="w-7 h-7 mr-4 text-${this.getStatusColor()}-400"></i>
                <span class="text-xl font-bold font-mono">${this.name}</span>
            </div>
            <p class="terminal-text text-3xl font-bold text-${this.getStatusColor()}-400 mb-2">${this.value}</p>
            <p class="text-sm text-gray-500">${this.subtext}</p>
            <div class="mt-4">
                <div class="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-${this.getStatusColor()}-500 rounded-full" style="width: ${this.getRandomValue(70, 100)}%"></div>
                </div>
            </div>
        `;
        feather.replace();
    }

    setupEventListeners() {
        this.element.addEventListener('click', () => this.onClick());
    }

    onClick() {
        // Efeito de clique
        this.element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.element.style.transform = '';
        }, 100);

        // Atualiza os dados
        this.updateData();
        
        // Mostra informações adicionais no terminal
        this.showTerminalInfo();
    }

    updateData() {
        // Atualiza os dados do módulo
        this.value = this.generateNewValue();
        this.subtext = this.generateNewSubtext();
        this.render();
    }

    showTerminalInfo() {
        const terminalTitle = `SISTEMA: ${this.name}`;
        const terminalContent = `
            > Status: ${this.status.toUpperCase()}
            > Valor Atual: ${this.value}
            > Última Atualização: ${new Date().toLocaleTimeString()}
            
            ${this.getAdditionalInfo()}
            
            > Sistema operacional normalmente
            > Nenhum erro detectado
        `;
        
        openTerminalModal(terminalTitle, terminalContent, 'system');
    }

    getStatusColor() {
        const statusColors = {
            'operacional': 'green',
            'alerta': 'yellow',
            'critico': 'red',
            'manutencao': 'blue'
        };
        return statusColors[this.status] || 'blue';
    }

    getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateNewValue() {
        // Implemente a geração de valores específicos para cada módulo
        return this.value;
    }

    generateNewSubtext() {
        // Implemente a geração de subtexto específico para cada módulo
        return this.subtext;
    }

    getAdditionalInfo() {
        // Retorna informações adicionais para o terminal
        return '';
    }
}

// Módulo de Status do Sistema
class SystemStatusModule extends ChronoModule {
    constructor() {
        super(
            'status-module',
            'STATUS DO SISTEMA',
            'activity',
            'operacional',
            'SISTEMA OPERACIONAL',
            'Todos os sistemas normais'
        );
        this.statuses = [
            { value: 'SISTEMA OPERACIONAL', subtext: 'Todos os sistemas normais' },
            { value: 'CARGA ELEVADA', subtext: 'Monitorando desempenho' },
            { value: 'MANUTENÇÃO', subtext: 'Atualizações em andamento' },
            { value: 'OTIMIZADO', subtext: 'Desempenho máximo' }
        ];
    }

    generateNewValue() {
        const status = this.statuses[Math.floor(Math.random() * this.statuses.length)];
        this.subtext = status.subtext;
        return status.value;
    }

    getAdditionalInfo() {
        return `> CPU: ${this.getRandomValue(15, 45)}% de uso\n` +
               `> Memória: ${this.getRandomValue(30, 80)}% alocada\n` +
               `> Rede: ${this.getRandomValue(1, 100)}Mbps`;
    }
}

// Módulo de Dados do Continuum
class ContinuumDataModule extends ChronoModule {
    constructor() {
        super(
            'logs-module',
            'DADOS DO CONTINUUM',
            'upload-cloud',
            'operacional',
            `TX: ${(Math.random() * 10).toFixed(1)} PB/ns`,
            'Próxima sincronização: 00:01:23'
        );
    }

    generateNewValue() {
        const speed = (Math.random() * 15).toFixed(1);
        return `TX: ${speed} PB/ns`;
    }

    generateNewSubtext() {
        const minutes = Math.floor(Math.random() * 5);
        const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        return `Próxima sincronização: 00:0${minutes}:${seconds}`;
    }

    getAdditionalInfo() {
        return `> Dados processados: ${this.getRandomValue(100, 500)} ZB\n` +
               `> Taxa de transferência: ${(Math.random() * 15).toFixed(1)} PB/ns\n` +
               `> Buffer: ${this.getRandomValue(70, 100)}%`;
    }
}

// Módulo de Arquivos em Cache
class CacheModule extends ChronoModule {
    constructor() {
        super(
            'cache-module',
            'ARQUIVOS EM CACHE',
            'database',
            'alerta',
            `${Math.floor(Math.random() * 30) + 70}% UTILIZADO`,
            'Purga automática: Programada'
        );
    }

    generateNewValue() {
        const usage = Math.floor(Math.random() * 30) + 70;
        this.status = usage > 90 ? 'critico' : usage > 80 ? 'alerta' : 'operacional';
        return `${usage}% UTILIZADO`;
    }

    generateNewSubtext() {
        const actions = [
            'Purga automática: Programada',
            'Otimizando espaço...',
            'Compactando dados antigos',
            'Verificando integridade'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getAdditionalInfo() {
        const used = Math.floor(Math.random() * 1000) + 500;
        const total = 1024;
        const free = total - used;
        
        return `> Espaço total: ${total} TB\n` +
               `> Em uso: ${used} TB\n` +
               `> Livre: ${free} TB\n` +
               `> Fragmentação: ${this.getRandomValue(5, 35)}%`;
    }
}

// Inicializa os módulos de controle cronológico
function setupConsoleModules() {
    console.log('Inicializando módulos do console...');
    
    // Configura os módulos do console
    const modules = [
        new SystemStatusModule(),
        new ContinuumDataModule(),
        new CacheModule()
    ];
    
    // Inicializa cada módulo
    modules.forEach(module => {
        if (module.initialize) {
            module.initialize();
        }
    });
    
    // Configura os botões do terminal
    const terminalButtons = document.querySelectorAll('.terminal-button');
    terminalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const action = button.getAttribute('data-action');
            handleTerminalAction(action);
        });
    });
}

// ---------------------------------

function openTerminalModal(title, type) {
    terminalModal.classList.add('active');
    terminalTitle.textContent = title;
    terminalOutput.textContent = '';
    playSound(sounds.process);

    let logs = [];
    let logIndex = 0;

    const messages = {
        'status': [
            '[SYSTEM]: Iniciando verificação de integridade do núcleo...',
            '[CORE]: Módulo de Sincronização: OK',
            '[CORE]: Módulo de Fluxo Temporal: OK',
            '[CORE]: Conexão com o Nexus Central: ESTÁVEL',
            '[SYSTEM]: Análise concluída. Status: OPERACIONAL'
        ],
        'logs': [
            '[DATA]: Buscando registros do continuum...',
            '[DATA]: Download do arquivo "Log-001A-Temporal.log" iniciado...',
            '[DATA]: Pacote de dados 10%... 35%... 70%...',
            '[DATA]: Download completo. 7.2 PB transferidos.',
            '[DATA]: Logs do continuum sincronizados e salvos.'
        ],
        'cache': [
            '[CACHE]: Iniciando purga de arquivos temporais...',
            '[CACHE]: 214 registros de cache encontrados.',
            '[CACHE]: Deletando arquivos obsoletos...',
            '[CACHE]: 52% concluído...',
            '[CACHE]: Purga finalizada. Cache otimizado.'
        ]
    };

    const typeWriter = () => {
        if (logIndex < messages[type].length) {
            terminalOutput.textContent += messages[type][logIndex] + '\n';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            logIndex++;
            setTimeout(typeWriter, 1000);
        }
    };
    typeWriter();
}

// ---------------------------------
// =================================
// SISTEMA DE VENDA DE SEGUNDOS
// =================================
class TimeSeller {
    constructor() {
        this.uploadProgress = 0;
        this.uploadInterval = null;
        this.sellModal = document.getElementById('sell-modal');
        this.uploadBar = document.getElementById('upload-bar');
        this.sellProgress = document.getElementById('sell-progress');
        this.sellMessage = document.getElementById('sell-message');
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Botão de vender segundo
        document.getElementById('sell-button')?.addEventListener('click', () => {
            this.openSellModal();
        });
        
        // Fechar modal
        this.sellModal?.querySelector('.modal-close-button')?.addEventListener('click', () => {
            this.closeSellModal();
        });
    }

    openSellModal() {
        this.resetUpload();
        this.sellModal.classList.add('active');
        playSound(sounds.upload);
        
        // Simula o upload do vídeo
        this.simulateUpload();
    }

    closeSellModal() {
        this.sellModal.classList.remove('active');
        this.resetUpload();
    }

    simulateUpload() {
        this.uploadProgress = 0;
        this.updateUploadUI();
        
        this.uploadInterval = setInterval(() => {
            this.uploadProgress += Math.random() * 10;
            
            if (this.uploadProgress >= 100) {
                this.uploadProgress = 100;
                this.uploadComplete();
                clearInterval(this.uploadInterval);
            }
            
            this.updateUploadUI();
        }, 300);
    }

    updateUploadUI() {
        if (this.uploadBar) {
            this.uploadBar.style.width = `${this.uploadProgress}%`;
            
            let statusText = 'Enviando para o Arquivo Cronológico...';
            if (this.uploadProgress > 30) statusText = 'Processando dados temporais...';
            if (this.uploadProgress > 60) statusText = 'Verificando estabilidade do continuum...';
            if (this.uploadProgress >= 100) statusText = 'Upload concluído!';
            
            this.sellProgress.querySelector('p').textContent = statusText;
        }
    }

    uploadComplete() {
        // Mostra mensagem de sucesso
        this.sellProgress.classList.add('hidden');
        this.sellMessage.classList.remove('hidden');
        this.sellMessage.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i data-feather="check" class="w-8 h-8 text-green-400"></i>
                </div>
                <h4 class="text-xl font-bold text-green-400 mb-2">Segundo Registrado!</h4>
                <p class="text-gray-300 mb-4">Seu momento temporal foi adicionado com sucesso ao nosso arquivo.</p>
                <p class="text-sm text-gray-500">ID: TC-${Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
            </div>
        `;
        
        feather.replace();
        playSound(sounds.success);
        
        // Fecha o modal após 3 segundos
        setTimeout(() => {
            this.closeSellModal();
        }, 5000);
    }

    resetUpload() {
        clearInterval(this.uploadInterval);
        this.uploadProgress = 0;
        
        if (this.uploadBar) {
            this.uploadBar.style.width = '0%';
        }
        
        this.sellProgress.classList.remove('hidden');
        this.sellMessage.classList.add('hidden');
        this.sellMessage.innerHTML = '';
    }
}

// Inicializa o sistema de venda de segundos
const timeSeller = new TimeSeller();
timeSeller.init();
// ---------------------------------

// ---------------------------------
// =================================
// FUNDO 3D - SIMULADOR DE CONTINUUM
// =================================
class TimeContinuum {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.particleCount = 1500;
        this.particleGeometry = null;
        this.particleMaterial = null;
        this.particleSystem = null;
        this.clock = new THREE.Clock();
        this.time = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0b1a);
        this.scene.fog = new THREE.FogExp2(0x0a0b1a, 0.0008);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
        this.camera.position.z = 1000;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('system-bg'),
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createParticles() {
        const particles = [];
        const colorPalette = [
            0x00f9ff, // Ciano
            0x0066ff, // Azul
            0x8a2be2, // Roxo
            0xff00e6, // Rosa
            0x00ffaa  // Verde água
        ];
        let colorIndex = 0;

        for (let i = 0; i < this.particleCount; i++) {
            const x = Math.random() * 4000 - 2000;
            const y = Math.random() * 4000 - 2000;
            const z = Math.random() * 4000 - 2000;
            const size = Math.random() * 4 + 1;
            const color = colorPalette[colorIndex];
            colorIndex = (colorIndex + 1) % colorPalette.length;
            const speed = Math.random() * 0.5 + 0.1;
            const rotationSpeed = (Math.random() - 0.5) * 0.001;
            const opacity = Math.random() * 0.5 + 0.1;

            particles.push(x, y, z, size, color, speed, rotationSpeed, opacity);
        }

        this.particleGeometry = new THREE.BufferGeometry();
        // Fallback estável sem shaders customizados
        this.particleMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthTest: false
        });

        // Cria os atributos personalizados
        const positions = new Float32Array(particles.length / 8 * 3);
        const sizes = new Float32Array(particles.length / 8);
        const colorArray = new Float32Array(particles.length / 8 * 3);
        const speeds = new Float32Array(particles.length / 8);
        const rotationSpeeds = new Float32Array(particles.length / 8);
        const opacities = new Float32Array(particles.length / 8);

        for (let i = 0; i < particles.length; i += 8) {
            const i3 = (i / 8) * 3;
            const i1 = i / 8;
            
            // Posições
            positions[i3] = particles[i];
            positions[i3 + 1] = particles[i + 1];
            positions[i3 + 2] = particles[i + 2];
            
            // Tamanhos
            sizes[i1] = particles[i + 3];
            
            // Cor (R, G, B)
            const color = new THREE.Color(particles[i * 8 + 4]);
            colorArray[i * 3] = color.r;
            colorArray[i * 3 + 1] = color.g;
            colorArray[i * 3 + 2] = color.b;
            
            // Velocidades
            speeds[i1] = particles[i + 5];
            
            // Velocidades de rotação
            rotationSpeeds[i1] = particles[i + 6];
            
            // Opacidades
            opacities[i1] = particles[i + 7];
        }

        // Define os atributos necessários para PointsMaterial (position + color)
        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        this.particleSystem = new THREE.Points(this.particleGeometry, this.particleMaterial);
        this.scene.add(this.particleSystem);
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize(), false);
        document.addEventListener('mousemove', (event) => this.onDocumentMouseMove(event), false);
        document.addEventListener('touchstart', (event) => this.onDocumentTouchStart(event), false);
        document.addEventListener('touchmove', (event) => this.onDocumentTouchMove(event), false);
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onDocumentMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
        this.mouseY = (event.clientY - this.windowHalfY) * 0.05;
    }

    onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.mouseX = (event.touches[0].pageX - this.windowHalfX) * 0.05;
            this.mouseY = (event.touches[0].pageY - this.windowHalfY) * 0.05;
        }
    }

    onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.mouseX = (event.touches[0].pageX - this.windowHalfX) * 0.05;
            this.mouseY = (event.touches[0].pageY - this.windowHalfY) * 0.05;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
    }

    render() {
        this.time = this.clock.getElapsedTime();
        
        // Atualiza o material com o tempo (apenas se ShaderMaterial)
        if (this.particleMaterial && this.particleMaterial.uniforms && this.particleMaterial.uniforms.time) {
            this.particleMaterial.uniforms.time.value = this.time * 0.5;
        }
        
        // Suaviza o movimento do mouse
        this.targetX = this.mouseX * 0.5;
        this.targetY = this.mouseY * 0.5;
        
        // Rotação suave baseada no movimento do mouse
        if (this.particleSystem) {
            this.particleSystem.rotation.y += (this.targetX - this.particleSystem.rotation.y) * 0.02;
            this.particleSystem.rotation.x += (-this.targetY - this.particleSystem.rotation.x) * 0.02;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

function renderCapsulesLegacy() {
    // (legacy) função desativada para evitar conflitos com a versão ativa de renderCapsules.
    // Mantida apenas como stub.
}


function setupSellModal() {
    // Configura o modal de venda de segundos
    console.log('Configurando modal de venda...');
    
    const sellButton = document.getElementById('sell-button');
    const sellModal = document.getElementById('sell-modal');
    const closeSellModal = document.getElementById('close-sell-modal');
    const sellForm = document.getElementById('sell-form');
    const secondsInput = document.getElementById('seconds-to-sell');
    const priceDisplay = document.getElementById('price-display');
    
    if (sellButton && sellModal) {
        // Abre o modal de venda
        sellButton.addEventListener('click', (e) => {
            e.preventDefault();
            sellModal.classList.remove('hidden');
            playSound(sounds.click);
        });
        
        // Fecha o modal de venda
        closeSellModal?.addEventListener('click', () => {
            sellModal.classList.add('hidden');
            playSound(sounds.click);
        });
        
        // Atualiza o preço quando o valor dos segundos muda
        if (secondsInput && priceDisplay) {
            secondsInput.addEventListener('input', () => {
                const seconds = parseInt(secondsInput.value) || 0;
                const price = calculatePrice(seconds);
                priceDisplay.textContent = price.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                });
            });
        }
        
        // Envia o formulário de venda
        if (sellForm) {
            sellForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const seconds = parseInt(secondsInput?.value) || 0;
                if (seconds > 0) {
                    timeSeller.sellSecond(seconds);
                    sellModal.classList.add('hidden');
                }
            });
        }
    }
    
    // Fecha o modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === sellModal) {
            sellModal.classList.add('hidden');
            playSound(sounds.click);
        }
    });
}