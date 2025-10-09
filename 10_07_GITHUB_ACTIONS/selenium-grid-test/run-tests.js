const { spawn } = require('child_process');
const fs = require('fs');

console.log('🚀 Iniciando Selenium Grid con Docker...');

// Verificar si Docker está corriendo
const checkDocker = spawn('docker', ['version'], {
    stdio: 'pipe'
});

checkDocker.on('close', (code) => {
    if (code !== 0) {
        console.error('❌ Docker no está corriendo. Por favor inicia Docker Desktop.');
        process.exit(1);
    }
    
    // Iniciar Docker Compose
    const dockerProcess = spawn('docker-compose', ['up', '-d'], {
        stdio: 'inherit'
    });

    dockerProcess.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Selenium Grid iniciado correctamente');
            console.log('📊 Dashboard disponible en: http://localhost:4444/ui');
            console.log('⏳ Esperando que los servicios estén listos...');
            
            // Esperar 15 segundos para que los servicios estén listos
            setTimeout(() => {
                console.log('🧪 Ejecutando pruebas...');
                
                // Ejecutar pruebas
                const testProcess = spawn('npx', ['mocha', 'tests/**/*.js', '--timeout=40000', '--parallel'], {
                    stdio: 'inherit'
                });
                
                testProcess.on('close', (testCode) => {
                    console.log('\n🛑 Deteniendo Selenium Grid...');
                    
                    // Detener Docker Compose
                    spawn('docker-compose', ['down'], {
                        stdio: 'inherit'
                    });
                    
                    console.log(testCode === 0 ? '✅ Todas las pruebas pasaron!' : '❌ Algunas pruebas fallaron');
                    process.exit(testCode);
                });
                
            }, 15000);
        } else {
            console.error('❌ Error al iniciar Selenium Grid');
            process.exit(1);
        }
    });
});