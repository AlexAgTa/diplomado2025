*** Settings ***
Documentation    Suite principal de pruebas para SauceDemo
Library          SeleniumLibrary
Resource         resources/common.robot
Resource         resources/variables.robot

Suite Setup      Log    Iniciando suite de pruebas de SauceDemo
Suite Teardown   Log    Finalizando suite de pruebas de SauceDemo

*** Test Cases ***
Ejecutar Todos Los Tests de Login
    [Documentation]    Ejecuta todos los tests de login
    Run Tests    tests/login_tests.robot

Ejecutar Todos Los Tests de Checkout
    [Documentation]    Ejecuta todos los tests de checkout  
    Run Tests    tests/checkout_tests.robot