const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

console.log('🚀 Iniciando Selenium Grid con Docker y Allure...');
console.log('📋 Sistema operativo:', os.platform());

// Función compatible con Windows y Mac
function executeCommand(command, args, options = {}) {
    const isWindows = os.platform() === 'win32';
    
    if (isWindows) {
        // En Windows, usar cmd.exe
        return spawn('cmd.exe', ['/c', command, ...args], { 
            ...options,
            shell: true 
        });
    } else {
        // En Mac/Linux, usar directamente
        return spawn(command, args, options);
    }
}

// Verificar si Docker está corriendo
const checkDocker = executeCommand('docker', ['version'], {
    stdio: 'pipe'
});

checkDocker.on('close', (code) => {
    if (code !== 0) {
        console.error('❌ Docker no está corriendo. Por favor inicia Docker Desktop.');
        process.exit(1);
    }
    
    // Iniciar Docker Compose
    const dockerProcess = executeCommand('docker-compose', ['up', '-d'], {
        stdio: 'inherit'
    });

    dockerProcess.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Selenium Grid iniciado correctamente');
            console.log('⏳ Esperando que los servicios estén listos...');
            
            // Esperar 20 segundos para que los servicios estén listos (más tiempo en Windows)
            setTimeout(() => {
                console.log('🧪 Ejecutando pruebas con Allure...');
                
                // Ejecutar pruebas con Allure reporter - forma compatible
                const testProcess = executeCommand('npx', [
                    'mocha', 
                    'tests/**/*.js', 
                    '--reporter', 'mocha-allure-reporter',
                    '--timeout=40000'
                ], {
                    stdio: 'inherit',
                    shell: true
                });
                
                testProcess.on('close', (testCode) => {
                    console.log('\n📊 Generando reporte de Allure...');
                    
                    // Generar reporte Allure
                    const allureGenerate = executeCommand('npx', [
                        'allure-generate',
                        'allure-results',
                        '--clean'
                    ], {
                        stdio: 'inherit',
                        shell: true
                    });
                    
                    allureGenerate.on('close', (allureCode) => {
                        if (allureCode === 0) {
                            console.log('✅ Reporte Allure generado exitosamente');
                            console.log('🌐 Abriendo reporte en el navegador...');
                            
                            // Abrir reporte
                            const allureOpen = executeCommand('npx', [
                                'allure-open',
                                'allure-report'
                            ], {
                                stdio: 'inherit',
                                shell: true
                            });
                            
                            allureOpen.on('close', () => {
                                console.log('🛑 Deteniendo Selenium Grid...');
                                executeCommand('docker-compose', ['down'], {
                                    stdio: 'inherit',
                                    shell: true
                                });
                            });
                        } else {
                            console.error('❌ Error generando reporte Allure');
                            console.log('💡 Intenta ejecutar manualmente: npx allure generate allure-results --clean');
                        }
                    });
                });
                
                testProcess.on('error', (error) => {
                    console.error('❌ Error ejecutando pruebas:', error.message);
                    console.log('💡 Solución alternativa: Ejecuta manualmente: npx mocha tests/**/*.js --reporter mocha-allure-reporter --timeout=40000');
                });
                
            }, 20000); // 20 segundos de espera para Windows
        } else {
            console.error('❌ Error al iniciar Selenium Grid');
            process.exit(1);
        }
    });
});